import {notFound} from 'next/navigation';
import MomentReadingPage from "@/components/moment/MomentReading";
import CommentArea from "@/components/comment/CommentArea";

// 定义 API 请求的 URL
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Params {
    slug: string;
}

// 生成静态参数
export async function generateStaticParams() {
    // 从 Spring Boot 后端获取所有 moment 的 slug
    const res = await fetch(API_URL + '/statusUpdate/shortLinks');
    const moments = await res.json();

    // 返回所有 moment 的 slug，以便 Next.js 生成静态页面
    return moments.data.map((moment: string) => ({
        slug: moment,
    }));
}

interface MomentPageProps {
    params: Promise<Params>;
}

// 定义 Page 组件
export default async function Page({params}: MomentPageProps) {
    // 确保 params 被正确解析
    const {slug} = await params;

    // 获取单个 moment 的详细内容
    const res = await fetch(`${API_URL}/statusUpdate/${slug}`, {
        next: {revalidate: 60},
    });
    const moment = await res.json();
    console.log(moment);
    if (moment.code !== 0) {
        notFound();
    }
    return (
        <div className="moment-container">
            <MomentReadingPage moment={moment.data}/>
            <CommentArea id={moment.data.commentId}/>
        </div>
    );
}
