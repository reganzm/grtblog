'use client';

import SystemController from '@/services/system/SystemController';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  HddOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Card,
  Col,
  Collapse,
  Progress,
  Row,
  Skeleton,
  Space,
  Statistic,
  Table,
  Typography,
} from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface ComponentStatus {
  status: 'UP' | 'DOWN' | 'UNKNOWN';
  details?: any;
}

interface SystemStatus {
  status: 'UP' | 'DOWN' | 'UNKNOWN';
  components: Record<string, ComponentStatus>;
}

const statusIcons = {
  UP: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
  DOWN: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
  UNKNOWN: <QuestionCircleOutlined style={{ color: '#faad14' }} />,
};

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  );
};

const SystemMonitor: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemStatus = async () => {
      try {
        const response = await SystemController.getSysStatusApi();
        setSystemStatus(response.data);
      } catch (error) {
        console.error('Error fetching system status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSystemStatus();
  }, []);

  const renderDiskSpace = (details: any) => {
    const usedSpace = details.total - details.free;
    const usedPercentage = (usedSpace / details.total) * 100;
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Progress
          percent={Number(usedPercentage.toFixed(2))}
          format={(percent) => `${percent?.toFixed(2)}% Used`}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />
        <Paragraph>
          <HddOutlined /> Total: {formatBytes(details.total)}
        </Paragraph>
        <Paragraph>
          <HddOutlined style={{ color: '#52c41a' }} /> Free:{' '}
          {formatBytes(details.free)}
        </Paragraph>
        <Paragraph>Path: {details.path}</Paragraph>
      </Space>
    );
  };

  const renderMeiliSearch = (details: any) => {
    return (
      <Collapse ghost>
        <Panel header="MeiliSearch 详细信息" key="1">
          <Paragraph>Health: {details['MeiliSearch Health']}</Paragraph>
          <Paragraph>
            Database Size: {formatBytes(details.Stats.databaseSize)}
          </Paragraph>
          <Paragraph>
            Last Update: {new Date(details.Stats.lastUpdate).toLocaleString()}
          </Paragraph>
          <Collapse ghost>
            <Panel header="索引" key="1">
              {Object.entries(details.Stats.indexes).map(
                ([indexName, indexDetails]: [string, any]) => (
                  <Collapse ghost key={indexName}>
                    <Panel
                      header={`${indexName} (${indexDetails.numberOfDocuments} documents)`}
                      key="1"
                    >
                      <Paragraph>
                        Indexing: {indexDetails.indexing ? 'Yes' : 'No'}
                      </Paragraph>
                      <Paragraph>Field Distribution:</Paragraph>
                      <ul>
                        {Object.entries(indexDetails.fieldDistribution).map(
                          ([field, count]) => (
                            <li key={field}>
                              {/*// @ts-ignore*/}
                              {field}: {count}
                            </li>
                          ),
                        )}
                      </ul>
                    </Panel>
                  </Collapse>
                ),
              )}
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
    );
  };

  const columns = [
    {
      title: '组件',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'UP' | 'DOWN' | 'UNKNOWN') => (
        <Space>
          {statusIcons[status]}
          <Text>{status}</Text>
        </Space>
      ),
    },
    {
      title: '详情',
      dataIndex: 'details',
      key: 'details',
      render: (details: any, record: any) => {
        if (record.name === 'diskSpace') {
          return renderDiskSpace(details);
        }
        if (record.name === 'meiliSearch') {
          return renderMeiliSearch(details);
        }
        return (
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {Object.entries(details || {}).map(([key, value]) => (
              <li key={key}>
                <Text strong>{key}:</Text> {JSON.stringify(value)}
              </li>
            ))}
          </ul>
        );
      },
    },
  ];

  const getComponentsData = () => {
    if (!systemStatus) return [];
    return Object.entries(systemStatus.components).map(([name, component]) => ({
      key: name,
      name,
      status: component.status,
      details: component.details,
    }));
  };

  const SkeletonContent = () => (
    <>
      <Card>
        <Skeleton.Input style={{ width: 200, height: 32 }} active />
        <Skeleton.Input
          style={{ width: 100, height: 32, marginLeft: 16 }}
          active
        />
      </Card>
      <Card style={{ marginTop: 16 }}>
        <Skeleton.Input
          style={{ width: 150, height: 24, marginBottom: 16 }}
          active
        />
        <Skeleton active paragraph={{ rows: 10 }} />
      </Card>
    </>
  );

  return (
    <PageContainer title="系统健康监控">
      {loading ? (
        <SkeletonContent />
      ) : (
        systemStatus && (
          <>
            <Row gutter={16}>
              <Col span={24}>
                <Card>
                  <Statistic
                    title="整体状态"
                    value={systemStatus.status}
                    valueStyle={{
                      color:
                        systemStatus.status === 'UP' ? '#3f8600' : '#cf1322',
                    }}
                    prefix={statusIcons[systemStatus.status]}
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={24}>
                <Card>
                  <Title level={4}> 各组件状态一览 </Title>
                  <Table
                    columns={columns}
                    dataSource={getComponentsData()}
                    pagination={false}
                  />
                </Card>
              </Col>
            </Row>
          </>
        )
      )}
    </PageContainer>
  );
};

export default SystemMonitor;
