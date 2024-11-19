'use client'

import React from 'react'
import {motion} from 'framer-motion'
import {Clock, Eye, Heart, MessageSquare, Award, Zap, PenTool} from 'lucide-react'
import {Separator, Badge} from "@radix-ui/themes"
import ReactMarkdown from 'react-markdown'
import {clsx} from "clsx";
import {article_font, ma_shan_zheng, moment_font} from "@/app/fonts/font";
import styles from '@/styles/moment/MomentPage.module.scss'
import {useTheme} from "next-themes";

export interface MomentView {
    authorName: string;
    comments: number;
    content: string;
    createdAt: string;
    images: string[];
    isHot: boolean;
    isOriginal: boolean;
    isTop: boolean;
    likes: number;
    shortUrl: string;
    title: string;
    updatedAt: string;
    views: number;
}

function MomentReadingPage({moment}: { moment: MomentView }) {
    const isDark = useTheme().theme === 'dark';
    return (
        <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <div
                    className={clsx(styles.moment, {
                        [styles['moment-dark']]: isDark,
                    }, "max-w-3xl mx-auto bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden")}>
                    <article className="px-8 py-12 prose prose-slate dark:prose-invert max-w-none">
                        <h1 className={clsx(ma_shan_zheng.className, "text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100")}>{moment.title}</h1>

                        <div
                            className={clsx(article_font.className, "flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8")}>
                            {moment.authorName && (
                                <span className="flex items-center">
                <span>{moment.authorName}</span>
              </span>
                            )}
                            {moment.createdAt && (
                                <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" aria-hidden="true"/>
                <span>{new Date(moment.createdAt).toLocaleDateString()}</span>
              </span>
                            )}
                            {moment.views !== undefined && (
                                <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" aria-hidden="true"/>
                <span>{moment.views} views</span>
              </span>
                            )}
                            {moment.likes !== undefined && (
                                <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" aria-hidden="true"/>
                <span>{moment.likes} likes</span>
              </span>
                            )}
                            {moment.comments !== undefined && (
                                <span className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" aria-hidden="true"/>
                <span>{moment.comments} comments</span>
              </span>
                            )}
                        </div>

                        <div className={clsx(ma_shan_zheng.className, "flex flex-wrap gap-2 mb-6")}>
                            {moment.isHot && (
                                <Badge variant="soft" className="flex items-center gap-1">
                                    <Zap className="w-3 h-3"/>
                                    Hot
                                </Badge>
                            )}
                            {moment.isOriginal && (
                                <Badge variant="soft" className="flex items-center gap-1">
                                    <PenTool className="w-3 h-3"/>
                                    Original
                                </Badge>
                            )}
                            {moment.isTop && (
                                <Badge variant="soft" className="flex items-center gap-1">
                                    <Award className="w-3 h-3"/>
                                    Top
                                </Badge>
                            )}
                        </div>

                        <Separator className="my-6"/>

                        <div
                            className={clsx(moment_font.className, "space-y-6 text-gray-800 dark:text-gray-200 leading-relaxed")}>
                            <ReactMarkdown>{moment.content || ''}</ReactMarkdown>
                        </div>

                        {moment.images && moment.images.length > 0 && (
                            <div
                                className={clsx(ma_shan_zheng.className, "mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4")}>
                                {moment.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Image ${index + 1}`}
                                        className="rounded-lg shadow-md"
                                    />
                                ))}
                            </div>
                        )}

                        {moment.updatedAt && moment.updatedAt !== moment.createdAt && (
                            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                                上次更新于: {new Date(moment.updatedAt).toLocaleString()}
                            </div>
                        )}

                        {moment.shortUrl && (
                            <div className="mt-4 text-sm">
                                <a href={moment.shortUrl} className="text-blue-600 dark:text-blue-400 hover:underline">
                                    Short link
                                </a>
                            </div>
                        )}
                    </article>
                </div>
            </motion.div>
        </div>
    )
}

export default MomentReadingPage;
