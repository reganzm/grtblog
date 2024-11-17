import { request } from './request';

export function getLastFourShare(options = {}) {
  return request('/statusUpdate/lastFour', options);
}

export function getLastShare() {
  return request('/statusUpdate/last');
}

export function getAllSharesByPage(page: number = 1, pageSize: number = 1) {
  return request(`/statusUpdate/all?page=${page}&pageSize=${pageSize}`);
}
