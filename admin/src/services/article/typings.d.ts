// 参数接口
export interface AddArticleApiParams {
  /* */
  title?: string;

  /* */
  content?: string;

  /* */
  cover?: string;

  /* */
  categoryId?: number;

  /* */
  tags?: string;

  /* */
  isPublished?: boolean;
}

// 响应接口
export interface AddArticleApiRes {
  /* */
  code: number;

  /* */
  msg: string;

  /* */
  data: {
    /* */
    id: number;

    /* */
    title: string;

    /* */
    content: string;

    /* */
    authorId: number;

    /* */
    cover: string;

    /* */
    views: number;

    /* */
    likes: number;

    /* */
    comments: number;

    /* */
    status: string;

    /* */
    created: Record<string, unknown>;

    /* */
    updated: Record<string, unknown>;

    /* */
    deleted: Record<string, unknown>;
  };
}
