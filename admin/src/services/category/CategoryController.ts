import { request } from '@umijs/max';

export const getCategoryListApi = async () => {
  return request('/api/v1/admin/category', {
    method: 'GET',
  });
};

export const addCategoryApi = async (data: { name: string }) => {
  return request('/api/v1/admin/category', {
    method: 'POST',
    data,
  });
};

export default {
  getCategoryListApi,
  addCategoryApi,
};
