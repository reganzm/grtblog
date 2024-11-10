import { ofetch } from 'ofetch';

const ins = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || '/api/v1', // 确保在浏览器和 Node.js 环境下都能正常运行
});

export const request = async (url: string, options?: RequestInit) => {
  const res = await ins(url, options);
  console.log('===正在请求' + url);
  console.log(res);
  if (res.code !== 0) {
    return null;
  } else {
    return res.data;
  }
};

const ins_bff = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_BFF_BASE_URL || '/api/bff', // 确保在浏览器和 Node.js 环境下都能正常运行
});

export const request_bff = async (url: string, options?: RequestInit) => {
  const res = await ins_bff(url, options);
  console.log('===正在请求' + url);
  console.log(res);
  if (res.code !== 0) {
    throw new Error(res.msg);
  } else {
    return res.data;
  }
};
