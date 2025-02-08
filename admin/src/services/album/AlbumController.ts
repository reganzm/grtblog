import { request } from '@umijs/max';

async function uploadPhoto(params: {
    url: string;
    device: string;
    location: string;
    description: string;
    time: string;
    shade: string;
}) {
    return request('/api/v1/photos/upload', {
        method: 'POST',
        data: params,
    });
}



export default {
    uploadPhoto
};
