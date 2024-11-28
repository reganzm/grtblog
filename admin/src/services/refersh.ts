import { request } from '@umijs/max';

export const refreshFrontendCache = async () => {
    return request(`/api/frontend/api/refresh`, {
        method: 'GET',
    });
};
