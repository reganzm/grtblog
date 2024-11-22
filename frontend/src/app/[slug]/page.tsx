import React from 'react';
import {notFound} from "next/navigation";

// 定义 API 请求的 URL
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Params {
    slug: string;
}

export async function generateStaticParams() {
    const res = await fetch(API_URL + '/page/shortLinks');
    const pageUrls = await res.json();

    // 返回所有页面的 slug，以便 Next.js 生成静态页面
    return pageUrls.data.map((pageUrl: string) => ({
        slug: pageUrl,
    }));
}

interface PageProps {
    params: Promise<Params>;
}

export default async function Page({params}: PageProps) {
    const {slug} = await params;
    const res = await fetch(`${API_URL}/page/${slug}`, {
        next: {revalidate: 60},
    });
    const page = await res.json();
    console.log(page)
    if (page.code !== 0) {
        notFound();
    }
    return (
        <div className="page-container">
            795349853485
            {/*<MomentReadingPage moment={moment.data}/>*/}
            {/*<CommentArea id={moment.data.commentId}/>*/}
        </div>
    );
}
