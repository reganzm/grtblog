import { request } from './request';

export const getPageView = (options = {}) => {
    return request('/page-view', options);
}
