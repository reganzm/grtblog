"use client";

import * as React from "react"
import {Text, ScrollArea} from "@radix-ui/themes"
import {Command} from "cmdk"
import {useRouter} from "next/navigation"

interface SearchResult {
    id: string | null
    title: string
    summary: string
    highlightedContent: string
    shortUrl: string
}

interface SearchResultsProps {
    results: {
        pages: SearchResult[]
        articles: SearchResult[]
        moments: SearchResult[]
    }
}

function ResultItem({result, onClick}: { result: SearchResult; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="flex flex-col gap-1 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
        >
            <Text size="2" weight="bold">
                {result.title}
            </Text>
            <Text size="1" color="gray">
                <span
                    dangerouslySetInnerHTML={{__html: result.highlightedContent.replace(/<em>/g, "<strong style='color: red'>").replace(/<\/em>/g, "</strong>")}}/>
            </Text>
        </div>
    )
}

export function SearchResults({results}: SearchResultsProps) {
    const router = useRouter()

    const handleItemClick = (type: string, shortUrl: string) => {
        if (type === "page") {
            router.push(`${shortUrl}`)
        } else if (type === "article") {
            router.push(`/posts/${shortUrl}`)
        } else if (type === "moment") {
            router.push(`/moments/${shortUrl}`)
        }
    }

    return (
        <ScrollArea style={{height: "100%", padding: "8px"}}>
            <Command.List className="px-4">
                {results.pages.length > 0 && (
                    <div>
                        <span className="text-sm"> 页面 </span>
                        {results.pages.map((page) => (
                            <ResultItem key={page.shortUrl} result={page}
                                        onClick={() => handleItemClick("page", page.shortUrl)}/>
                        ))}
                    </div>
                )}
                {results.articles.length > 0 && (
                    <div>
                        <span className="text-sm"> 文章 </span>
                        {results.articles.map((article) => (
                            <ResultItem key={article.shortUrl} result={article}
                                        onClick={() => handleItemClick("article", article.shortUrl)}/>
                        ))}
                    </div>
                )}
                {results.moments.length > 0 && (
                    <div>
                        <span className="text-sm"> 随手记录 </span>
                        {results.moments.map((moment) => (
                            <ResultItem key={moment.shortUrl} result={moment}
                                        onClick={() => handleItemClick("moment", moment.shortUrl)}/>
                        ))}
                    </div>
                )}
                {results.pages.length === 0 && results.articles.length === 0 && results.moments.length === 0 && (
                    <div>
                        <span className="text-sm"> 没有找到相关结果 </span>
                    </div>
                )}
            </Command.List>
        </ScrollArea>
    )
}
