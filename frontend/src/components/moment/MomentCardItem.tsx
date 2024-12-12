import React from 'react';
import {Avatar, Button} from '@radix-ui/themes';
import Image from 'next/image';
import {ArrowRight, Eye, Heart, MessageCircle, Share2} from 'lucide-react';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {Moment} from '@/types';
import {formatDistanceToNow, parseISO} from 'date-fns';
import {zhCN} from 'date-fns/locale';
import {PinTopIcon} from '@radix-ui/react-icons';
import {clsx} from 'clsx';
import {article_font} from '@/app/fonts/font';
import CommentModal from "@/components/comment/CommentModal";

const MomentCardItem = ({moment, index}: { moment: Moment, index: number }) => {
    const formattedCreatedDate = formatDistanceToNow(parseISO(moment.createdAt), {addSuffix: true, locale: zhCN});
    const [isCommentModalOpen, setIsCommentModalOpen] = React.useState(false);

    const onClose = () => {
        setIsCommentModalOpen(false);
    }
    return (
        <div>
            <CommentModal isOpen={isCommentModalOpen} onClose={onClose} commentId={moment.commentId}/>
            <motion.div
                key={moment.shortUrl}
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: index * 0.1}}
            >
                <div className={clsx(article_font.className, 'mb-8 flex justify-between items-center w-full')}>
                    <div className="w-full z-10 bg-white dark:bg-gray-900 p-8" style={{
                        borderRadius: '0.5rem',
                        border: 'rgba(var(--foreground), 0.1) 1px solid',
                    }}>
                        <div className="flex flex-row items-center gap-4">
                            <Avatar src={moment.authorAvatar} alt={moment.authorName}
                                    fallback={moment.authorName[0]}
                                    radius={"full"}
                            />
                            <div className="flex-grow">
                                <div className="text-lg">{moment.authorName}</div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{formattedCreatedDate}</p>
                            </div>
                            <div className="flex gap-2">
                                {moment.isTop && <PinTopIcon className="text-primary"/>}
                                {moment.isHot &&
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded"> HOT </span>}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mt-6 mb-2">{moment.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{moment.summary}</p>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {moment.images.slice(0, 2).map((image, imgIndex) => (
                                    <div key={imgIndex} className="relative aspect-video">
                                        <Image
                                            src={image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_BASE_URL}/${image.slice(1)}`}
                                            alt={`Image ${imgIndex + 1} for ${moment.title}`}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4 text-gray-500 dark:text-gray-400">
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1 mr-4">
                                        <Eye size={16}/> {moment.views}</span>
                                    <span className="flex items-center gap-1 mr-4">
                                        <Heart size={16}/> {moment.likes}</span>
                                    <span className="flex items-center gap-1 mr-4 cursor-pointer"
                                          onClick={() => setIsCommentModalOpen(true)}>
                                        <MessageCircle size={16}/> {moment.comments}</span>
                                    <span className="flex items-center gap-1"><Share2 size={16}/></span>
                                </div>
                                <Link href={`/moments/${moment.shortUrl}`} passHref>
                                    <Button variant="ghost" size="3" className="text-primary">
                                        查看详情 <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2"/>
                </div>
            </motion.div>
        </div>
    );
};

export default MomentCardItem;
