import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button, Form, Input, Select, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface PageFormProps {
  type: 'add' | 'edit';
  pageInfo: any;
  setPageInfo: (info: any) => void;
  submitHandle: (content: string) => void;
}

const PageForm: React.FC<PageFormProps> = ({
  type,
  pageInfo,
  setPageInfo,
  submitHandle,
}) => {
  const editorRef = useRef<Editor>(null);
  const formRef = useRef<any>(null);
  const [firstIn, setFirstIn] = useState(true); // 用于标记是否为第一次渲染

  useEffect(() => {
    if (formRef.current && pageInfo && firstIn) {
      formRef.current.setFieldsValue(pageInfo);
      // 回填 markdown 编辑器内容
      editorRef.current?.getInstance().setMarkdown(pageInfo?.content);
      setFirstIn(false);
    }
  }, [pageInfo, firstIn]);

  const onValueChange = (key: string, value: any) => {
    setPageInfo({
      ...pageInfo,
      [key]: value,
    });
  };

  function addHandle() {
    const content = editorRef.current?.getInstance().getMarkdown();
    submitHandle(content);
  }

  return (
    <div>
      <Form
        title={type === 'add' ? '添加页面' : '编辑页面'}
        size="large"
        ref={formRef}
        style={{ marginBottom: '20px' }}
        onFinish={addHandle}
      >
        {type === 'add' ? (
          <span
            style={{
              fontSize: '0.8rem',
              color: 'rgba(0, 0, 0, 0.45)',
              marginBottom: '20px',
            }}
          >
            {' '}
            今天想写点什么呢 ٩(๑˃̵ᴗ˂̵๑)۶{' '}
          </span>
        ) : (
          <span
            style={{
              fontSize: '0.8rem',
              color: 'rgba(0, 0, 0, 0.45)',
              marginBottom: '20px',
            }}
          >
            {' '}
            每一次的雕琢都是成就完美的作品哇{' '}
          </span>
        )}
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input
            value={pageInfo?.title}
            placeholder="标题"
            onChange={(e) => onValueChange('title', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="介绍"
          name="description"
          rules={[{ required: true, message: '请输入页面介绍' }]}
        >
          <Input
            value={pageInfo?.description}
            placeholder="描述一下这个页面吧"
            onChange={(e) => onValueChange('description', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="路径"
          name="refPath"
          rules={[{ required: true, message: '请输入页面路径' }]}
        >
          <Input
            value={pageInfo?.title}
            placeholder="页面路径，例如'/about'"
            onChange={(e) => onValueChange('refPath', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label={'内容'}
          name="content"
          rules={[{ required: true, message: '内容不能为空' }]}
        >
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
          <div style={{ marginTop: '20px', marginRight: '20px' }}>
            {' '}
            当然，你也可以选择从本地 markdown 文件导入
          </div>
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
        <Form.Item
          label="是否启用呢"
          name="enable"
          rules={[{ required: true, message: '请选择页面状态' }]}
        >
          <Select
            style={{ width: 200 }}
            placeholder="选择页面的状态"
            onChange={(value) => onValueChange('enable', value)}
          >
            <Select.Option value={true}> 启用 </Select.Option>
            <Select.Option value={false}> 隐藏 </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {type === 'add' ? '添加' : '修改'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PageForm;
