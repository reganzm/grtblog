import {request} from './request';

export function searchItems(keyword: string, options = {}) {
    return request('/search?keyword=' + keyword, options);
}
