'use client';

import React, { useRef, useEffect } from 'react';
import eventBus from '@/utils/eventBus';

const ArticleScrollSync = ({ children }: { children: React.ReactNode }) => {
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        // 这里计算滚动百分比，至于目录的话直接传递元素到 Toc 组件进行处理
        // 获取元素顶部与视口顶部的距离，然后除以元素的高度，得到滚动百分比
        const scrollLength = -articleRef.current.getBoundingClientRect().top;
        const elementHeight = articleRef.current.clientHeight;
        const scrollPercentage = scrollLength / elementHeight * 100 > 100 ? 100 : scrollLength / elementHeight * 100;

        // 发布事件，直接将 articleRef.current 作为参数传递
        eventBus.emit('scroll', articleRef.current);
        eventBus.emit('scrollPosition', scrollPercentage);
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
  }, []);

  return (
    <div ref={articleRef}>
      {children}
    </div>
  );
};

export default ArticleScrollSync;
