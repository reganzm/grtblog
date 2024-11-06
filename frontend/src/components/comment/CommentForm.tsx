'use client';

import React, { useRef, useState } from 'react';
import { addNewComment } from '@/api/comment';
import { Button, Flex, TextArea, TextField } from '@radix-ui/themes';
import styles from '@/styles/comment/CommentForm.module.scss';
import { clsx } from 'clsx';
import { EnvelopeOpenIcon } from '@radix-ui/react-icons';

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
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 20}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <Flex direction="row" gap="4">
        <TextField.Root
          value={form.userName}
          required={true}
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
          placeholder="昵称"
        />
        <TextField.Root
          value={form.email}
          required={true}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="邮箱"
        />
        <TextField.Root
          value={form.website}
          required={true}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          placeholder="网站"
        />
      </Flex>
      <div style={{ width: '70%' }}
           className="relative overflow-hidden">
        <TextArea
          color={'blue'}
          required={true}
          variant={'soft'}
          ref={textareaRef}
          style={{
            resize: 'none',
            minHeight: '7rem',
            outline: 'none',
            padding: '10px',
            lineHeight: '1.5',
          }}
          className="min-h-14 p-2 transition-all duration-300"
          value={form.content}
          onChange={(e) => {
            if (e.target.value.length <= 3000) {
              setForm({ ...form, content: e.target.value });
            }
          }}
          onInput={handleInput}
          onMouseDown={handleRipple}
          placeholder="看到你的评论我会很开心哒~"
        />
        <span style={{
          position: 'absolute',
          left: '10px',
          bottom: '10px',
          fontSize: '0.8rem',
          color: 'gray',
        }}> 支持 Markdown 语法 </span>
        <span style={{
          position: 'absolute',
          right: '10px',
          bottom: '10px',
          fontSize: '0.8rem',
          color: 'gray',
        }}> {form.content.length} / 3000 </span>
        <span style={{
          position: 'absolute',
          left: '12em',
          bottom: '10px',
          fontSize: '0.8rem',
          color: 'gray',
        }}> 表情面板 </span>
        <span
          ref={rippleRef}
          className={clsx('absolute rounded-full bg-gray-400 opacity-30 pointer-events-none', styles.ripple)}
        />
      </div>
      <Button type="submit"><EnvelopeOpenIcon /> 发送 ~~ </Button>
    </form>
  );
};

export default CommentForm;
