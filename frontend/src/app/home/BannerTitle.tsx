'use client';

import React from 'react';
import {clsx} from 'clsx';
import styles from '@/styles/Home.module.scss';
import {noto_sans_sc, playwrite_us_modern, varela_round} from '@/app/fonts/font';
import {ReactTyped} from 'react-typed';
import {useWebsiteInfo} from "@/app/website-info-provider";

const BannerTitle = () => {
    const websiteInfo = useWebsiteInfo();

    return (
        <div
            style={{
                transition: 'all 0.5s',
            }}
            className={clsx(
                styles.bannerInfo,
                'flex flex-col justify-center flex-1 p-10',
            )}>
            <div className={clsx(
                varela_round.className,
                styles.title,
            )}>
                <ReactTyped
                    strings={[websiteInfo.HOME_TITLE]}
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
                    strings={[websiteInfo.HOME_SLOGAN_EN]}
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
                    strings={[websiteInfo.HOME_SLOGAN]}
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
