import { request } from './request';

export function getLastFiveArticles(options = {}) {
  return request('/article/lastFive', options);
}

export function getRelatedArticles(id: string, options = {}) {
  return request(`/article/recommend/${id}`, options);
}

export function getAllArticlesByPage(page: number, pageSize = 10, options = {}) {
  return request(`/article/all?page=${page}&pageSize=${pageSize}`, options);
}
