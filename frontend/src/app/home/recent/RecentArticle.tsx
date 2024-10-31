import React from 'react';
import { getLastFiveArticles } from '@/api/article';
import RecentArticleMotion from '@/app/home/recent/RecentArticleMotion';

const RecentArticle = async () => {
  const articleList = await getLastFiveArticles();
  console.log(articleList);
  return (
    <div>
      <RecentArticleMotion list={articleList} />
    </div>
  );
};

export default RecentArticle;
