"use client";

import React, {useEffect, useState} from 'react';
import {useTheme} from 'next-themes';
import styles from '@/styles/moment/MomentPage.module.scss';

const BackgroundGrid: React.FC = () => {
    const {resolvedTheme} = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(resolvedTheme === 'dark');
    }, [resolvedTheme]);

    return (
        <div className={isDark ? styles['moment-dark'] : styles['moment-light']}/>
    );
};

export default BackgroundGrid;
