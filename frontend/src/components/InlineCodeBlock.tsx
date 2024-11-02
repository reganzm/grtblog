'use client';

import React from 'react';
import { jetbrains_mono } from '@/app/fonts/font';
import { Code } from '@radix-ui/themes';

const InlineCodeBlock = (props: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <Code {...props}
          color={'gray'} variant={'soft'}
          style={{ transition: 'color 0.3s, background-color 0.3s' }}
          className={jetbrains_mono.className}
    >
    </Code>
  );
};

export default InlineCodeBlock;
