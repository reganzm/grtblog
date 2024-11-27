// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

import UserController from '@/services/user/UserController';
import { getToken, setToken } from '@/utils/token';
import { message } from 'antd';
import { AxiosResponse } from 'axios';

export async function getInitialState() {
  if (
    location.pathname ===
    (process.env.NODE_ENV === 'production' ? '/admin/login' : '/login')
  ) {
    // 强行跳登录页
    const token = getToken();
    if (token) {
      const result = await UserController.getUserInfoApi();
      if (result) {
        // 不仅有 token，而且 token 是有效的，那就直接跳转到首页
        message.warning('请先退出后在登录').then(() => {
          location.href =
            process.env.NODE_ENV === 'production' ? '/admin' : '/';
        });
      }
    }
  } else {
    console.log('location.pathname', location.pathname);
    // 强行要跳内部页面，得看看 token 有没有效
    const res = await UserController.getUserInfoApi();
    console.log('res', res);
    const data = res.data;
    console.log('result', data);
    if (data) {
      // 说明有 token，并且 token 有效
      console.log('设置用户信息成功');
      return {
        name: data.nickname,
        avatar: data.avatar,
        adminInfo: data,
      };
    } else {
      // token 验证失败，跳转至登录
      localStorage.removeItem('adminToken');
      console.log('token 验证失败，跳转至登录' + location.href);
      location.href =
        process.env.NODE_ENV === 'production' ? '/admin/login' : '/login';
      message.warning('请重新登录');
    }
  }
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    logout: () => {
      // 删除本地 token
      localStorage.removeItem('adminToken');
      // 跳转到登录页面
      location.href = '/admin/login';
      message.success('退出登录成功');
    },
  };
};

// 配置请求响应拦截器
export const request = {
  timeout: 5000,
  // 请求拦截器
  requestInterceptors: [
    function (url: string, options: any) {
      // 从本地获取 token
      const token = getToken();
      if (token) {
        options.headers['Authorization'] = 'Bearer ' + token;
      }
      return { url, options };
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    async function (response: AxiosResponse) {
      console.log('response', response);
      if (response.headers.authorization) {
        setToken(response.headers.authorization);
      }
      return response;
    },
  ],
};
