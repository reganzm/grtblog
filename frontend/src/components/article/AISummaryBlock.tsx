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
import rehypeRaw from "rehype-raw"

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
    }, [contentRef.current]) // Updated dependency

    if (!aiSummary) {
        return null
    }

    return (
        <div
            className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 rounded-lg p-4 mb-8 bg-opacity-70 dark:bg-opacity-30" style={{
                border: '1px solid rgba(var(--foreground), 0.1)',
        }}>
            <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2"/>
                <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 flex-grow">AI Summary</h2>
                <div className="opacity-55 text-[0.75em] self-end sm:self-center">Powered By DeepSeek-R1</div>
            </div>
            <div className="relative text-sm">
                <div
                    ref={contentRef}
                    className={clsx(
                        "prose dark:prose-invert max-w-none overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded ? "max-h-[1000px]" : "max-h-[100px]",
                        !isExpanded && showGradient && "mask-image-fade",
                    )}
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
                                return <h1 className={styles.heading1} {...props} />
                            },
                            h2({...props}) {
                                return <h2 className={styles.heading2} {...props} />
                            },
                            h3({...props}) {
                                return <h3 className={styles.heading3} {...props} />
                            },
                            h4({...props}) {
                                return <h2 className={styles.heading4} {...props} />
                            },
                        }}
                    >
                        {aiSummary}
                    </ReactMarkdown>
                </div>
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

