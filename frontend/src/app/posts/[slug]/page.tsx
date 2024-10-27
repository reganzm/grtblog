import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import styles from '@/styles/PostPage.module.scss';
import { clsx } from 'clsx';
import CodeBlock from '@/components/CodeBlock';

// 定义 API 请求的 URL
const API_URL = 'http://127.0.0.1:8080/api/v1/article';

export async function generateStaticParams() {
  // 向 Spring Boot 后端获取所有文章的 slug
  const res = await fetch(API_URL + '/ids');
  const posts = await res.json(); // 假设返回的数据是一个包含文章列表的 JSON 数组

  // 返回所有文章的 slug，以便 Next.js 生成静态页面
  return posts.data.map((post) => ({
    slug: post.slug,
  }));
}

const ImageComponent = ({ src, alt }) => {
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

export default async function BlogPost({ params }) {
  // 直接使用 await 来确保 params 被正确解析
  const { slug } = await params; // 确保 params 被解析

  // 获取单篇文章的详细内容
  const res = await fetch(`${API_URL}/${slug}`);
  const post = await res.json();
  console.log('==========');
  console.log(post.data);


  return (
    <div>
      3456345
      <h1>{post.data.title}</h1>
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (!match) {
              return <code
                style={{
                  border: '1px solid',
                }}
                {...props}>{children}</code>;
            }
            return inline ? (
              <code {...props}>{children}</code>
            ) : (
              <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />
            );
          },
          img({ node, ...props }) {
            // 使用 Next.js Image 组件替换 img
            return <ImageComponent {...props} />;
          },
          a({ node, ...props }) {
            return <a {...props} className={clsx(styles.glowAnimation, styles.underlineAnimation)}
                      target="_blank" rel="noopener noreferrer" />;
          },
          p({ node, ...props }) {
            return <p className={'m-4'} {...props} />;
          },
        }}
      >
        {post.data.content}
      </ReactMarkdown>
    </div>
  );
}
