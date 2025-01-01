import {request} from './request';

export interface Notification {
    id: string;
    content: string;
    publishAt: string;
    expireAt: string;
    allowClose: boolean;
}

export function getGlobalNotification(options = {}): Promise<Notification> {
    return request('/notification', options);
}
