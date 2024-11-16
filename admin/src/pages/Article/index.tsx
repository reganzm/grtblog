import React from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Switch, Tooltip } from 'antd';
import ArticleController from '@/services/article/ArticleController';
import { ProColumns } from '@ant-design/pro-components';

const Index = () => {
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
        return (<Switch size={'small'} checked={text} />);
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
      render: () => [
        <a key="edit"> 编辑 </a>,
        <a key="delete"> 删除 </a>,
      ],
    },
  ];

  return (
    <PageContainer title={'文章列表'}>
      <ProTable
        columns={columns}
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
