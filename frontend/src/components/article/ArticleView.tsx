import React from 'react';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import InlineCodeBlock from '@/components/InlineCodeBlock';
import CodeBlock from '@/components/CodeBlock';
import { clsx } from 'clsx';
import styles from '@/styles/PostPage.module.scss';
import ReactMarkdown from 'react-markdown';
import ArticleInlineLink from '@/components/article/ArticleInlineLink';
import ImageView from '@/components/article/ImageView';
import TableView from '@/components/article/TableView';

type Post = {
  data: {
    content: string;
  };
};

const ArticleView = ({ post }: { post: Post }) => {
  return (
    <div>
      <ReactMarkdown
        className={styles.markdown}
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
          img({ ...props }) {
            // 使用 ImageView 组件替换 img 标签，并包裹在 div 中
            return (
              <ImageView {...props} />
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
        {post.data.content}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleView;
