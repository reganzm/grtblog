import {
  addNewCommentApi,
  deleteCommentApi,
  getAllCommentAreaListApi,
  getAllCommentListApi,
  getCommentByAreaIdApi,
  markCommentAsReadApi,
  topCommentApi,
} from '@/services/comment/CommentController';
import { CommentVO } from '@/services/comment/typings';
import { PagedApiResponse } from '@/services/typings';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import {
  Button,
  Checkbox,
  Drawer,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Switch,
  Tooltip,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type CommentArea = {
  value: string;
  label: string;
};

const CommentIndex = () => {
  const actionRef = useRef<ActionType>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<CommentVO>();
  const [onlyShowUnread, setOnlyShowUnread] = useState(true);
  const [curAreaId, setCurAreaId] = useState('');
  const [areaList, setAreaList] = useState<CommentArea[]>([]);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    setOnlyShowUnread(true);
  }, []);

  useEffect(() => {
    getAllCommentAreaListApi().then((res) => {
      res.data.forEach((item: any) => {
        setAreaList((prev) => [
          ...prev,
          {
            value: item.id,
            label: item.areaName,
          },
        ]);
      });
    });
  }, []);

  const deleteCommentHandle = async (id: string) => {
    const response = await deleteCommentApi(id);
    if (response.code === 0) {
      message.success('删除成功');
      actionRef.current?.reload();
    } else {
      message.error('删除失败');
    }
  };

  const toggleTopHandle = async (id: string, isTop: boolean) => {
    const response = await topCommentApi(id);
    if (response.code === 0) {
      message.success(isTop ? '置顶成功' : '取消置顶成功');
      actionRef.current?.reload();
    } else {
      message.error('操作失败');
    }
  };

  const markAsReadHandle = async (id: string) => {
    const response = await markCommentAsReadApi(id);
    if (response.code === 0) {
      message.success('标记为已读成功');
      actionRef.current?.reload();
    } else {
      message.error('操作失败');
    }
  };

  const handleReplySubmit = () => {
    if (currentRecord?.id && currentRecord.areaId && replyContent) {
      addNewCommentApi(
        currentRecord.areaId,
        replyContent,
        currentRecord.id,
      ).then(message.success('回复成功'));
      setIsReplyModalVisible(false);
      setReplyContent('');
    } else if (!replyContent) {
      message.error('回复内容不能为空');
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
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      align: 'center',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'dateTime',
      align: 'center',
    },
    {
      title: '置顶',
      dataIndex: 'isTop',
      key: 'isTop',
      align: 'center',
      render: (value: boolean, record: any) => (
        <Switch
          onClick={() => toggleTopHandle(record.id, !value)}
          size={'small'}
          checked={value}
        />
      ),
    },
    {
      title: '已读',
      dataIndex: 'isViewed',
      key: 'isViewed',
      align: 'center',
      render: (value: boolean, record: any) => (
        <Button
          type="primary"
          disabled={value}
          onClick={() => markAsReadHandle(record.id)}
        >
          {value ? '已读' : '标记为已读'}
        </Button>
      ),
    },
    {
      title: '快捷回复',
      valueType: 'option',
      align: 'center',
      render: (_: any, record: any) => (
        <Button
          variant={'text'}
          key="details"
          onClick={() => {
            setCurrentRecord(record);
            setIsReplyModalVisible(true);
          }}
        >
          快捷回复
        </Button>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Button
            variant={'text'}
            key="details"
            onClick={() => {
              setCurrentRecord(record);
              setDrawerVisible(true);
            }}
          >
            详情
          </Button>
          <Popconfirm
            title="你真的要确认删除吗?"
            key="delete"
            description="删除评论后不可恢复"
            onConfirm={() => deleteCommentHandle(record.id)}
            onCancel={() => {
              message.info('取消删除');
            }}
            okText="我想好了！！删除！！"
            cancelText="算了，我再想想"
          >
            <Button variant={'text'}> 删除 </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageContainer title={'所有评论'}>
        <ProTable
          tableStyle={{
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
          columns={columns}
          actionRef={actionRef}
          toolBarRender={() => [
            <Select
              key={'area'}
              onChange={(value) => {
                setCurAreaId(value);
                actionRef.current?.reload();
              }}
              placeholder={'选择对应的评论区，查看评论叭'}
              options={areaList}
            ></Select>,
            <Checkbox
              value={onlyShowUnread}
              key={'onlyShowUnread'}
              onChange={(e) => {
                setOnlyShowUnread(e.target.checked);
                actionRef.current?.reload();
              }}
            >
              仅显示未读
            </Checkbox>,
          ]}
          style={{
            scrollBehavior: 'smooth',
          }}
          request={async (params) => {
            const response: PagedApiResponse<CommentVO[]> = await (curAreaId ===
              ''
              ? getAllCommentListApi
              : getCommentByAreaIdApi)(
              curAreaId,
              params.current || 1,
              params.pageSize || 10,
              onlyShowUnread,
            );
            return {
              data: response.data.data,
              success: response.code === 0,
              total: response.data.total,
            };
          }}
        />
        <Drawer
          title="评论详情"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          width={840}
          visible={drawerVisible}
        >
          {currentRecord && (
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, paddingRight: '1rem' }}>
                <p> 内容: </p>
                <div
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    backgroundColor: '#f5f5f5',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  <ReactMarkdown>{currentRecord.content}</ReactMarkdown>
                </div>
              </div>
              <div style={{ paddingLeft: '1rem' }}>
                <p>
                  <b style={{ marginTop: '5px' }}> 基本信息 </b>
                </p>
                {currentRecord.nickName && (
                  <p> 昵称: {currentRecord.nickName}</p>
                )}
                {currentRecord.email && <p> 邮件: {currentRecord.email}</p>}
                {currentRecord.website && <p> 网站: {currentRecord.website}</p>}
                <p>
                  <b style={{ marginTop: '5px' }}> 用户信息 </b>
                </p>
                {currentRecord.authorId && (
                  <p> 作者 ID: {currentRecord.authorId}</p>
                )}
                {currentRecord.ip && <p>IP 地址: {currentRecord.ip}</p>}
                {currentRecord.location && (
                  <p> 归属地: {currentRecord.location}</p>
                )}
                {currentRecord.browser && (
                  <p> 浏览器: {currentRecord.browser}</p>
                )}
                {currentRecord.platform && (
                  <p> 平台: {currentRecord.platform}</p>
                )}
                <p>
                  <b style={{ marginTop: '5px' }}> 相关信息 </b>
                </p>
                {currentRecord.areaId && (
                  <p> 评论区 ID: {currentRecord.areaId}</p>
                )}
                {currentRecord.parentId && (
                  <p> 父 ID: {currentRecord.parentId}</p>
                )}
                {currentRecord.updatedAt && (
                  <p> 更新时间: {currentRecord.updatedAt}</p>
                )}
                {currentRecord.createdAt && (
                  <p> 创建时间: {currentRecord.createdAt}</p>
                )}
                {currentRecord.deletedAt && (
                  <p> 删除时间: {currentRecord.deletedAt}</p>
                )}
                <p>
                  <b style={{ marginTop: '5px' }}> 逻辑元信息 </b>
                </p>
                {currentRecord.isAuthor !== undefined && (
                  <p> 是否作者: {currentRecord.isAuthor ? '是' : '否'}</p>
                )}
                {currentRecord.isFriend !== undefined && (
                  <p> 是否好友: {currentRecord.isFriend ? '是' : '否'}</p>
                )}
                {currentRecord.isOwner !== undefined && (
                  <p> 是否所有者: {currentRecord.isOwner ? '是' : '否'}</p>
                )}
                {currentRecord.isTop !== undefined && (
                  <p> 是否置顶: {currentRecord.isTop ? '是' : '否'}</p>
                )}
                {currentRecord.isViewed !== undefined && (
                  <p> 是否已读: {currentRecord.isViewed ? '是' : '否'}</p>
                )}
              </div>
            </div>
          )}
        </Drawer>
      </PageContainer>
      <Modal
        title="回复评论"
        visible={isReplyModalVisible}
        onOk={handleReplySubmit}
        onCancel={() => setIsReplyModalVisible(false)}
      >
        {currentRecord && (
          <div>
            <p> 评论内容:</p>
            <div
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                backgroundColor: '#f5f5f5',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              <ReactMarkdown>{currentRecord.content}</ReactMarkdown>
            </div>
            <p> 回复:</p>
            <Input.TextArea
              rows={4}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="请输入回复内容"
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default CommentIndex;
