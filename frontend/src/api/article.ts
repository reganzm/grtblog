import { request } from './request';

export function getLastFiveArticles() {
  return request('/article/lastFive');
}
