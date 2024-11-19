'use client';

import React, {useRef, useEffect} from 'react';
import eventBus from '@/utils/eventBus';
import {Moment} from "@/types";
import {Post} from "@/components/article/ArticleView";

export type TitleEvent = {
    type: string;
    title: string;
    categoryName: string;
};

const ArticleScrollSync = ({children, post}: { children: React.ReactNode, post: Post | Moment }) => {
    const articleRef = useRef<HTMLDivElement>(null);
    const [showTitle, setShowTitle] = React.useState(false);
    const [curScrollLength, setCurScrollLength] = React.useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (articleRef.current) {
                // 这里计算滚动百分比，至于目录的话直接传递元素到 Toc 组件进行处理
                // 获取元素顶部与视口顶部的距离，然后除以元素的高度，得到滚动百分比
                const scrollLength = -articleRef.current.getBoundingClientRect().top;
                const elementHeight = articleRef.current.clientHeight;
                const windowHeight = window.innerHeight;
                let scrollPercentage = Math.min((scrollLength / (elementHeight - windowHeight)) * 100, 100);
                if (scrollPercentage < 0) {
                    scrollPercentage = 0;
                }

                if (scrollLength > 68 && scrollLength > curScrollLength) {
                    // 这里要给 Navbar 通信以显示标题
                    setShowTitle(true);
                    if (showTitle) {
                        console.log('showTitle:', showTitle);
                    }

                    eventBus.emit('showTitle', {
                        type: '文章',
                        title: post.title,
                        categoryName: post.categoryName,
                    } as TitleEvent);
                } else {
                    setShowTitle(false);
                    eventBus.emit('hideTitle');
                }

                setCurScrollLength(scrollLength);

                // 这里最后一屏的问题，如果文章底部进入视口，那么滚动百分比就是 100

                // 发布事件，直接将 articleRef.current 作为参数传递
                eventBus.emit('scroll', articleRef.current);
                eventBus.emit('readingProgress', scrollPercentage);
            }
        };

        const articleElement = articleRef.current;
        if (articleElement) {
            // 注意这里要为 document 添加 scroll 事件，因为 articleElement 是一个 div，本身触发不了 scroll 事件
            document.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (articleElement) {
                // 清除事件监听
                document.removeEventListener('scroll', handleScroll);
            }
        };
    }, [curScrollLength, post.title, post.categoryName]);

    return (
        <div ref={articleRef}>
            {children}
        </div>
    );
};

export default ArticleScrollSync;
