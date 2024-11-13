import React from 'react';
import { getComments } from '@/api/comment';
import CommentListItem from './CommentListItem';
import styles from '@/styles/comment/CommentList.module.scss';
import { Comment } from '@/types';

const CommentList = async ({ id }: { id: string }) => {
  const comments: Comment[] = await getComments(id);
  return (
    <ul className={styles.commentList}>
      {comments.map((comment) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentList;
