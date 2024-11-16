import { request } from './request';

export function getAllNavItem(options = {}) {
  return request('/nav', options);
}
