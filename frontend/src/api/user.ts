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
    return request('/user/register?captcha=' + captcha, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export function updateNickname(nickname: string) {
    return request('/user/update/nickname', {
        method: 'PATCH',
        body: JSON.stringify({nickname}),
    });
}

export function userInfo() {
    return request('/user/info');
}

export function resetPassword(token: string, newPassword: string) {
    return request(`/user/reset-password?token=${token}&newPassword=${newPassword}`, {
        method: 'POST',
    });
}

export function resetPasswordRequest(captcha: string, email: string) {
    return request(`/user/request-password-reset?captcha=${captcha}&email=${email}`, {
        method: 'POST',
    });
}
