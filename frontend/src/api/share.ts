import { request } from './request';

export function getLastFourShare(options = {}) {
  return request('/statusUpdate/lastFour', options);
}

export function getLastShare() {
  return request('/statusUpdate/last');
}
