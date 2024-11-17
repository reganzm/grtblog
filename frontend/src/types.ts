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
  articleId: string;
  avatarUrl: string;
  children: Comment[];
  content: string;
  createdAt: string;
  location: string;
  parentId: string;
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
