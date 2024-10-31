import React from 'react';
import AuthorBanner from '@/app/home/AuthorBanner';
import HomePageMomentShow from '@/components/moment/HomePageMomentShow';
import RecentArticle from '@/app/home/recent/RecentArticle';

export default function Home() {
  return (
    <div>
      <AuthorBanner />
      <HomePageMomentShow />
      <div>
        <RecentArticle />
      </div>
    </div>
  );
}
