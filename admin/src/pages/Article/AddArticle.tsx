import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Form, Input, message, Select, Upload, Modal, Button } from 'antd';
import { AddArticleApiParams } from '@/services/article/typings';
import { ProForm } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch, useNavigate } from '@umijs/max';
import ArticleController from '@/services/article/ArticleController';
import CategoryController from '@/services/category/CategoryController';

const AddArticle = () => {
  const editorRef = useRef<Editor>(null);
  const navigate = useNavigate();
  const { list } = useSelector((state: any) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (list.length === 0) {
      dispatch({
        type: 'category/initCategoryList',
      });
    }
  }, []);

  const [form, setForm] = useState<AddArticleApiParams>({
    title: '',
    content: '',
    cover: '',
    categoryId: 0,
    tags: '',
    isPublished: false,
  });
  const [addCategoryForm, setAddCategoryForm] = useState({
    name: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onValueChange = (key: string, value: any) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const submitHandle = () => {
    setForm({
      ...form,
      content: editorRef.current?.getInstance().getMarkdown(),
    });
    console.log(form);
    if (!form.title || !form.content || !form.categoryId || !form.tags) {
      message.error('请填写完整的文章信息');
      return;
    }
    ArticleController.addArticle(form).then((res) => {
      if (res) {
        message.success('文章添加成功').then(() => {
          navigate('/article/list');
        });
      }
    });
  };

  const handleAddCategory = () => {
    if (!addCategoryForm.name) {
      message.error('请输入分类名称');
      return;
    }
    CategoryController.addCategoryApi(addCategoryForm).then((res) => {
      if (res) {
        message.success('分类添加成功');
        setIsModalVisible(false);
        setAddCategoryForm({ name: '' });
        dispatch({
          type: 'category/initCategoryList',
        });
      } else {
        message.error('分类添加失败');
      }
    });
  };

  return (
    <div>
      <ProForm
        title="添加文章"
        size="large"
        style={{ marginBottom: '20px' }}
        onFinish={submitHandle}
      >
        <Form.Item label="标题" name="title"
                   rules={[{ required: true, message: '请输入标题' }]}>
          <Input
            placeholder="标题"
            onChange={(e) => onValueChange('title', e.target.value)}
          />
        </Form.Item>
        <Form.Item label={'内容'} name="content"
                   rules={[{ required: true, message: '文章内容不能为空' }]}>
          <Editor
            previewStyle="vertical"
            height="600px"
            useCommandShortcut={true}
            initialEditType="markdown"
            initialValue=""
            ref={editorRef}
          />
        </Form.Item>
        <Form.Item>
          <div style={{ marginTop: '20px', marginRight: '20px' }}> 当然，你也可以选择从本地 markdown 文件导入</div>
          <Upload
            action="/api/upload"
            onChange={(e) => {
              if (e.file.status === 'done') {
                const url = e.file.response.data;
                editorRef.current?.getInstance().setMarkdown(url);
              }
            }}
          >
            <a> 点击上传 </a>
          </Upload>
        </Form.Item>
        <Form.Item label="上传封面">
          <Upload
            listType="picture-card"
            maxCount={1}
            action="/api/upload"
            onChange={(e) => {
              if (e.file.status === 'done') {
                const url = e.file.response.data;
                onValueChange('cover', url);
              }
            }}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: '8px' }}> 封面可选</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="选择分类" name="category"
                   rules={[{ required: true, message: '请选择分类' }]}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="选择文章的分类"
            optionFilterProp="children"
            onChange={(value) => onValueChange('categoryId', value)}
          >
            {list.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="link" onClick={() => setIsModalVisible(true)}>
          <span className="text-sm"> 没有合适的分类？新建一个叭 </span>
        </Button>

        <Form.Item
          label="标签"
          name="tags"
          rules={[{ required: true, message: '请输入标签' }]}
        >
          <Input placeholder="请输入标签，使用英文逗号分隔"
                 onChange={(e) => onValueChange('tags', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="状态" name="status"
                   rules={[{ required: true, message: '请选择文章状态' }]}>
          <Select style={{ width: 200 }} placeholder="选择文章的状态"
                  onChange={(value) => onValueChange('isPublished', value)}
          >
            <Select.Option value={false}> 草稿 </Select.Option>
            <Select.Option value={true}> 发布 </Select.Option>
          </Select>
        </Form.Item>
      </ProForm>

      <Modal
        title="新建分类"
        open={isModalVisible}
        onOk={handleAddCategory}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form.Item label="分类名称" required>
          <Input
            placeholder="请输入分类名称"
            value={addCategoryForm.name}
            onChange={(e) => setAddCategoryForm({ name: e.target.value })}
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default AddArticle;
