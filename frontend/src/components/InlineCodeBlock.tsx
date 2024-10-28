'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { jetbrains_mono } from '@/app/fonts/font';

const InlineCodeBlock = (props) => {
  const theme = useTheme();
  return (
    <span style={{
      padding: '2px',
      margin: '0 2px',
      borderRadius: '3px',
      backgroundColor: theme.theme === 'dark' ? '#333' : '#f5f5f5',
    }}
          {...props} className={jetbrains_mono.className}
    >
    </span>
  );
};

export default InlineCodeBlock;
