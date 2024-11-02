import React from 'react';
import AuthorBanner from '@/app/home/AuthorBanner';
import HomePageMomentShow from '@/components/moment/HomePageMomentShow';
import RecentArticle from '@/app/home/recent/RecentArticle';
import { Container } from '@radix-ui/themes';
import RecentMoment from '@/app/home/recent/RecentMoment';
import styles from '@/styles/HomePage.module.scss';

export default function Home() {
  return (
    <div>
      <Container size={'4'}>
        <AuthorBanner />
        <HomePageMomentShow />
      </Container>
      <div className={'flex justify-center'}>
        <div className={styles.responsiveContainer}>
          <RecentArticle />
          <RecentMoment />
        </div>
      </div>
    </div>
  );
}
