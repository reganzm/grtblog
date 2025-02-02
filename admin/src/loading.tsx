import { LoadingOutlined } from '@ant-design/icons';
import { Space, Spin } from 'antd';

const Loading = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Space direction="vertical" size="large" style={{ textAlign: 'center' }}>
        <Spin indicator={antIcon} size="large" />
        <div
          style={{
            fontSize: '24px',
            color: '#1890ff',
            marginTop: '20px',
            fontWeight: 'bold',
          }}
        >
          加载中...
        </div>
        <div
          style={{
            fontSize: '16px',
            color: '#8c8c8c',
            marginTop: '10px',
          }}
        >
          请坐和放宽，马上就好...
        </div>
      </Space>
    </div>
  );
};

export default Loading;
