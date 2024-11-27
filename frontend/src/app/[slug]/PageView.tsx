import React from 'react';
import ArticleTopPaddingAnimate from "@/components/article/ArticleTopPaddingAnimate";
import styles from "@/styles/PostPage.module.scss";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import InlineCodeBlock from "@/components/InlineCodeBlock";
import CodeBlock from "@/components/CodeBlock";
import ImageView from "@/components/article/ImageView";
import ArticleInlineLink from "@/components/article/ArticleInlineLink";
import {clsx} from "clsx";
import TableView from "@/components/article/TableView";
import ScrollHandler from "@/components/article/ScrollHandler";
import {article_font} from "@/app/fonts/font";
import FloatingTocMobile from "@/components/article/FloatingTocMobile";
import ReadingProgress from "@/components/article/ReadingProgress";
import Toc from "@/components/article/Toc";
import ArticleScrollSync from "@/components/article/ArticleScrollSync";
import {Calendar, Clock, Eye} from "lucide-react";

export type PageVO = {
    commentId: string,
    comments: number,
    content: string;
    createdAt: string;
    description: string;
    categoryName: string;
    likes: number,
    title: string,
    toc: string;
    updatedAt: string;
    views: number;
}

// 这里保证生成 id 按照顺序，匹配目录
const generateId = (index: number) => `article-md-title-${index + 1}`;

const PageView = ({page}: { page: PageVO }) => {
    const readingTime = Math.ceil(page.content.length / 500);
    let headingIndex = 0;

    return (
        <div className={clsx(styles.article, article_font.className)}>
            <ScrollHandler/>
            {page.toc && <FloatingTocMobile toc={JSON.parse(page.toc)}/>}
            <div className={styles.articleContainer}>
                <main className={styles.articleContent}>
                    <ArticleScrollSync post={page} type={"页面"}>
                        <div className="meta-data">
                            <div
                                className="flex flex-wrap items-center  gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2"/>
                                    <span>{new Date(page.createdAt).toLocaleDateString()}</span>
                                    {page.createdAt !== page.updatedAt && (
                                        <span
                                            className="ml-2 text-gray-700 dark:text-gray-300">（更新于 {new Date(page.updatedAt).toLocaleDateString()}）</span>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <Eye className="w-4 h-4 mr-2"/>
                                    <span>{page.views} views</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2"/>
                                    <span> 预计阅读时长 {readingTime} 分钟 </span>
                                </div>
                            </div>
                        </div>
                        <ArticleTopPaddingAnimate/>
                        <ScrollHandler/>
                        <ReactMarkdown
                            className={styles.markdown}
                            rehypePlugins={[rehypeSanitize]}
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                            components={{
                                code({inline, className, children, ...props}) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    if (!match) {
                                        return <InlineCodeBlock {...props}>{children}</InlineCodeBlock>;
                                    }
                                    return inline ? (
                                        <InlineCodeBlock {...props}>{children}</InlineCodeBlock>
                                    ) : (
                                        <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')}/>
                                    );
                                },
                                img({...props}) {
                                    return <ImageView {...props} />;
                                },
                                a({...props}) {
                                    return (
                                        <ArticleInlineLink
                                            className={clsx(styles.underlineAnimation, styles.glowAnimation)}
                                            {...props}
                                            linkTitle={props.children}
                                            linkUrl={props.href}
                                        />
                                    );
                                },
                                p({...props}) {
                                    return <p className={styles.paragraph} {...props} />;
                                },
                                table({...props}) {
                                    return <TableView {...props} />;
                                },
                                h1({...props}) {
                                    return <h1 id={generateId(headingIndex++)}
                                               className={styles.heading1} {...props} />;
                                },
                                h2({...props}) {
                                    return <h2 id={generateId(headingIndex++)}
                                               className={styles.heading2} {...props} />;
                                },
                                h3({...props}) {
                                    return <h3 id={generateId(headingIndex++)}
                                               className={styles.heading3} {...props} />;
                                },
                                strong({...props}) {
                                    return <strong className={styles.bold} {...props} />;
                                },
                                em({...props}) {
                                    return <em className={styles.italic} {...props} />;
                                },
                                blockquote({...props}) {
                                    return <blockquote className={styles.blockquote} {...props} />;
                                },
                            }}
                        >
                            {page.content}
                        </ReactMarkdown>
                    </ArticleScrollSync>
                </main>
                <aside className={styles.tocContainer}>
                    {page.toc && <Toc toc={JSON.parse(page.toc)} commentId={page.commentId}/>}
                </aside>
            </div>
        </div>
    );
};

export default PageView;
