import React from 'react';
import RecentArticleMotion from '@/app/home/recent/RecentArticleMotion';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Article } from '@/types';

interface RecentArticleProps {
  articleList: Article[];
}

const RecentArticle: React.FC<RecentArticleProps> = ({ articleList }) => {
  return (
    <div style={{ padding: '0 20px', flex: 1 }}>
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
