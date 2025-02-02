export interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}

export interface PagedApiResponse<T> {
  code: number;
  data: {
    data: T[];
    total: number;
  };
  msg: string;
}
