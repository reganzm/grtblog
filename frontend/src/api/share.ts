import { request } from './request';

export function getLastFourShare() {
  return request('/statusUpdate/lastFour');
}

export function getLastShare() {
  return request('/statusUpdate/last');
}
