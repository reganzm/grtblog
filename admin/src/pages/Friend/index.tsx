import FriendLinkController from '@/services/friendlink/FriendLinkController';
import type {
  FriendLinkRequest,
  FriendLinkVO,
} from '@/services/friendlink/typings';
import { PagedApiResponse } from '@/services/typings';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {
  Button,
  Drawer,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Switch,
  Tooltip,
} from 'antd';
import React, { useRef, useState } from 'react';

const FriendLink: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [curLink, setCurLink] = useState<FriendLinkVO | null>(null);
  const [form] = Form.useForm();
  const actionRef = useRef<any>();

  const handleAdd = async (values: FriendLinkRequest) => {
    try {
      await FriendLinkController.addFriendLink(values);
      setModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      console.error('添加友链失败:', error);
    }
  };

  const handleEdit = async (values: FriendLinkRequest) => {
    try {
      if (curLink) {
        await FriendLinkController.updateFriendLink(curLink.id, values);
        setModalVisible(false);
        actionRef.current?.reload();
      }
    } catch (error) {
      console.error('编辑友链失败:', error);
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    form.resetFields();
    setModalVisible(true);
  };

  const openEditModal = (record: FriendLinkVO) => {
    setIsEditMode(true);
    setCurLink(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleViewDetails = (record: FriendLinkVO) => {
    setCurLink(record);
    setDrawerVisible(true);
  };

  const toggleActiveHandle = async (id: string, isActive: boolean) => {
    try {
      await FriendLinkController.toggleFriendLink(id);
      message.success(isActive ? '激活成功' : '停用成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const deleteFriendLinkHandle = async (id: string) => {
    try {
      await FriendLinkController.deleteFriendLink(id);
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const columns: any = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return (
          <Tooltip title={record.id}>
            <span>{index + 1}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      render: (_: any, record: FriendLinkVO) =>
        record.logo ? (
          <Image
            src={record.logo}
            key={record.logo}
            width={40}
            height={40}
            style={{
              borderRadius: '20%',
            }}
          />
        ) : (
          <span>-</span>
        ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '激活状态',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      render: (value: boolean, record: FriendLinkVO) => (
        <Switch
          checked={value}
          size={'small'}
          onChange={(checked) => toggleActiveHandle(record.id, checked)}
        />
      ),
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      render: (_: any, record: FriendLinkVO) => (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Button key="edit" onClick={() => openEditModal(record)}>
            编辑
          </Button>
          <Button key="view" onClick={() => handleViewDetails(record)}>
            查看详情
          </Button>
          <Popconfirm
            title="你真的要确认删除吗?"
            key="delete"
            onConfirm={() => deleteFriendLinkHandle(record.id)}
            onCancel={() => {
              message.info('取消删除');
            }}
            okText="我想好了！！删除！！"
            cancelText="算了，我再想想"
          >
            <Button> 删除 </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="友链"
        actionRef={actionRef}
        rowKey="id"
        tableStyle={{
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
        search={false}
        request={async (params) => {
          const response: PagedApiResponse<FriendLinkVO[]> =
            await FriendLinkController.listAllFriendLinksByPageAdmin(
              params.current || 1,
              params.pageSize || 10,
            );
          return {
            data: response.data.data,
            success: response.code === 0,
            total: response.data.total,
          };
        }}
        columns={columns}
        toolBarRender={() => [
          <Button key={'add'} type="primary" onClick={openAddModal}>
            添加友链
          </Button>,
        ]}
      />
      <Modal
        title={isEditMode ? '编辑友链' : '添加友链'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => {
          form.validateFields().then((values) => {
            if (isEditMode) {
              handleEdit(values);
            } else {
              handleAdd(values);
            }
          });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL"
            rules={[{ required: true, message: '请输入 URL' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="logo"
            label="Logo"
            rules={[{ required: true, message: '请输入 Logo URL' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        title="友链详情"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={400}
      >
        {curLink && (
          <div>
            <p>
              <strong>ID:</strong> {curLink.id}
            </p>
            <p>
              <strong> 名称:</strong> {curLink.name}
            </p>
            <p>
              <strong>URL:</strong> {curLink.url}
            </p>
            <p>
              <strong>Logo:</strong> {curLink.logo}
            </p>
            <p>
              <strong> 描述:</strong> {curLink.description}
            </p>
            <p>
              <strong> 用户 ID:</strong> {curLink.userId}
            </p>
            <p>
              <strong> 激活状态:</strong> {curLink.isActive ? '是' : '否'}
            </p>
            <p>
              <strong> 创建时间:</strong> {curLink.createdAt}
            </p>
            <p>
              <strong> 更新时间:</strong> {curLink.updatedAt}
            </p>
            {curLink.deletedAt && (
              <p>
                <strong> 删除时间:</strong> {curLink.deletedAt}
              </p>
            )}
          </div>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default FriendLink;
