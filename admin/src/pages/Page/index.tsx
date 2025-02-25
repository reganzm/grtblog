import AISummaryModal from '@/components/AISummaryModal';
import PageController from '@/services/page/PageController';
import { refreshFrontendCache } from '@/services/refersh';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, message, Popconfirm, Switch, Tooltip } from 'antd';
import { useRef, useState } from 'react';

const Index = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  const [isAIModalVisible, setIsAIModalVisible] = useState<boolean>(false);
  const [currentContentId, setCurrentContentId] = useState<string>('');

  const deleteArticleHandle = async (id: string) => {
    const response = await PageController.deletePage(id);
    if (response) {
      message.success('删除成功');
      actionRef.current?.reload(); // 刷新表格
    }
  };

  const toggleStatusHandle = async (
    id: string,
    key: string,
    value: boolean,
  ) => {
    const response = await PageController.togglePage(id, {
      [key]: value,
    });
    if (response) {
      message.success('更新成功');
      refreshFrontendCache().then((res) => {
        if (res) {
          message.success('刷新缓存成功');
        } else {
          message.error('刷新缓存失败');
        }
      });
      actionRef.current?.reload(); // 刷新表格
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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 250,
      align: 'center',
    },
    {
      title: '浏览',
      dataIndex: 'views',
      key: 'views',
      align: 'center',
    },
    {
      title: '点赞',
      dataIndex: 'likes',
      key: 'likes',
      align: 'center',
    },
    {
      title: '评论',
      dataIndex: 'comments',
      key: 'comments',
      align: 'center',
    },
    {
      title: '启用',
      dataIndex: 'enable',
      key: 'enable',
      align: 'center',
      render: (value: boolean, record: any) => (
        <Switch
          onClick={() => {
            toggleStatusHandle(record.id, 'isPublished', !value);
          }}
          size={'small'}
          checked={value}
        />
      ),
    },
    {
      title: '系统页面',
      dataIndex: 'canDelete',
      key: 'canDelete',
      align: 'center',
      render: (value: boolean) => {
        return <span>{!value ? '是' : '否'}</span>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'dateTime',
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      valueType: 'dateTime',
      align: 'center',
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_: any, record: any) => [
        <Button
          variant="text"
          key="ai-summary"
          onClick={() => {
            setCurrentContentId(record.id);
            setIsAIModalVisible(true);
          }}
        >
          AI 摘要
        </Button>,
        <Button
          variant={'text'}
          key="edit"
          onClick={() => navigate(`/pages/edit/${record.id}`)}
        >
          编辑
        </Button>,
        <Popconfirm
          title="你真的要确认删除吗?"
          key="delete"
          description="删除页面后，其下的评论也会被删除，且不可恢复"
          onConfirm={() => deleteArticleHandle(record.id)}
          onCancel={() => {
            message.info('取消删除');
          }}
          okText="我想好了！！删除！！"
          cancelText="算了，我再想想"
        >
          <Button variant={'text'} disabled={!record.canDelete}>
            {' '}
            删除{' '}
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer title={'所有页面'}>
      <AISummaryModal
        visible={isAIModalVisible}
        onClose={() => setIsAIModalVisible(false)}
        contentType={'PAGE'}
        contentId={currentContentId}
      />
      <ProTable
        tableStyle={{
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
        columns={columns}
        actionRef={actionRef}
        style={{
          scrollBehavior: 'smooth',
        }}
        request={async (params) => {
          const response = await PageController.getPageList({
            page: params.current || 1,
            pageSize: params.pageSize || 10,
          });
          return {
            data: response.data.data,
            success: response.code === 0,
            total: response.data.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default Index;
