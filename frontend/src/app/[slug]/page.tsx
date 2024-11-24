import React from 'react';
import {notFound} from "next/navigation";
import PageView from "@/app/[slug]/PageView";
import CommentArea from "@/components/comment/CommentArea";
import {clsx} from "clsx";
import {noto_sans_sc_bold, noto_serif_sc_bold} from "@/app/fonts/font";
import {Metadata} from "next";

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

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {slug} = await params;
    const res = await fetch(`${API_URL}/page/${slug}`, {
        next: {revalidate: 60},
    });
    const page = await res.json();
    if (page.code !== 0) {
        notFound();
    }
    return {
        title: page.data.title,
        description: page.data.description,
    };
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
            <h1 className={clsx(noto_sans_sc_bold.className, "text-2xl mt-8")}>{page.data.title}</h1>
            <h2 className={clsx(noto_serif_sc_bold.className, "mt-4")}>{page.data.description}</h2>
            <PageView page={page.data}/>
            <CommentArea id={page.data.commentId}/>
        </div>
    );
}
