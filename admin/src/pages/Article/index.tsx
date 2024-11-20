import ArticleController from '@/services/article/ArticleController';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, message, Switch, Tooltip } from 'antd';
import { useRef } from 'react';

const Index = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();

  const deleteArticleHandle = async (id: string) => {
    const response = await ArticleController.deleteArticle(id);
    if (response) {
      message.success('删除成功');
      actionRef.current?.reload(); // 刷新表格
    }
  };

  const columns: ProColumns<any, string>[] = [
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
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      align: 'center',
    },
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      valueType: 'image',
      align: 'center',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
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
      title: '发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      valueType: 'boolean',
      align: 'center',
      render: (_, text: boolean) => {
        return <Switch size={'small'} checked={text} />;
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
      title: '置顶',
      dataIndex: 'isTop',
      key: 'isTop',
      align: 'center',
      render: (_, text: boolean) => <Switch size={'small'} checked={text} />,
    },
    {
      title: '热门',
      dataIndex: 'isHot',
      key: 'isHot',
      align: 'center',
      render: (_, text: boolean) => <Switch size={'small'} checked={text} />,
    },
    {
      title: '原创',
      dataIndex: 'isOriginal',
      key: 'isOriginal',
      align: 'center',
      render: (_, text: boolean) => <Switch size={'small'} checked={text} />,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_: any, record: any) => [
        <Button
          variant={'text'}
          key="edit"
          onClick={() => navigate(`/article/edit/${record.id}`)}
        >
          编辑
        </Button>,
        <Button
          variant={'text'}
          key="delete"
          onClick={() => deleteArticleHandle(record.id)}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer title={'文章列表'}>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        style={{
          scrollBehavior: 'smooth',
        }}
        request={async (params) => {
          const response = await ArticleController.getArticleList({
            page: params.current || 1,
            pageSize: params.pageSize || 10,
          });
          return {
            data: response.data,
            success: response.code === 0,
            total: response.data.length,
          };
        }}
      />
    </PageContainer>
  );
};

export default Index;
