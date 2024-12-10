import ArticleController from '@/services/article/ArticleController';
import { InboxOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import React from 'react';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: (file): string => {
    ArticleController.importArticle(file).then((res) => {
      if (res) {
        return 'success';
      }
    });
    return 'failed';
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const ImportMd: React.FC = () => (
  <PageContainer title={'从 Hexo 的 Markdown 文件导入文章'}>
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text"> 点击或拖拽 *.md 文件到这里上传 </p>
      <p className="ant-upload-hint">
        支持单个或批量上传，支持 Hexo 的包含 yaml 头部的 md 文件
      </p>
    </Dragger>
    我们将自动处理您源文件的 Meta 信息，解析文章并发布，快速完成文章迁移与配置
  </PageContainer>
);

export default ImportMd;
