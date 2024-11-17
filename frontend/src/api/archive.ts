import { request } from './request';

export function getArchives(options = {}) {
  return request('/archive', options);
}
