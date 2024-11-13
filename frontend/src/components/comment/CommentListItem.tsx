'use client';

import React from 'react';
import { Comment } from '@/types';
import styles from '@/styles/comment/CommentList.module.scss';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import InlineCodeBlock from '@/components/InlineCodeBlock';
import CodeBlock from '@/components/CodeBlock';
import ArticleInlineLink from '@/components/article/ArticleInlineLink';
import { clsx } from 'clsx';
import TableView from '@/components/article/TableView';
import ReactMarkdown from 'react-markdown';
import { Avatar } from '@radix-ui/themes';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { GlobeIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

const CommentListItem = ({ comment }: { comment: Comment }) => {
  const formattedCreatedAt = formatDistanceToNow(parseISO(comment.createdAt), { addSuffix: true, locale: zhCN });

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className={styles.commentItem}>
        <div className={styles.commentHeader}>
          <Avatar src={comment.avatarUrl} alt={comment.userName}
                  fallback={comment.userName === '' ? '' : comment.userName[0]} className={styles.commentAvatar} />
          <div className={styles.commentUserName}> {comment.userName}</div>
          {comment.website && (
            <>
              {(() => {
                if (!comment.website.startsWith('http')) {
                  comment.website = `https://${comment.website}`;
                }
                return (
                  <a href={comment.website} target="_blank" rel="noopener noreferrer"
                     className={styles.commentWebsite}>
                    <GlobeIcon />
                  </a>
                );
              })()}
            </>
          )}
        </div>
        <div className={styles.commentMeta}>
          <div className={styles.commentTime}>{formattedCreatedAt}</div>
          <span className={styles.commentLocation}>{comment.location}</span>
        </div>
        <ReactMarkdown
          className={styles.commentContent}
          rehypePlugins={[rehypeSanitize]}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              if (!match) {
                return <InlineCodeBlock {...props}>{children}</InlineCodeBlock>;
              }
              return inline ? (
                <InlineCodeBlock {...props}>{children}</InlineCodeBlock>
              ) : (
                <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />
              );
            },
            a({ ...props }) {
              return <ArticleInlineLink className={clsx(styles.underlineAnimation, styles.glowAnimation)}
                                        {...props} linkTitle={props.children} linkUrl={props.href} />;
            },
            p({ ...props }) {
              return <p className={'mt-2 mb-2 line'} style={{ lineHeight: '1.5' }} {...props} />;
            },
            table({ ...props }) {
              return <TableView {...props} />;
            },
            h1({ ...props }) {
              return <h1 className={'mt-4 mb-4'} {...props} />;
            },
            h2({ ...props }) {
              return <h2 className={'mt-3 mb-3'} {...props} />;
            },
            h3({ ...props }) {
              return <h3 className={'mt-2 mb-2'} {...props} />;
            },
          }}
        >
          {comment.content}
        </ReactMarkdown>
        {/*{comment.children.length > 0 && <CommentList comments={comment.children} />}*/}
      </div>
    </motion.li>
  );
};

export default CommentListItem;
