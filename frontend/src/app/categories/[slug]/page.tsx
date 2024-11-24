import React from 'react';
import {ArticlePreview} from '@/components/article/ArticlePageItem';
import {getArticleByCategory} from '@/api/article';
import {noto_sans_sc} from '@/app/fonts/font';
import AllPostPageClient from '@/app/posts/AllPostPageClient';
import {getAllCategories} from '@/api/category';
import {notFound} from 'next/navigation';

const pageSize = 10;

interface CategoryVO {
    id: number;
    name: string;
    shortUrl: string;
}

export async function generateStaticParams() {
    const categories: CategoryVO[] = await getAllCategories({next: {revalidate: 60}});

    return categories.map(category => ({
        slug: category.shortUrl, // 这是路由匹配的关键参数
        name: category.name,     // 包含页面所需的额外数据
    }));
}

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({params}: CategoryPageProps) {
    const {slug} = await params;
    const category: CategoryVO = (await getAllCategories({next: {revalidate: 60}})).find((c: CategoryVO) => c.shortUrl === slug);

    return {
        title: ` 分类 - ${category.name}`,
        description: ` 分类 - ${category.name}`,
    };
}

const CategoryPage = async ({params}: CategoryPageProps) => {
    const {slug} = await params;

    // 使用 slug 加载分类名称
    const categories = await getAllCategories({next: {revalidate: 60}});
    const category: CategoryVO = categories.find((c: { shortUrl: string; }) => c.shortUrl === slug);

    if (!category) {
        notFound();
    }

    const initialArticles: ArticlePreview[] = await getArticleByCategory(slug, 1, pageSize, {next: {revalidate: 60}});

    return (
        <div style={{maxWidth: '850px', margin: '0 auto', padding: '2em'}}>
            <h1 style={{fontSize: '2em', fontWeight: 'bolder', marginBottom: '1em'}} className={noto_sans_sc.className}>
                分类 - {category.name}
            </h1>
            <AllPostPageClient initialArticles={initialArticles} category={slug}/>
        </div>
    );
};

export default CategoryPage;
