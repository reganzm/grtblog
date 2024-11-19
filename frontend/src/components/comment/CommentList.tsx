"use client";

import React, {useState, useEffect, useRef} from 'react';
import {getComments} from '@/api/comment';
import CommentListItem from './CommentListItem';
import styles from '@/styles/comment/CommentList.module.scss';
import {Comment} from '@/types';
import {Skeleton, Text} from '@radix-ui/themes';
import emitter from "@/utils/eventBus";

const CommentList = ({id, subComments, isModal}: { id?: string, subComments?: Comment[], isModal?: boolean }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [addTrigger, setAddTrigger] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver>(null);
    const lastCommentElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            if (id) {
                const newComments = await getComments(id, page, 10);
                setComments(prevComments => [...prevComments, ...newComments]);
                setHasMore(newComments.length > 0);
                setLoading(false);
            } else {
                if (subComments) setComments(subComments);
                setLoading(false);
            }
        };

        fetchComments();
    }, [id, page, subComments, addTrigger]);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (lastCommentElementRef.current) {
            observer.current.observe(lastCommentElementRef.current);
        }
    }, [loading, hasMore]);

    useEffect(() => {
        const handleRefreshCommentList = () => {
            setComments([]);
            setPage(1);
            setAddTrigger(prev => !prev);
        };

        emitter.on('refreshCommentList', handleRefreshCommentList);

        return () => {
            emitter.off('refreshCommentList', handleRefreshCommentList);
        };
    }, []);

    return (
        <div className={styles.commentListContainer} style={{
            marginLeft: id ? '0' : '3rem',
        }}>
            {comments.map((comment, index) => {
                if (comments.length === index + 1) {
                    return (
                        <div ref={lastCommentElementRef} key={isModal ? "Modal" + comment.id : comment.id}>
                            <CommentListItem comment={comment}/>
                        </div>
                    );
                } else {
                    return <CommentListItem key={isModal ? "Modal" + comment.id : comment.id} comment={comment}/>;
                }
            })}
            {loading && (
                <Skeleton>
                    <Text className="text-xl font-bold transition">Loading comments...</Text>
                </Skeleton>
            )}
            {!hasMore && (
                <div className="text-center text-gray-500 text-sm mt-4 mb-4"> 没有更多啦，不小心让你翻到底了欸
                    〃•ω‹〃</div>
            )}
        </div>
    );
};

export default CommentList;
