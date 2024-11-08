import { request } from './request';

export function getLastFiveArticles(options = {}) {
  return request('/article/lastFive', options);
}
