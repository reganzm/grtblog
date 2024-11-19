import React from 'react';
import CommentForm from '@/components/comment/CommentForm';
import CommentList from '@/components/comment/CommentList';
import {ScrollArea} from "@radix-ui/themes";

// 这里遇到问题了，Suspense 包裹的是服务端组件，也就是需要服务端组件包裹来占位
const CommentArea = ({id}: { id: string }) => {
    return (
        <div>
            <span className={"text-sm opacity-10"}> 评论区 id {id}</span>
            <h2 className="text-2xl font-bold"> 发表评论 </h2>
            <CommentForm id={id}/>
            <ScrollArea style={{
                transition: 'all 0.3s',
            }}>
                <CommentList id={id}/>
            </ScrollArea>
        </div>
    );
};

export default CommentArea;
