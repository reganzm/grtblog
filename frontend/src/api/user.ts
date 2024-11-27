import {request} from './request';

export interface LoginForm {
    userEmail: string;
    password: string;
}

export function userLogin(data: LoginForm, captcha: string) {
    const formData = new FormData();
    formData.append('userEmail', data.userEmail);
    formData.append('password', data.password);

    return request('/user/login?captcha=' + captcha, {
        method: 'POST',
        body: formData,

    });
}

export function userRegister(data: LoginForm, captcha: string) {
    const formData = new FormData();
    formData.append('userEmail', data.userEmail);
    formData.append('password', data.password);

    return request('/user/register?captcha=' + captcha, {
        method: 'POST',
        body: formData,
    });
}

export function updateNickname(nickname: string) {
    const formData = new FormData();
    formData.append('nickname', nickname);

    return request('/user/update/nickname', {
        method: 'PATCH',
        body: formData,
    });
}

export function userInfo() {
    return request('/user/info');
}
