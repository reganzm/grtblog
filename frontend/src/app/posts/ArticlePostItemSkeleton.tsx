import {HashtagIcon, TagIcon} from "@heroicons/react/24/outline"
import {Skeleton} from "@radix-ui/themes"
import {Calendar, Eye, ThumbsUp} from "lucide-react"
import {AiOutlineComment} from "react-icons/ai"

const ArticlePageItemSkeleton = () => {
    return (
        <div className="w-full m-auto p-4">
            <div className="space-y-2">
                <Skeleton className="h-6 w-3/4"/>
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-5/6"/>

                <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center">
                        <HashtagIcon width={12} height={12} className="mr-1"/>
                        <Skeleton className="h-4 w-20"/>
                    </div>
                    <div className="flex items-center">
                        <Calendar width={12} height={12} className="mr-1"/>
                        <Skeleton className="h-4 w-24"/>
                    </div>
                    <div className="flex items-center">
                        <TagIcon width={12} height={12} className="mr-1"/>
                        <Skeleton className="h-4 w-16"/>
                    </div>
                    <div className="flex items-center">
                        <Eye width={12} height={12} className="mr-1"/>
                        <Skeleton className="h-4 w-8"/>
                    </div>
                    <div className="flex items-center">
                        <AiOutlineComment width={12} height={12} className="mr-1"/>
                        <Skeleton className="h-4 w-8"/>
                    </div>
                    <div className="flex items-center">
                        <ThumbsUp width={12} height={12} className="mr-1"/>
                        <Skeleton className="h-4 w-8"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticlePageItemSkeleton

