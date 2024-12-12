import {request} from './request';

export function getFriendList(options = {}) {
    return request('/friendLink', options);
}

export function applyFriendLink(data: {
    name: string,
    url: string,
    logo: string,
    description: string,
}) {
    return request('/friendLink/apply', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
