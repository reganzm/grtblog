import { getAllSharesByPage } from '@/api/share';
import { Moment } from '@/types';
import { noto_sans_sc, noto_serif_sc_bold } from '@/app/fonts/font';
import AllMomentClient from '@/components/moment/AllMomentClient';
import { clsx } from 'clsx';
import FloatingMenu from "@/components/menu/FloatingMenu";
import React from "react";

export default async function AllMomentPage() {
  const pageSize = 5;
  const initialMoments: Moment[] = await getAllSharesByPage(1, pageSize);

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bolder', marginTop: '2em' }} className={noto_sans_sc.className}>
        随手记录
      </h1>
      <div className={clsx(noto_serif_sc_bold.className, 'text-gray-500 text-md mb-4 mt-4')}> 记录生活中的点点滴滴</div>
      <AllMomentClient initialMoments={initialMoments} />
        <FloatingMenu items={[]}/>
    </div>
  );
}
