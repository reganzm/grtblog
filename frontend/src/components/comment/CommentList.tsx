'use client';

import React, { useEffect, useState } from 'react';
import { getComments } from '@/api/comment';

type Comment = {
  id: string
  articleId: string,
  avatarUrl: string,
  children: Comment[],
  content: string,
  createdAt: string,
  location: string,
  parentId: string,
  updatedAt: string,
  userName: string,
  website: string,
}

const CommentList = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getComments(id).then((res) => {
      console.log(res);
      setComments(res);
    });
  }, [id]);

  return (
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>
          <div> 用户名 {comment.userName}</div>
          <span>ip 属地 {comment.location}</span>
          <div> 评论时间 {comment.createdAt}</div>
          <div> 评论内容 {comment.content}</div>
          <CommentList id={comment.id} />
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
