import { createSlice } from '@reduxjs/toolkit';
import {removeToken} from "@/utils/token";

// export const updateUserInfoAsync = createAsyncThunk(
//   "user/updateUserInfoAsync",
//   async (payload, thunkApi) => {
//     await editUser(payload.userId, payload.newInfo);
//     thunkApi.dispatch(updateUserInfo(payload.newInfo));
//   }
// );

export type User = {
  isLogin: boolean;
  userInfo: UserInfo
}
export type UserInfo = {
  id: string;
  nickname: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  oauthProvider: string | null;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    // 初始化用户信息
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    // 修改用户登录状态
    changeLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    },
    // 清除用户信息
    clearUserInfo: (state, { payload }) => {
      console.log('clearUserInfo' + payload);
      removeToken();
      state.userInfo = {};
    },
  },
});

export const { initUserInfo, changeLoginStatus, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;

