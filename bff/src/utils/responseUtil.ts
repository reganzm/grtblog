export interface ApiResponse<T> {
  code: number;
  msg: string;
  data?: T;
}

export const success = <T>(data: T): ApiResponse<T> => {
  return {
    code: 0,
    msg: '',
    data: data,
  };
};

export const error = (code: number, msg: string): ApiResponse<null> => {
  return {
    code: code,
    msg: msg,
    data: null,
  };
};
