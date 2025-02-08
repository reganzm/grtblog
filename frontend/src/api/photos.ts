import {request} from './request';

export function fetchPhotosByPage(page: number, pageSize: number, options = {}) {
    return request(`/photos?page=${page}&pageSize=${pageSize}`, options);
}
