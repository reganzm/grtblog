import { request } from './request';

export function getAllTags(options = {}) {
  return request('/tag', options);
}
