import { request } from './request';

export function getWebsiteInfo(options = {}) {
  return request('/websiteInfo', options);
}
