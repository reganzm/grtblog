// 参数接口
export interface AddArticleApiParams {
  /* */
  title?: string;

  /* */
  content?: string;

  /* */
  cover?: string;

  /* */
  categoryId?: string;

  shortUrl?: string;

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
    id: string;

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

export interface ArticleVO {
  /* */
  id: string;

  /* */
  title: string;

  /* */
  summary: string;

  /* */
  toc: string;

  /* */
  content: string;

  /* */
  author: string;

  /* */
  cover: string;

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

export interface PostStatusToggle {
  is_published: boolean;
  is_top: boolean;
  is_hot: boolean;
  is_original: boolean;
}
