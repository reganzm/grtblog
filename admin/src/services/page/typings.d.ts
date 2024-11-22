// 参数接口
export interface AddPageApiParams {
  /* */
  title: string;

  /* */
  content: string;

  description: string;

  /* */
  refPath: string;

  /* */
  enable: boolean;

  /* */
  canComment: boolean;
}

// 响应接口
export interface AddPageApiRes {
  /* */
  code: number;

  /* */
  msg: string;

  /* */
  data: PageVO;
}

export interface PageVO {
  id: string;
  title: string;
  description: string;
  refPath: string;
  toc: string;
  content: string;
  views: number;
  likes: number;
  comments: number;
  commentId: string;
  enable: boolean;
  canDelete: boolean;
  createdAt: string;
  updatedAt: string;
}
