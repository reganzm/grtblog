import MomentController from '@/services/moment/MomentController';
import { refreshFrontendCache } from '@/services/refersh';
import { useDispatch, useSelector } from '@@/exports';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, message, Popconfirm, Switch, Tag, Tooltip } from 'antd';
import { useEffect, useRef } from 'react';

const Index = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();
  const { list } = useSelector((state: any) => state.category);
  const dispatch = useDispatch();

  const deleteMomentHandle = async (id: string) => {
    const response = await MomentController.deleteMoment(id);
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
    const response = await MomentController.editMomentStatus(id, {
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
      dataIndex: 'authorName',
      key: 'authorName',
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
      dataIndex: 'categoryId',
      key: 'categoryId',
      align: 'center',
      render: (_: any, record: any) => {
        if (!record.categoryId) {
          return <Tag> 未分类 </Tag>;
        }
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
      render: (text: boolean, record: any) => {
        return (
          <Switch
            onClick={() => {
              toggleStatusHandle(record.id, 'isPublished', !text);
            }}
            size={'small'}
            checked={text}
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
          variant={'text'}
          key="edit"
          onClick={() => navigate(`/moment/edit/${record.id}`)}
        >
          编辑
        </Button>,
        <Popconfirm
          title="你真的要确认删除吗?"
          key="delete"
          description="删除文章后，其下的评论和标签也会被删除，且不可恢复"
          onConfirm={() => deleteMomentHandle(record.id)}
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
    <PageContainer title={'随手记录列表'}>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        style={{
          scrollBehavior: 'smooth',
        }}
        request={async (params) => {
          const response = await MomentController.getMomentList({
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
