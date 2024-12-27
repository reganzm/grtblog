import { request } from './request';

export function getFeedList(options = {}) {
    return request('/feed', options);
}


