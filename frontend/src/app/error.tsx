'use client';

import React from 'react';
import { Button, Container } from '@radix-ui/themes';
import { clsx } from 'clsx';
import { error_font, noto_sans_sc } from '@/app/fonts/font';

const Error = () => {
  return (
    <Container size={'2'}>
      <div className="mt-48 flex flex-col items-center">
        <h1 className={clsx('text-[5em] text-center', error_font.className)}>Oops!</h1>
        <div className={clsx(noto_sans_sc.className, 'text-center mt-8 text-lg font-bold mb-8')}>
          看起来客户端组件渲染出现了一些问题 (｡•́︿•̀｡)
          <p className="text-sm mt-4"> 你可以尝试刷新页面，如果问题依旧，请联系站长</p>
          <p className="text-sm mt-4 text-gray-400 dark:text-gray-500"> 很是抱歉.｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡. </p>
        </div>
        <Button onClick={
          () => location.reload()
        }> 刷新页面 </Button>
      </div>
    </Container>
  );
};

export default Error;
