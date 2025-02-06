import { request } from '@umijs/max';

async function createSummaryTask(params: {
  type: 'ARTICLE' | 'MOMENT' | 'PAGE';
  targetId: string;
  model: string;
}) {
  return request('/api/v1/summary', {
    method: 'POST',
    data: params,
  });
}

function streamSummary(taskId: string) {
  return new EventSource(`/api/v1/summary/stream/${taskId}`, {
    withCredentials: true,
  });
}

export default {
  createSummaryTask,
  streamSummary,
};
