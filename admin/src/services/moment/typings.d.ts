// 参数接口
export interface AddMomentApiParams {
  /* */
  title?: string;

  /* */
  content?: string;

  /* */
  cover?: string;

  img: string;

  /* */
  categoryId?: string;

  shortUrl: string;

  isTop: boolean;

  isOriginal: boolean;

  /* */
  isPublished?: boolean;
}

// 响应接口
export interface AddMomentApiRes {
  /* */
  code: number;

  /* */
  msg: string;

  /* */
  data: MomentVO;
}

export interface MomentVO {
  /* */
  id: string;

  /* */
  title: string;

  /* */
  summary: string;

  /* */
  content: string;

  /* */
  authorName: string;

  /* */
  img: string;

  /* */
  categoryId: string;

  /* */
  views: number;

  /* */
  likes: number;

  /* */
  comments: number;

  /* */
  shortUrl: string;

  /* */
  isPublished: boolean;

  /* */
  createdAt: Record<string, unknown>;

  /* */
  updatedAt: Record<string, unknown>;

  /* */
  deletedAt: Record<string, unknown>;

  /* */
  isTop: boolean;

  /* */
  isHot: boolean;

  /* */
  isOriginal: boolean;
}
