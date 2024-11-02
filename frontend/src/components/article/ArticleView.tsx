import React from 'react';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import InlineCodeBlock from '@/components/InlineCodeBlock';
import CodeBlock from '@/components/CodeBlock';
import { clsx } from 'clsx';
import styles from '@/styles/PostPage.module.scss';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import ArticleInlineLink from '@/components/article/ArticleInlineLink';

const ImageComponent = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={500} // Replace with appropriate width
      height={300} // Replace with appropriate height
      priority // Optional: Prioritize loading this image
      style={{
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)', // Glowing effect
      }}
    />
  );
};

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
              return <InlineCodeBlock {...props} >{children}</InlineCodeBlock>;
            }
            return inline ? (
              <InlineCodeBlock {...props} >{children}</InlineCodeBlock>
            ) : (
              <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />
            );
          },
          img({ ...props }) {
            // 使用 Next.js Image 组件替换 img
            return <ImageComponent {...props} />;
          },
          a({ ...props }) {
            return <ArticleInlineLink className={clsx(styles.underlineAnimation, styles.glowAnimation)}
                                      {...props} linkTitle={props.children} linkUrl={props.href} />;
          },
          p({ ...props }) {
            return <p className={'mt-2 mb-2 line'} style={{ lineHeight: '1.5' }} {...props} />;
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
