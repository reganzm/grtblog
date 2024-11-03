'use client';

import React, { useEffect, useState } from 'react';

const CommentList = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    // Fetch comments for the given post id
    const fetchComments = async () => {
      // Replace with actual API call
      const fetchedComments = await new Promise<string[]>((resolve) =>
        setTimeout(() => resolve(['Comment 1', 'Comment 2']), 1000),
      );
      setComments(fetchedComments);
    };

    fetchComments();
  }, [id]);

  return (
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>{comment}</li>
      ))}
    </ul>
  );
};

export default CommentList;
