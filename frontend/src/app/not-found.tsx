'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import svg404 from '@/assets/404.svg';
import { noto_sans_sc } from '@/app/fonts/font';
import { clsx } from 'clsx';

const NotFound = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          window.location.href = '/';
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={'flex justify-center items-center flex-col'}>
      <Image className={'mb-8'}
             src={svg404} alt={'404'} width={500} height={400} />
      <div className={clsx(
        noto_sans_sc,
        'text-2xl font-bold text-center',
      )}> 啊嘞！这个页面找不到了！
      </div>
      <div className="text-center mt-4">
        {` 将在 ${countdown} 秒后跳转到主页 `}
      </div>
      <Link href="/" className="text-blue-500 mt-4"> 返回主页 </Link>
    </div>
  );
};

export default NotFound;
