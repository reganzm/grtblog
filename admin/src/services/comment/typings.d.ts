export interface CommentVO {
  id: string;
  areaId: string;
  content: string;
  authorId: string;
  nickName: string;
  ip: string;
  location: string;
  platform: string;
  browser: string;
  email: string;
  website: string;
  isViewed: boolean;
  isTop: boolean;
  createdAt: string; // Use string to represent LocalDateTime
  updatedAt: string; // Use string to represent LocalDateTime
  isOwner: boolean;
  isAuthor: boolean;
  isFriend: boolean;
  deletedAt?: string; // Optional, use string to represent LocalDateTime
  parentId?: string; // Optional
}
