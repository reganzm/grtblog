import type React from "react"
import {motion} from "framer-motion"
import {TagIcon, UserIcon, EyeIcon} from "lucide-react"
import Link from "next/link";
import {useTheme} from "next-themes";
import {clsx} from "clsx";
import {article_font} from "@/app/fonts/font";

interface RecommendationItem {
    id: string
    title: string
    authorName: string
    shortUrl: string
    tags: string
    views: number
    cover?: string | null
}

const RecommendationCard: React.FC<{ item: RecommendationItem }> = ({item}) => {
    const isDark = useTheme().resolvedTheme === "dark"
    return (
        <Link href={`/posts/${item.shortUrl}`} passHref style={{
            overflow: 'hidden',
        }}>
            <motion.div
                whileHover={{
                    y: -5,
                }}
            >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-all duration-300
            ease-in-out hover:shadow-xl" style={{
                    overflow: 'hidden',
                    background: `url(${item.cover})`,
                    objectFit: 'cover',
                }}>
                    <motion.div
                        whileHover={{
                            scale: 1.05,
                        }}
                    >
                        <div className="h-48 bg-gray-200 dark:bg-gray-700">
                            {item.cover ? (
                                <img src={item.cover} alt={item.title}
                                     style={{
                                         filter: 'none',
                                     }}
                                     className="object-cover"/>
                            ) : (
                                <div
                                    className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                                    还没有封面捏
                                </div>
                            )}
                        </div>
                    </motion.div>
                    <div className="p-6" style={{
                        background: isDark ? 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,1))' : 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,1))',
                        height: '8em',
                        backdropFilter: 'blur(80px)',
                    }}>
                        <h3 className={clsx(article_font.className, "text-xl font-semibold mb-2 text-gray-800 dark:text-white line-clamp-2")}>{item.title}</h3>
                        <div className="flex gap-4 items-center">
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <UserIcon className="w-4 h-4 mr-2"/>
                                <span className="text-sm">{item.authorName}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <TagIcon className="w-4 h-4 mr-2"/>
                                <span className="text-sm">{item.tags.split(",")[0]}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                <EyeIcon className="w-4 h-4 mr-2"/>
                                <span className="text-sm">{item.views} views</span>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </Link>
    )
}

export default RecommendationCard
