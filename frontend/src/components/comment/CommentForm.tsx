"use client";

import React, { useState } from 'react';

const CommentForm = ({ id }: { id: string }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission logic here
    console.log(`Submitting comment for post ${id}: ${comment}`);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
