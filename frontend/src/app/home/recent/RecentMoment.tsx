import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import RecentMomentMotion from '@/app/home/recent/RecentMomentMotion';
import { StatusUpdate } from '@/types';

interface RecentMomentProps {
  shareList: StatusUpdate[];
}

const RecentMoment = ({ shareList }: RecentMomentProps) => {
  return (
    <div style={{ padding: '0 20px' }}>
      <div className="text-2xl font-bold text-start mb-8"> 随手记录</div>
      <RecentMomentMotion list={shareList} />
      <div className="text-end mt-8">
        <Link href="/posts" className="text-blue-500"> 查看更多 </Link>
        <ArrowRightIcon className="w-6 h-6 inline-block" />
      </div>
    </div>
  );
};

export default RecentMoment;
