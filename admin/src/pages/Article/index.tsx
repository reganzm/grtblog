import AISummaryModal from '@/components/AISummaryModal';
import ArticleController from '@/services/article/ArticleController';
import { refreshFrontendCache } from '@/services/refersh';
import { useDispatch, useSelector } from '@@/exports';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, Image, message, Popconfirm, Switch, Tag, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';

const Index = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  const { list } = useSelector((state: any) => state.category);
  const dispatch = useDispatch();
  const [isAIModalVisible, setIsAIModalVisible] = useState<boolean>(false);
  const [currentContentId, setCurrentContentId] = useState<string>('');

  const toggleStatusHandle = async (
    id: string,
    key: string,
    value: boolean,
  ) => {
    const response = await ArticleController.toggleArticle(id, {
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

  const deleteArticleHandle = async (id: string) => {
    const response = await ArticleController.deleteArticle(id);
    if (response) {
      message.success('删除成功');
      actionRef.current?.reload(); // 刷新表格
    }
  };

  useEffect(() => {
    if (list.length === 0) {
      dispatch({
        type: 'category/initCategoryList',
      });
    }
  }, []);

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
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      align: 'center',
    },
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      align: 'center',
      render: (_: any, record: any) =>
        record.cover ? (
          <Image
            src={record.cover}
            key={record.cover}
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
      title: '分类',
      dataIndex: 'category',
      key: 'categoryId',
      align: 'center',
      render: (_: any, record: any) => {
        const category = list.find(
          (item: any) => item.id === record.categoryId,
        );
        return <Tag>{category?.name}</Tag>;
      },
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
      align: 'center',
      render: (value: boolean, record: any) => {
        return (
          <Switch
            onClick={() => {
              toggleStatusHandle(record.id, 'isPublished', !value);
            }}
            size={'small'}
            checked={value}
          />
        );
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
      render: (text: boolean, record: any) => (
        <Switch
          onClick={() => {
            toggleStatusHandle(record.id, 'isTop', !text);
          }}
          size={'small'}
          checked={text}
        />
      ),
    },
    {
      title: '热门',
      dataIndex: 'isHot',
      key: 'isHot',
      align: 'center',
      render: (text: boolean, record: any) => (
        <Switch
          onClick={() => {
            toggleStatusHandle(record.id, 'isHot', !text);
          }}
          size={'small'}
          checked={text}
        />
      ),
    },
    {
      title: '原创',
      dataIndex: 'isOriginal',
      key: 'isOriginal',
      align: 'center',
      render: (text: boolean, record: any) => (
        <Switch
          onClick={() => {
            toggleStatusHandle(record.id, 'isOriginal', !text);
          }}
          size={'small'}
          checked={text}
        />
      ),
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
          onClick={() => navigate(`/article/edit/${record.id}`)}
        >
          编辑
        </Button>,
        <Popconfirm
          title="你真的要确认删除吗?"
          key="delete"
          description="删除文章后，其下的评论和标签也会被删除，且不可恢复"
          onConfirm={() => deleteArticleHandle(record.id)}
          onCancel={() => {
            message.info('取消删除');
          }}
          okText="我想好了！！删除！！"
          cancelText="算了，我再想想"
        >
          <Button variant={'text'}> 删除 </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer title={'文章列表'}>
      <AISummaryModal
        visible={isAIModalVisible}
        onClose={() => setIsAIModalVisible(false)}
        contentType={'ARTICLE'}
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
          const response = await ArticleController.getArticleList({
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
