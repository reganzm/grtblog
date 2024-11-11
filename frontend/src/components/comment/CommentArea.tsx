import React, { Suspense, lazy } from 'react';
import { Skeleton } from '@radix-ui/themes';
import CommentForm from '@/components/comment/CommentForm';

const CommentList = lazy(() => import('@/components/comment/CommentList'));

const CommentArea = ({ id }: { id: string }) => {
  return (
    <div>
      {id} 的评论区域
      <Suspense fallback={<div> 共 <Skeleton /> 条评论 </div>}>
        <CommentForm id={id} />
      </Suspense>
      <Suspense fallback={<div> 加载中...</div>}>
        <CommentList id={id} />
      </Suspense>
    </div>
  );
};

export default CommentArea;
