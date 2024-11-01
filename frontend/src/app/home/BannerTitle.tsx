'use client';

import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import styles from '@/styles/Home.module.scss';
import { noto_sans_sc, playwrite_us_modern, varela_round } from '@/app/fonts/font';
import { ReactTyped } from 'react-typed';

const BannerTitle = () => {
  useEffect(() => {
  }, []);

  return (
    <div className={clsx(
      styles.bannerInfo,
      'flex flex-col justify-center flex-1',
    )}>
      <div className={clsx(
        varela_round.className,
        styles.title,
      )}>
        <ReactTyped
          strings={['Grtsinry43\'s Blog']}
          typeSpeed={40}
          fadeOut={true}
          startWhenVisible={true}
          shuffle={true}
          autoInsertCss={true}
          onComplete={(self) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            self.cursor && self.cursor.remove();
          }}
        />
      </div>
      <div className={clsx(
        playwrite_us_modern.className,
        styles.subtitle,
      )}>
        <ReactTyped
          strings={['Nothing but enthusiasm brightens up the endless years.']}
          typeSpeed={20}
          startDelay={1000}
          fadeOut={true}
          startWhenVisible={true}
          shuffle={true}
          autoInsertCss={true}
          onComplete={(self) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            self.cursor && self.cursor.remove();
          }}
        />
      </div>
      <div className={clsx(
        noto_sans_sc.className,
        styles.subtitle,
        'mt-3',
      )}>
        <ReactTyped
          strings={['总之岁月漫长，然而值得等待']}
          typeSpeed={40}
          startDelay={2000}
          fadeOut={true}
          startWhenVisible={true}
          shuffle={true}
          autoInsertCss={true}
          onComplete={(self) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            self.cursor && self.cursor.remove();
          }}
        />
      </div>
    </div>
  );
};

export default BannerTitle;
