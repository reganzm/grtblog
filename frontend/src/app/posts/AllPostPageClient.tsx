'use client';

import React, {useState, useEffect, useRef} from 'react';
import {getAllArticlesByPage, getArticleByCategory} from '@/api/article';
import {getArticlesByTag} from "@/api/tag";
import ArticlePageItem, {ArticlePreview} from '@/components/article/ArticlePageItem';
import {motion} from 'framer-motion';
import ArticlePageItemSkeleton from "@/app/posts/ArticlePostItemSkeleton";
import FloatingMenu from "@/components/menu/FloatingMenu";

const AllPostPageClient = ({initialArticles, category, tag}: {
    category?: string,
    tag?: string,
    initialArticles: ArticlePreview[]
}) => {
    const [articles, setArticles] = useState<ArticlePreview[]>(initialArticles);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialArticles.length > 0);
    const observer = useRef<IntersectionObserver>(null);
    const [isSummaryShow, setIsSummaryShow] = useState(true);

    const lastArticleElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setLoading(true);
                if (category != null) {
                    getArticleByCategory(category, page + 1, 10, {next: {revalidate: 60}})
                        .then(newArticles => {
                            setArticles(prevArticles => [...prevArticles, ...newArticles]);
                            setPage(prevPage => prevPage + 1);
                            setHasMore(newArticles.length > 0);
                            setLoading(false);
                        });
                } else if (tag != null) {
                    getArticlesByTag(tag, page + 1, 10, {next: {revalidate: 60}})
                        .then(newArticles => {
                            setArticles(prevArticles => [...prevArticles, ...newArticles]);
                            setPage(prevPage => prevPage + 1);
                            setHasMore(newArticles.length > 0);
                            setLoading(false);
                        });
                } else {
                    getAllArticlesByPage(page + 1, 10, {next: {revalidate: 60}})
                        .then(newArticles => {
                            setArticles(prevArticles => [...prevArticles, ...newArticles]);
                            setPage(prevPage => prevPage + 1);
                            setHasMore(newArticles.length > 0);
                            setLoading(false);
                        });
                }
            }
        });

        if (lastArticleElementRef.current) {
            observer.current.observe(lastArticleElementRef.current);
        }
    }, [loading, hasMore, page, category, tag]);

    return (
        <>
            {articles.map((item, index) => {
                const delay = index % 10 * 0.15;
                if (articles.length === index + 1) {
                    return (
                        <motion.div
                            ref={lastArticleElementRef}
                            key={item.shortUrl}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{type: 'spring', stiffness: 500, damping: 100, delay, bounce: 0.7, mass: 0.5}}
                        >
                            <ArticlePageItem post={item} isSummaryShow={isSummaryShow}/>
                        </motion.div>
                    );
                } else {
                    return (
                        <motion.div
                            key={item.shortUrl}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{type: 'spring', stiffness: 100, damping: 10, delay, bounce: 0.3}}
                        >
                            <ArticlePageItem post={item} isSummaryShow={isSummaryShow}/>
                        </motion.div>
                    );
                }
            })}
            {loading && (
                <ArticlePageItemSkeleton/>
            )}
            {!hasMore && (
                <div className="text-center text-gray-500 text-sm mt-2"> 没有更多啦，不小心让你翻到底了欸 〃•ω‹〃</div>
            )}
            <FloatingMenu items={[
                // {
                //     type: 'button',
                //     icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                //                xmlns="http://www.w3.org/2000/svg">
                //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                //               d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                //     </svg>,
                //     label: '回到顶部',
                //     onClick: () => {
                //         window.scrollTo({top: 0, behavior: 'smooth'});
                //     }
                // },
                {
                    type: 'switch',
                    value: isSummaryShow,
                    label: '显示摘要',
                    icon: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                               xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M5 13l4 4L19 7"/>
                    </svg>,
                    onClick: (e) => {
                        setIsSummaryShow(e ?? false);
                    }
                }
            ]}/>
        </>
    );
};

export default AllPostPageClient;
