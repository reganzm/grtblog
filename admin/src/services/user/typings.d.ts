export interface UserLoginApiParams {
  userEmail: string;
  password: string;
}

// 返回接口
export interface UserLoginApiRes {
  id: string;
  nickname: string;
  email: string;
  avatar: string;
  createdAt: string;
  oauthProvider: string | null;
}

// 更新用户信息接口
export interface UpdateUserInfoApiParams {
  nickname: string;
  avatar: string;
}

// 更新用户信息返回接口
export interface UpdateUserInfoApiRes {
  nickname: string;
  avatar: string;
}

// 获取用户信息返回接口
export interface GetUserInfoApiRes {
  nickname: string;
  avatar: string;
  email: string;
  createdAt: string;
  oauthProvider: string | null;
}
