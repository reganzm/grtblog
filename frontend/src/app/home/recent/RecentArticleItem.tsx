import React from 'react';

const RecentArticleItem = ({ article }) => {
  return (
    <div>
      <div>{article.title}</div>
      <div>{article.authorName}</div>
      <div>{article.createdAt}</div>
    </div>
  );
};

export default RecentArticleItem;
