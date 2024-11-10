import { request } from './request';

export interface LoginForm {
  userEmail: string;
  password: string;
}

export function userLogin(data: LoginForm) {
  const formData = new FormData();
  formData.append('userEmail', data.userEmail);
  formData.append('password', data.password);

  return request('/user/login', {
    method: 'POST',
    body: formData,
  });
}

export function userRegister(data: LoginForm) {
  const formData = new FormData();
  formData.append('userEmail', data.userEmail);
  formData.append('password', data.password);

  return request('/user/register', {
    method: 'POST',
    body: formData,
  });
}

export function userInfo() {
  return request('/user/info');
}
