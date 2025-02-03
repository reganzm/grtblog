import NavController from "@/services/nav/NavController"
import type { NavMenuBatchUpdateDTO, NavMenuDTO, NavMenuVO } from "@/services/nav/typings"
import { DeleteOutlined, EditOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons"
import { PageContainer } from "@ant-design/pro-components"
import { Button, Form, Input, message, Modal, Table, TreeSelect } from "antd"
import update from "immutability-helper"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const type = "DraggableBodyRow"

const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }: any) => {
  const ref = useRef<HTMLTableRowElement>(null)
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {}
      if (dragIndex === index) {
        return {}
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      }
    },
    drop: (item: any) => {
      moveRow(item.index, index)
    },
  })
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  drop(drag(ref))

  const rowStyle = {
    ...style,
    cursor: "move",
    transition: "all 0.3s",
    backgroundColor: isOver ? "#e6f7ff" : undefined,
    transform: isOver ? "scale(1.02)" : undefined,
  }

  return <tr ref={ref} className={`${className}${isOver ? dropClassName : ""}`} style={rowStyle} {...restProps} />
}

const NavMenuManagement: React.FC = () => {
  const [navMenus, setNavMenus] = useState<NavMenuVO[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingMenu, setEditingMenu] = useState<NavMenuDTO | null>(null)
  const [form] = Form.useForm()

  const fetchNavMenus = async () => {
    setLoading(true)
    try {
      const response = await NavController.getNavMenus()
      if (response.code === 0) {
        setNavMenus(response.data)
      } else {
        message.error("获取导航菜单失败")
      }
    } catch (error) {
      message.error("获取导航菜单时发生错误")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchNavMenus()
  }, [])

  const moveRow = async (dragIndex: number, hoverIndex: number) => {
    const dragRow = navMenus[dragIndex]
    const updatedMenus = update(navMenus, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    })
    setNavMenus(updatedMenus)

    const batchUpdateData: NavMenuBatchUpdateDTO[] = updatedMenus.map((menu, index) => ({
      id: menu.id,
      parentId: menu.parentId,
      sort: index,
    }))

    try {
      await NavController.batchUpdateNavMenus(batchUpdateData)
      message.success("菜单顺序更新成功")
    } catch (error) {
      message.error("更新菜单顺序失败")
      // 如果更新失败，恢复原始顺序
      fetchNavMenus()
    }
  }

  const showModal = (menu?: NavMenuVO) => {
    if (menu) {
      setEditingMenu({
        id: menu.id,
        name: menu.name,
        parentId: menu.parentId,
        url: menu.href,
      })
      form.setFieldsValue({
        name: menu.name,
        parentId: menu.parentId,
        url: menu.href,
      })
    } else {
      setEditingMenu(null)
      form.resetFields()
    }
    setModalVisible(true)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingMenu) {
        await NavController.updateNavMenu(editingMenu.id, values)
        message.success("菜单更新成功")
      } else {
        await NavController.createNavMenu(values)
        message.success("菜单创建成功")
      }
      setModalVisible(false)
      fetchNavMenus()
    } catch (error) {
      message.error("保存菜单失败")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await NavController.deleteNavMenu(id)
      message.success("菜单删除成功")
      fetchNavMenus()
    } catch (error) {
      message.error("删除菜单失败")
    }
  }

  const columns = [
    {
      title: "排序",
      dataIndex: "sort",
      width: 30,
      className: "drag-visible",
      render: () => <MenuOutlined style={{ cursor: "grab", color: "#999" }} />,
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "URL",
      dataIndex: "href",
      key: "href",
    },
    {
      title: "操作",
      key: "actions",
      render: (_: any, record: NavMenuVO) => (
          <>
            <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)}>
              编辑
            </Button>
            <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
              删除
            </Button>
          </>
      ),
    },
  ]

  return (
      <DndProvider backend={HTML5Backend}>
        <PageContainer>
          <Table
              columns={columns}
              dataSource={navMenus}
              loading={loading}
              rowKey="id"
              components={{
                body: {
                  row: DraggableBodyRow,
                },
              }}
              onRow={(_, index) => {
                return {
                  index,
                  moveRow,
                  className: "",
                  style: {},
                }
              }}
              title={() => (
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                    添加菜单
                  </Button>
              )}
          />

          <Modal
              title={editingMenu ? "编辑菜单" : "添加菜单"}
              visible={modalVisible}
              onOk={handleModalOk}
              onCancel={() => setModalVisible(false)}
          >
            <Form form={form} layout="vertical">
              <Form.Item name="name" label="名称" rules={[{ required: true, message: "请输入菜单名称" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="url" label="URL" rules={[{ required: true, message: "请输入菜单URL" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="parentId" label="父级菜单">
                <TreeSelect
                    treeData={navMenus.map((menu) => ({
                      title: menu.name,
                      value: menu.id,
                      children: menu.children.map((child) => ({
                        title: child.name,
                        value: child.id,
                      })),
                    }))}
                    allowClear
                    treeDefaultExpandAll
                />
              </Form.Item>
            </Form>
          </Modal>
        </PageContainer>
      </DndProvider>
  )
}

export default NavMenuManagement

