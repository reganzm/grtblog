'use client';

import React, { useRef, useState } from 'react';
import { addNewComment } from '@/api/comment';
import { Button, Flex, TextArea, TextField } from '@radix-ui/themes';
import styles from '@/styles/comment/CommentForm.module.scss';
import { clsx } from 'clsx';

const CommentForm = ({ id }: { id: string }) => {
  const [form, setForm] = useState({
    content: '',
    userName: '',
    email: '',
    website: '',
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', form);
    addNewComment({
      articleId: id,
      content: form.content,
      userName: form.userName,
      email: form.email,
      website: form.website,
      parentId: '',
    }).then((res) => {
      if (res) {
        console.log('Comment submitted successfully!');
      }
    });
    setForm({ ...form, content: '' });
  };

  const handleRipple = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current && rippleRef.current) {
      const textarea = textareaRef.current;
      const ripple = rippleRef.current;
      const rect = textarea.getBoundingClientRect();

      const size = Math.max(textarea.clientWidth, textarea.clientHeight);
      ripple.style.width = ripple.style.height = `${size * 2}px`;
      ripple.style.left = `${e.clientX - rect.left - size}px`;
      ripple.style.top = `${e.clientY - rect.top - size}px`;

      ripple.classList.remove(styles.animateRipple);
      void ripple.offsetWidth; // 触发强制重绘，使得动画可以重新播放
      ripple.classList.add(styles.animateRipple);
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <Flex direction="row" gap="4">
        <TextField.Root
          style={{ padding: '10px' }}
          value={form.userName}
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
          placeholder="昵称"
        />
        <TextField.Root
          value={form.email}
          style={{ padding: '10px' }}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="邮箱"
        />
        <TextField.Root
          value={form.website}
          style={{ padding: '10px' }}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          placeholder="网站"
        />
      </Flex>
      <div style={{ width: '70%' }}
           className="relative overflow-hidden">
        <TextArea
          color={'blue'}
          variant={'soft'}
          ref={textareaRef}
          style={{
            resize: 'none',
            minHeight: '5rem',
            outline: 'none',
            padding: '10px',
            lineHeight: '1.5',
          }}
          className="min-h-14 p-2 transition-all duration-300"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          onInput={handleInput}
          onMouseDown={handleRipple}
          placeholder="看到你的评论我会很开心哒~"
        />
        <span
          ref={rippleRef}
          className={clsx('absolute rounded-full bg-gray-400 opacity-30 pointer-events-none', styles.ripple)}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CommentForm;
