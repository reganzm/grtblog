import { request } from '@umijs/max';

export const getCategoryListApi = async () => {
  return request('/api/admin/category', {
    method: 'GET',
  });
};

export const addCategoryApi = async (data: any) => {
  return request('/api/admin/category', {
    method: 'POST',
    data,
  });
};

export default {
  getCategoryListApi,
  addCategoryApi,
};
