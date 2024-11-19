export interface Article {
    id: number;
    title: string;
    shortUrl: string;
    content: string;
    createdAt: string;
}

export type StatusUpdate = {
    id: string;
    title: string;
    createdAt: string;
}

export interface ArticlePreview {
    id: string;
    title: string;
    summary: string;
    shortUrl: string;
    cover: string;
    createdAt: string;
    authorName: string;
    avatar: string;
    comments: number;
    likes: number;
    views: number;
}

export type Comment = {
    id: string;
    areaId: string;
    avatarUrl: string;
    children: Comment[];
    content: string;
    createdAt: string;
    location: string;
    parentId: string;
    parentUserName: string;
    updatedAt: string;
    userName: string;
    website: string;
};

export interface ArticleArchive {
    title: string;
    shortUrl: string;
    category: string;
    createdAt: string;
}

export interface StatusUpdateArchive {
    title: string;
    shortUrl: string;
    category: string;
    createdAt: string;
}

export interface YearlyArchive {
    year: number;
    articleCount: number;
    statusUpdateCount: number;
    articles: ArticleArchive[];
    statusUpdates: StatusUpdateArchive[];
}

/**
 * Moment
 */
export interface Moment {
    /**
     * 作者名字
     */
    authorName: string;
    /**
     * 作者头像
     */
    authorAvatar: string;
    /**
     * 评论次数
     */
    comments: number;
    /**
     * 说说创建时间
     */
    createdAt: string;
    /**
     * 图片
     */
    images: string[];
    /**
     * 点赞次数
     */
    likes: number;
    /**
     * 说说短链接
     */
    shortUrl: string;
    /**
     * 说说摘要
     */
    summary: string;
    /**
     * 说说标题
     */
    title: string;
    /**
     * 分类
     */
    categoryName: string;
    /**
     * 说说更新时间
     */
    updatedAt: string;
    /**
     * 查看次数
     */
    views: number;
    /**
     * 是否置顶
     */
    isTop: boolean;
    /**
     * 是否热门
     */
    isHot: boolean;
    /**
     * 挂载评论区 id
     */
    commentId: string;
}
