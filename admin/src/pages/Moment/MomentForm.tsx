import CategoryController from '@/services/category/CategoryController'; // 引入分类管理服务
import { useDispatch, useSelector } from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';
import { Editor } from '@toast-ui/react-editor'; // 引入 Toast UI 编辑器
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Switch,
  Upload,
  message,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import CustomEditor from '@/components/CustomEditor';

interface MomentFormProps {
  type: 'add' | 'edit'; // 添加或编辑
  momentInfo: any; // 动态信息
  setMomentInfo: (info: any) => void; // 设置动态信息的函数
  submitHandle: (content: string) => void; // 提交处理函数
}

const MomentForm: React.FC<MomentFormProps> = ({
  type,
  momentInfo,
  setMomentInfo,
  submitHandle,
}) => {
  const editorRef = useRef<Editor>(null); // 编辑器引用
  const formRef = useRef<any>(null); // 表单引用
  const { list } = useSelector((state: any) => state.category); // 获取分类列表
  const dispatch = useDispatch(); // Redux 分发函数
  const [firstIn, setFirstIn] = useState(true); // 标记是否第一次渲染
  const [addCategoryForm, setAddCategoryForm] = useState({
    name: '',
    shortUrl: '',
    type: 0,
  }); // 新建分类的表单状态
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制分类新建的 Modal 是否显示

  // 编辑器首次渲染时，填充已有的动态信息
  useEffect(() => {
    if (formRef.current && momentInfo && firstIn) {
      formRef.current.setFieldsValue(momentInfo); // 填充表单字段
      editorRef.current?.getInstance().setMarkdown(momentInfo?.content); // 设置编辑器内容
      setFirstIn(false);
    }
  }, [momentInfo, firstIn]);

  // 如果分类列表为空，则加载分类列表
  useEffect(() => {
    if (list.length === 0) {
      dispatch({
        type: 'category/initCategoryList',
      });
    }
  }, [list, dispatch]);

  // 更新 momentInfo 状态
  const onValueChange = (key: string, value: any) => {
    setMomentInfo({
      ...momentInfo,
      [key]: value,
    });
  };

  // 提交处理函数
  const addHandle = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    submitHandle(content); // 提交内容
  };

  // 添加新分类
  const handleAddCategory = () => {
    if (!addCategoryForm.name) {
      message.error('请输入分类名称'); // 分类名称为空时提示错误
      return;
    }
    CategoryController.addCategoryApi(addCategoryForm).then((res) => {
      if (res) {
        message.success('分类添加成功');
        setIsModalVisible(false); // 关闭新建分类弹窗
        setAddCategoryForm({ name: '', shortUrl: '', type: 0 }); // 重置分类名称输入框
        dispatch({
          type: 'category/initCategoryList', // 刷新分类列表
        });
      } else {
        message.error('分类添加失败');
      }
    });
  };

  let coverPreview = null;
  if (type === 'edit') {
    coverPreview = (
      <Form.Item label="当前配图" name="coverPreview">
        {momentInfo?.img &&
          momentInfo?.img
            .split(',')
            .map((item: any) => <Image src={item} width={100} key={item} />)}
      </Form.Item>
    );
  }

  return (
    <div>
      <Form
        title={type === 'add' ? '添加动态' : '编辑动态'}
        size="large"
        ref={formRef}
        onFinish={addHandle}
        style={{ marginBottom: '20px' }}
      >
        {type === 'add' ? (
          <span
            style={{
              fontSize: '0.8rem',
              color: 'rgba(0, 0, 0, 0.45)',
              marginBottom: '20px',
            }}
          >
            今天想分享些什么呢 ٩(๑˃̵ᴗ˂̵๑)۶
          </span>
        ) : (
          <span
            style={{
              fontSize: '0.8rem',
              color: 'rgba(0, 0, 0, 0.45)',
              marginBottom: '20px',
            }}
          >
            每次的分享都值得记录呀
          </span>
        )}

        {/* 选择分类 */}
        <Form.Item
          label="选择分类"
          name="categoryId"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            onChange={(value) => onValueChange('categoryId', value)}
          >
            {list.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* 新建分类按钮 */}
        <Button type="link" onClick={() => setIsModalVisible(true)}>
          <span style={{ fontSize: '0.8rem' }}>
            {' '}
            没有合适的分类？新建一个叭{' '}
          </span>
        </Button>

        {/* 标题 */}
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input
            value={momentInfo?.title}
            placeholder="标题"
            onChange={(e) => onValueChange('title', e.target.value)}
          />
        </Form.Item>

        {/* 短链接 */}
        <Form.Item
            label="短链接"
            name="shortUrl"
            rules={[{ required: true, message: '请输入短链接' }]}
        >
          <Input
              value={momentInfo?.shortUrl}
              placeholder="请输入短链接，例如 some-moment"
              onChange={(e) => onValueChange('shortUrl', e.target.value)}
          />
        </Form.Item>

        {/* 内容（编辑器） */}
        <Form.Item
          label="内容"
          name="content"
          // rules={[{ required: true, message: '动态内容不能为空' }]}
        >
          <CustomEditor ref={editorRef} />
        </Form.Item>

        {coverPreview}

        {/* 图片上传 */}
        <Form.Item label="上传配图">
          <Upload
            listType="picture-card"
            maxCount={1}
            action="/api/v1/upload"
            onChange={(e) => {
              if (e.file.status === 'done') {
                const url = e.file.response.data;
                onValueChange(
                  'img',
                  momentInfo.img ? `${momentInfo.img},${url}` : url,
                );
              }
            }}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: '8px' }}> 图片可选</div>
            </div>
          </Upload>
        </Form.Item>

        {/* 发布状态切换 */}
        <Form.Item label="是否发布" name="isPublished" valuePropName="checked">
          <Switch
            checked={momentInfo?.isPublished}
            onChange={(checked) => onValueChange('isPublished', checked)}
          />
        </Form.Item>

        <Form.Item label="其他选项">
          <div style={{ display: 'flex', gap: '20px' }}>
            <Form.Item name="isTop" valuePropName="checked" noStyle>
              <Switch
                checkedChildren="置顶"
                unCheckedChildren="置顶"
                checked={momentInfo?.isTop}
                onChange={(checked) => onValueChange('isTop', checked)}
              />
            </Form.Item>
            <Form.Item name="isHot" valuePropName="checked" noStyle>
              <Switch
                checkedChildren="热门"
                unCheckedChildren="热门"
                checked={momentInfo?.isHot}
                onChange={(checked) => onValueChange('isHot', checked)}
              />
            </Form.Item>
            <Form.Item name="isOriginal" valuePropName="checked" noStyle>
              <Switch
                checkedChildren="原创"
                unCheckedChildren="原创"
                checked={momentInfo?.isOriginal}
                onChange={(checked) => onValueChange('isOriginal', checked)}
              />
            </Form.Item>
          </div>
        </Form.Item>

        {/* 提交按钮 */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {type === 'add' ? '添加' : '更新'}
          </Button>
        </Form.Item>
      </Form>

      {/* 新建分类的 Modal */}
      <Modal
        title="新建分类"
        open={isModalVisible}
        onOk={handleAddCategory}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form.Item label="分类名称" required>
          <Input
            placeholder="请输入分类名称"
            onChange={(e) =>
              setAddCategoryForm({
                ...addCategoryForm,
                name: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item label="分类短链接" required>
          <Input
            placeholder="请输入分类短链接"
            onChange={(e) =>
              setAddCategoryForm({
                ...addCategoryForm,
                shortUrl: e.target.value,
              })
            }
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default MomentForm;
