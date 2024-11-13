import React from 'react';

export type ArticlePreview = {
  authorName: string,
  comments: number,
  cover: string | null,
  createdAt: string,
  categoryName: string,
  id: string,
  isTop: boolean,
  likes: number,
  summary: string,
  title: string,
  views: number
}

const ArticlePageItem = ({ post }: { post: ArticlePreview }) => {
  return (
    <div>
      <div className="text-2xl font-bold">{post.title}</div>
      <div className="text-gray-500 text-sm mt-2">{post.summary}</div>
      <div className="text-gray-500 text-sm mt-2"> 作者: {post.authorName}</div>
      <div className="text-gray-500 text-sm mt-2"> 分类: {post.categoryName}</div>
      <div className="text-gray-500 text-sm mt-2"> 发布时间: {post.createdAt}</div>
      <div className="text-gray-500 text-sm mt-2"> 浏览数: {post.views}</div>
      <div className="text-gray-500 text-sm mt-2"> 评论数: {post.comments}</div>
      <div className="text-gray-500 text-sm mt-2"> 点赞数: {post.likes}</div>
    </div>
  );
};

export default ArticlePageItem;
