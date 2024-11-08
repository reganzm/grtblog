import { request } from './request';

export function getLastFiveArticles(options = {}) {
  return request('/article/lastFive', options);
}

export function getRelatedArticles(id: string, options = {}) {
  return request(`/article/recommend/${id}`, options);
}
