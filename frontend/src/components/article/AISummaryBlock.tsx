"use client"

import type React from "react"
import {useState, useRef, useEffect} from "react"
import ReactMarkdown from "react-markdown"
import {Sparkles, ChevronDown, ChevronUp} from "lucide-react"
import styles from "@/styles/PostPage.module.scss"
import rehypeCallouts from "rehype-callouts"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import InlineCodeBlock from "@/components/InlineCodeBlock"
import CodeBlock from "@/components/CodeBlock"
import {clsx} from "clsx"
import TableView from "@/components/article/TableView"
import Link from "next/link"
import rehypeRaw from "rehype-raw";

interface AiSummaryBlockProps {
    aiSummary: string
}

const AiSummaryBlock: React.FC<AiSummaryBlockProps> = ({aiSummary}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const [showGradient, setShowGradient] = useState(true)

    useEffect(() => {
        if (contentRef.current) {
            setShowGradient(contentRef.current.scrollHeight > 100)
        }
    }, [contentRef])

    if (!aiSummary) {
        return null
    }

    return (
        <div
            className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2"/>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex-grow">AI Summary</h2>
                <span className="opacity-55">Powered By DeepSeek-R1</span>
            </div>
            <div className="relative text-sm">
                <div
                    ref={contentRef}
                    className={`prose dark:prose-invert max-w-none overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? "max-h-[1000px]" : "max-h-[100px]"
                    }`}
                >
                    <ReactMarkdown
                        className={styles.markdown}
                        rehypePlugins={[rehypeCallouts, rehypeRaw]}
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        components={{
                            code({inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || "")
                                if (!match) {
                                    return <InlineCodeBlock {...props}>{children}</InlineCodeBlock>
                                }
                                return inline ? (
                                    <InlineCodeBlock {...props}>{children}</InlineCodeBlock>
                                ) : (
                                    <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")}/>
                                )
                            },
                            a({...props}) {
                                return (
                                    <Link
                                        style={{color: "#718dff"}}
                                        className={clsx(styles.underlineAnimation, styles.glowAnimation, "ml-0.5 mr-0.5")}
                                        {...props}
                                    />
                                )
                            },
                            p({...props}) {
                                return <p className={styles.paragraph} {...props} />
                            },
                            table({...props}) {
                                return <TableView {...props} />
                            },
                            strong({...props}) {
                                return <strong className={styles.bold} {...props} />
                            },
                            em({...props}) {
                                return <em className={styles.italic} {...props} />
                            },
                            blockquote({...props}) {
                                return <blockquote className={styles.blockquote} {...props} />
                            },
                            h1({...props}) {
                                return <h1 className={styles.heading1} {...props} />;
                            },
                            h2({...props}) {
                                return <h2 className={styles.heading2} {...props} />;
                            },
                            h3({...props}) {
                                return <h3 className={styles.heading3} {...props} />;
                            },
                            h4({...props}) {
                                return <h2 className={styles.heading4} {...props} />;
                            },
                        }}
                    >
                        {aiSummary}
                    </ReactMarkdown>
                </div>
                {!isExpanded && showGradient && (
                    <div
                        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-100 to-transparent dark:from-purple-900"/>
                )}
            </div>
            {showGradient && (
                <button
                    className="mt-2 flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors duration-200"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? (
                        <>
                            <ChevronUp className="w-4 h-4 mr-1"/>
                            Show Less
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4 mr-1"/>
                            Show More
                        </>
                    )}
                </button>
            )}
        </div>
    )
}

export default AiSummaryBlock

