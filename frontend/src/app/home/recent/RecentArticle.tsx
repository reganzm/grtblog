import React from 'react';
import { getLastFiveArticles } from '@/api/article';
import RecentArticleMotion from '@/app/home/recent/RecentArticleMotion';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';

const RecentArticle = async () => {
  const articleList = await getLastFiveArticles();
  return (
    <div style={{
      padding: '0 20px',
    }}>
      <div className="text-2xl font-bold text-start mb-8"> 最近文章</div>
      <RecentArticleMotion list={articleList} />
      <div className="text-end mt-8">
        <Link href="/posts" className="text-blue-500"> 查看更多 </Link>
        <ArrowRightIcon className="w-6 h-6 inline-block" />
      </div>
    </div>
  );
};

export default RecentArticle;
