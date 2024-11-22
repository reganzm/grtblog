import React from 'react';
import CommentForm from '@/components/comment/CommentForm';
import CommentList from '@/components/comment/CommentList';
import {Container, ScrollArea} from "@radix-ui/themes";

// 这里遇到问题了，Suspense 包裹的是服务端组件，也就是需要服务端组件包裹来占位
const CommentArea = ({id, isModal}: { id: string, isModal?: boolean }) => {
    return (
        <Container size={'3'}>
            <span className={"text-sm opacity-10"}> 评论区 id {id}</span>
            <h2 className="text-2xl font-bold"> 发表评论 </h2>
            <CommentForm id={id}/>
            <ScrollArea style={{
                transition: 'all 0.3s',
            }}>
                <CommentList id={id} isModal={isModal}/>
            </ScrollArea>
        </Container>
    );
};

export default CommentArea;
