// 这个用不上啊，裂开了，这个不用全局管理的，管理员信息不重要...难绷了


// import UserController from '@/services/user/UserController';
// import { message } from 'antd';
//
// /**
//  * @description 用户模块
//  * @param {boolean} isLogin 是否登录
//  * @param {object} userInfo 用户信息
//  * 这里所有以下划线 reducers 都是内部调用的更新操作，而以 * 开头的 effects 是外部调用的异步更新操作
//  */
// export default {
//   namespace: 'user',
//   state: {
//     isLogin: false,
//     userInfo: null,
//   },
//   reducers: {
//     _setUserInfo(state: any, action: any) {
//       return {
//         ...state,
//         userInfo: action.payload,
//       };
//     },
//     _setLoginStatus(state: any, action: any) {
//       return {
//         ...state,
//         isLogin: action.payload,
//       };
//     },
//     _updateUserInfo(state: any, action: any) {
//       return {
//         ...state,
//         userInfo: {
//           ...state.userInfo,
//           ...action.payload,
//         },
//       };
//     },
//   },
//   effects: {
//     * login(action: any, { call, put }: any) {
//       try {
//         const { data } = yield call(UserController.userLoginApi, action.payload);
//         if (!data) return;
//         yield put({
//           type: '_setUserInfo',
//           payload: data,
//         });
//         yield put({
//           type: '_setLoginStatus',
//           payload: true,
//         });
//         // 如果存在回调函数，执行回调
//         if (typeof action.callback === 'function') {
//           action.callback();
//         }
//       } catch (error) {
//         message.error('登录失败，请检查用户名和密码');
//       }
//     },
//     * initUserInfo(action: any, { call, put }: any) {
//       
//       yield put({
//         type: '_setUserInfo',
//         payload: action.payload,
//       });
//       yield put({
//         type: '_setLoginStatus',
//         payload: true,
//       });
//     },
//     * logout(action: any, { put }: any) {
//       yield put({
//         type: '_setUserInfo',
//         payload: null,
//       });
//       yield put({
//         type: '_setLoginStatus',
//         payload: false,
//       });
//       // 如果存在回调函数，执行回调
//       if (typeof action.callback === 'function') {
//         action.callback();
//       }
//     },
//     * updateUserInfo(action: any, { call, put }: any) {
//       try {
//         const { data } = yield call(UserController.updateUserInfoApi, action.payload);
//         yield put({
//           type: '_updateUserInfo',
//           payload: data,
//         });
//         // 如果存在回调函数，执行回调
//         if (typeof action.callback === 'function') {
//           action.callback();
//         }
//       } catch (error) {
//         message.error('更新用户信息失败');
//       }
//     },
//   },
// };
