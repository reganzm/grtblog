// import { request } from '@umijs/max';
// import { AdminLoginApiParams, AdminLoginApiRes } from '@/services/admin/typings';
//
// const adminLogin = async (data: AdminLoginApiParams): Promise<AdminLoginApiRes> => {
//   const formData = new FormData();
//   (Object.keys(data) as (keyof AdminLoginApiParams)[]).forEach(key => formData.append(key as string, data[key]));
//
//   return request('/api/admin/login', {
//     method: 'POST',
//     data: formData,
//     requestType: 'form',
//   });
// };
//
// export default {
//   adminLogin,
// };
