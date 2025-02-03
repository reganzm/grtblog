// src/pages/FooterManagement/index.tsx
import {
  addFooterSection,
  queryFooterSections,
  removeFooterSection,
  updateFooterSection,
} from '@/services/footer/FooterController';
import { FooterSection } from '@/services/footer/typings';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormList,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';

const FooterManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<FooterSection | undefined>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
    try {
      await removeFooterSection({ id });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const columns: ProColumns<FooterSection>[] = [
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
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      key: 'title',
    },
    {
      title: '链接',
      dataIndex: 'links',
      key: 'links',
      search: false,
      render: (_, record) => (
        <div>
          {record.links.map((linkObj: any, index: number) =>
            Object.values(linkObj).map((link: any, subIndex: number) => (
              <div key={`${index}-${subIndex}`}>
                {link.text}: {link.url}
              </div>
            )),
          )}
        </div>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setCurrentRow(record);
            setIsEdit(true);
            setModalVisible(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定要删除吗？"
          onConfirm={() => handleDelete(record.id)}
        >
          <a style={{ color: 'red' }}> 删除 </a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<FooterSection>
        headerTitle="页脚管理"
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={async () => {
          const res = await queryFooterSections();
          return {
            data: res.data,
            success: true,
          };
        }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              setCurrentRow(undefined);
              setIsEdit(false);
              setModalVisible(true);
            }}
          >
            <PlusOutlined /> 新增区块
          </Button>,
        ]}
      />

      <ModalForm<FooterSection>
        title={isEdit ? '编辑区块' : '新增区块'}
        width={600}
        open={modalVisible}
        onOpenChange={setModalVisible}
        initialValues={currentRow}
        onFinish={async (values) => {
          console.log(values);
          try {
            if (isEdit && currentRow?.id) {
              await updateFooterSection({ ...values, id: currentRow.id });
              message.success('更新成功');
            } else {
              await addFooterSection(values);
              message.success('添加成功');
            }
            actionRef.current?.reload();
            setModalVisible(false);
          } catch (error) {
            message.error('操作失败');
          }
          return true;
        }}
      >
        <ProFormText
          name="title"
          label="区块标题"
          rules={[{ required: true, message: '请输入标题' }]}
        />

        <ProFormList
          name="links"
          label="链接列表"
          creatorButtonProps={{
            creatorButtonText: '添加链接',
          }}
        >
          {(meta, index) => (
            <div style={{ display: 'flex', gap: 16 }}>
              <span>
                <b> {index + 1}</b>
              </span>
              <ProFormText
                name={[meta.name, 'text']}
                label="链接文本，例如 关于我> 你也许在找> 联系我>"
                rules={[{ required: true, message: '请输入链接文本' }]}
                width="sm"
              />
              <ProFormText
                name={[meta.name, 'url']}
                label="链接地址，例如：https://www.example.com或/posts"
                rules={[{ required: true, message: '请输入链接地址' }]}
                width="sm"
              />
            </div>
          )}
        </ProFormList>
      </ModalForm>
    </PageContainer>
  );
};

export default FooterManagement;
