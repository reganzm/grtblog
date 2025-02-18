import { request } from '@umijs/max';

export const getSysStatusApi = async () => {
  try {
    const response = await request('/api/v1/actuator/health', {
      method: 'GET',
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 503) {
      return {
        status: 'DOWN',
        message:
          'Service is temporarily unavailable, but here is some content.',
        data: error.response.data,
      };
    }
    throw error;
  }
};

export default {
  getSysStatusApi,
};
