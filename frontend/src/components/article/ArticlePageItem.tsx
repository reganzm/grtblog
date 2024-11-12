import React from 'react';

export type ArticlePreview = {
  authorName: string,
  comments: number,
  cover: string | null,
  createdAt: string,
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

    </div>
  );
};

export default ArticlePageItem;
