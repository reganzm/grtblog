'use client';

import React, { useEffect } from 'react';
import { Progress, ProgressProps } from 'antd';
import emitter from '@/utils/eventBus';
import { useTheme } from 'next-themes';
import { ArrowUpIcon } from 'lucide-react';

const ReadingProgress = () => {
  const [progress, setProgress] = React.useState(0);
  const setProgressHandle = (progress: number) => {
    setProgress(progress);
  };
  const [bgColor, setBgColor] = React.useState('transparent');
  const isDark = useTheme().theme === 'dark';

  const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  useEffect(() => {
    setBgColor(isDark ? '#333' : '#ccc');
    emitter.on('readingProgress', setProgressHandle as (event: unknown) => void);
    return () => {
      emitter.off('readingProgress', setProgressHandle as (event: unknown) => void);
    };
  }, [isDark]);

  const handleScrollToTop = () => {
    console.log('scroll to top');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      position: 'sticky',
      marginTop: '2rem',
      display: 'flex',
    }}>
      <div>
        <Progress
          type="circle"
          trailColor={bgColor}
          strokeColor={twoColors}
          percent={progress}
          strokeWidth={20}
          size={14}
          format={(number) => ` 当前阅读进度 ${number && Math.round(number)}%`}
        />
        <span className="ml-1 text-sm">{progress && Math.floor(progress)} %</span>
      </div>
      <div
        style={{
          opacity: progress > 5 ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
        className="ml-2 flex items-center cursor-pointer"
        onClick={handleScrollToTop}
      >
        <ArrowUpIcon width={14} height={14} />
        <span className="text-sm"> 返回顶部 </span>
      </div>
    </div>
  );
};

export default ReadingProgress;
