export interface Article {
  id: number;
  title: string;
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
  cover: string;
  createdAt: string;
  authorName: string;
  avatar: string;
  comments: number;
  likes: number;
  views: number;
}
