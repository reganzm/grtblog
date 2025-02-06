import AISummaryController from '@/services/aisummary/AISummaryController';
import { Button, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

interface AiSummaryModalProps {
  visible: boolean;
  onClose: () => void;
  contentType: 'ARTICLE' | 'MOMENT' | 'PAGE';
  contentId: string;
}

const AiSummaryModal: React.FC<AiSummaryModalProps> = ({
  visible,
  onClose,
  contentType,
  contentId,
}) => {
  const [model, setModel] = useState<string>('deepseek-chat');
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const startStreaming = (taskId: string) => {
    const eventSource = AISummaryController.streamSummary(taskId);

    eventSource.onmessage = (event) => {
      const result = JSON.parse(event.data);
      console.log(new Date());
      console.log(result);
      setSummary(result.content);

      if (result.status === 'COMPLETED') {
        eventSource.close();
        setLoading(false);
        setIsFinished(true);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setError('出现错误了捏，请重试');
      setLoading(false);
    };
  };

  const handleCreateSummaryTask = async () => {
    setLoading(true);
    setError(null);
    setSummary('');

    try {
      const response = await AISummaryController.createSummaryTask({
        type: contentType,
        targetId: contentId,
        model: model,
      });

      const taskId = response.data.taskId;
      startStreaming(taskId);
    } catch (err) {
      setError('创建任务失败，请重试');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!visible) {
      setSummary('');
      setError(null);
      setIsFinished(false);
    }
  }, [visible]);

  return (
    <Modal
      title="AI 总结生成"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          关闭
        </Button>,
        <Button
          key="generate"
          type="primary"
          loading={loading}
          onClick={isFinished ? onClose : handleCreateSummaryTask}
        >
          {isFinished ? '完成' : '生成总结'}
        </Button>,
      ]}
    >
      <Select
        style={{ width: '100%', marginBottom: 16 }}
        value={model}
        onChange={(value) => setModel(value)}
      >
        <Option value="deepseek-chat">DeepSeek-V3</Option>
        <Option value="deepseek-reasoner">DeepSeek-R1</Option>
      </Select>

      {error && (
        <div style={{ color: 'red', marginBottom: 16 }}>
          {error}
          <Button type="link" onClick={handleCreateSummaryTask}>
            重试
          </Button>
        </div>
      )}

      {summary && (
        <div
          style={{
            whiteSpace: 'pre-wrap',
            marginTop: 16,
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: '#f0f0f0',
          }}
        >
          {summary}
        </div>
      )}
    </Modal>
  );
};

export default AiSummaryModal;
