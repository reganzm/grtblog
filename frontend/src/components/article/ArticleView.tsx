import React from 'react';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import InlineCodeBlock from '@/components/InlineCodeBlock';
import CodeBlock from '@/components/CodeBlock';
import { clsx } from 'clsx';
import styles from '@/styles/PostPage.module.scss';
import ReactMarkdown from 'react-markdown';
import ArticleInlineLink from '@/components/article/ArticleInlineLink';
import ImageView from '@/components/article/ImageView';
import TableView from '@/components/article/TableView';
import Toc from '@/components/article/Toc';
import { article_font } from '@/app/fonts/font';
import ArticleMetadata from '@/components/article/ArticleMetaData';
import FloatingTocMobile from '@/components/article/FloatingTocMobile';

type Post = {
  id: string;
  title: string;
  content: string;
  summary: string;
  toc: string;
  authorName: string;
  cover: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
};

const ArticleView = ({ post }: { post: Post }) => {
  const readingTime = Math.ceil(post.content.length / 500);
  console.log('post', post);

  return (
    <div className={clsx(styles.article, article_font.className)}>
      {post.toc && <FloatingTocMobile toc={JSON.parse(post.toc)} />}
      <div className={styles.articleContainer}>
        <aside className={styles.tocContainer}>
          {post.toc && <Toc toc={JSON.parse(post.toc)} />}
        </aside>
        <main className={styles.articleContent}>
          <h1 className={styles.title}>{post.title}</h1>
          <ArticleMetadata
            authorName={post.authorName}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            views={post.views}
            readingTime={readingTime}
          />
          <ReactMarkdown
            className={styles.markdown}
            rehypePlugins={[rehypeSanitize]}
            remarkPlugins={[remarkGfm, remarkBreaks]}
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
                return <ImageView {...props} />;
              },
              a({ ...props }) {
                return (
                  <ArticleInlineLink
                    className={clsx(styles.underlineAnimation, styles.glowAnimation)}
                    {...props}
                    linkTitle={props.children}
                    linkUrl={props.href}
                  />
                );
              },
              p({ ...props }) {
                return <p className={styles.paragraph} {...props} />;
              },
              table({ ...props }) {
                return <TableView {...props} />;
              },
              h1({ node, ...props }) {
                return <h1 id={node.position?.start.line.toString()} className={styles.heading1} {...props} />;
              },
              h2({ node, ...props }) {
                return <h2 id={node.position?.start.line.toString()} className={styles.heading2} {...props} />;
              },
              h3({ node, ...props }) {
                return <h3 id={node.position?.start.line.toString()} className={styles.heading3} {...props} />;
              },
              strong({ ...props }) {
                return <strong className={styles.bold} {...props} />;
              },
              em({ ...props }) {
                return <em className={styles.italic} {...props} />;
              },
              blockquote({ ...props }) {
                return <blockquote className={styles.blockquote} {...props} />;
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </main>
      </div>
    </div>
  );
};

export default ArticleView;
