import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { getLastFourShare } from '@/api/share';

const RecentMoment = async () => {
  const shareList = await getLastFourShare();
  console.log(shareList);
  return (
    <div>
      <div className="text-2xl font-bold text-start mb-8"> 随手记录</div>
      <div className="text-end mt-8">
        <Link href="/posts" className="text-blue-500"> 查看更多 </Link>
        <ArrowRightIcon className="w-6 h-6 inline-block" />
      </div>
    </div>
  );
};

export default RecentMoment;
