import React from 'react';
import AuthorCard from '@/app/home/AuthorCard';
import BannerTitle from '@/app/home/BannerTitle';
import styles from '@/styles/home/AuthorBanner.module.scss';

const AuthorBanner = () => {
  return (
    <div className={styles.banner}>
      <BannerTitle />
      <AuthorCard />
    </div>
  );
};

export default AuthorBanner;
