import ArticleView from '@/components/article/ArticleView';

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

export default async function BlogPost({ params }) {
  // 直接使用 await 来确保 params 被正确解析
  const { slug } = await params; // 确保 params 被解析

  // 获取单篇文章的详细内容
  const res = await fetch(`${API_URL}/${slug}`);
  const post = await res.json();
  console.log('==========');
  console.log(post.data);


  return (
    <div className="article-container">
      <ArticleView post={post} />
    </div>
  );
}
