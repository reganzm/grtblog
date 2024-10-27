import {client} from './services.gen';

client.setConfig({
    baseUrl: '/api/v1',
});

client.interceptors.request.use((request, options) => {
    console.log("=====================")
    console.log("request", request.url);
    request.headers.set('Authorization', 'Bearer <my_token>');
    return request;
});

client.interceptors.response.use((response, request, options) => {
    return response;
});
