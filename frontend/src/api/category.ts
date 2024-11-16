import { request } from './request';

export function getAllCategories(options = {}) {
  return request('/category/all', options);
}
