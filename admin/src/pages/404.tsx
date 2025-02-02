import { history } from '@@/exports';
import { Button, Result, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const NotFoundPage = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Result
        status="404"
        title={
          <Text
            style={{
              fontSize: '8rem',
              fontWeight: 'bold',
              color: '#ff4d4f',
              textShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
              margin: 0,
              lineHeight: 1,
            }}
          >
            404
          </Text>
        }
        subTitle={
          <Text
            style={{
              fontSize: '2rem',
              color: '#1890ff',
              marginBottom: '2rem',
            }}
          >
            页面未找到
          </Text>
        }
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => history.replace('/')}
            style={{
              height: 'auto',
              padding: '12px 24px',
              fontSize: '1rem',
            }}
          >
            返回首页
          </Button>
        }
      >
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Paragraph
            style={{
              fontSize: '1.2rem',
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.65)',
            }}
          >
            抱歉，您要找的页面似乎不存在。可能是输入了错误的地址，或者该页面已被移动。
          </Paragraph>
        </div>
      </Result>
    </div>
  );
};

export default NotFoundPage;
