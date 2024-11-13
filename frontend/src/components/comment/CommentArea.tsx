import React, { Suspense } from 'react';
import { Skeleton } from '@radix-ui/themes';
import TestDelay from '@/components/TestDelay';
import CommentForm from '@/components/comment/CommentForm';
import CommentList from '@/components/comment/CommentList';
import CommentListSkeleton from '@/components/comment/CommentListSkeleton';

// 这里遇到问题了，Suspense 包裹的是服务端组件，也就是需要服务端组件包裹来占位
const CommentArea = ({ id }: { id: string }) => {
  return (
    <div>
      {id} 的评论区域
      <Suspense fallback={<div> 加载中...</div>}>
        <TestDelay id={id} />
      </Suspense>
      <Suspense fallback={<div> 共 <Skeleton /> 条评论 </div>}>
        <CommentForm id={id} />
      </Suspense>
      <div style={{
        transition: 'all 0.3s',
      }}>
        <Suspense fallback={<CommentListSkeleton />}>
          <CommentList id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default CommentArea;
