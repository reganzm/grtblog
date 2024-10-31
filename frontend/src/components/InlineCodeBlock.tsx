'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { jetbrains_mono } from '@/app/fonts/font';

const InlineCodeBlock = (props) => {
  const { resolvedTheme } = useTheme(); // 获取 resolvedTheme

  const [currentTheme, setCurrentTheme] = useState(''); // 用状态管理主题

  useEffect(() => {
    // 根据主题切换设置 currentTheme
    setCurrentTheme(resolvedTheme === 'dark' ? '#333' : '#f5f5f5');
    return () => {
      setCurrentTheme(''); // 组件卸载时重
    };
  }, [resolvedTheme]); // 依赖于 resolvedTheme


  return (
    <span style={{
      padding: '2px',
      margin: '0 2px',
      borderRadius: '3px',
      transition: 'background-color 0.5s',
      backgroundColor: currentTheme,
    }}
          {...props} className={jetbrains_mono.className}
    >
    </span>
  );
};

export default InlineCodeBlock;
