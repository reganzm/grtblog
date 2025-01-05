'use client';

import React from 'react';
import {Comment} from '@/types';
import styles from '@/styles/comment/CommentList.module.scss';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import InlineCodeBlock from '@/components/InlineCodeBlock';
import CodeBlock from '@/components/CodeBlock';
import {clsx} from 'clsx';
import TableView from '@/components/article/TableView';
import ReactMarkdown from 'react-markdown';
import {Avatar, Button, Link, Tooltip} from '@radix-ui/themes';
import {formatDistanceToNow, parseISO} from 'date-fns';
import {zhCN} from 'date-fns/locale';
import {motion} from 'framer-motion';
import CommentForm from "@/components/comment/CommentForm";
import CommentList from "@/components/comment/CommentList";
import {article_font} from "@/app/fonts/font";
import {FaWindows, FaApple, FaLinux, FaAndroid} from 'react-icons/fa';
import {SiSafari, SiFirefox, SiGooglechrome, SiMicrosoftedge} from 'react-icons/si';
import {VscVerifiedFilled} from "react-icons/vsc";

const getPlatformIcon = (platform: string) => {
    if (platform.includes('Android')) return <FaAndroid size={'10'} style={{color: '#3DDC84'}}/>;
    if (platform.includes('Windows')) return <FaWindows size={'10'} style={{color: '#0078D7'}}/>;
    if (platform.includes('Mac')) return <FaApple size={'10'} style={{color: '#787878'}}/>;
    if (platform.includes('Linux')) return <FaLinux size={'10'} style={{color: 'rgba(207,144,2,0.9)'}}/>;
    return null;
};

const getBrowserIcon = (browser: string) => {
    if (browser.includes('Chrome')) return <SiGooglechrome size={'10'} style={{color: '#4285F4'}}/>;
    if (browser.includes('Firefox')) return <SiFirefox size={'10'} style={{color: '#FF7139'}}/>;
    if (browser.includes('Safari')) return <SiSafari size={'10'} style={{color: '#0078D7'}}/>;
    if (browser.includes('Edge')) return <SiMicrosoftedge size={'10'} style={{color: '#0078D7'}}/>;
    return null;
};

const CommentListItem = ({comment}: { comment: Comment }) => {
    const formattedCreatedAt = formatDistanceToNow(parseISO(comment.createdAt), {addSuffix: true, locale: zhCN});
    const [isReplying, setIsReplying] = React.useState(false);

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{type: 'spring', stiffness: 100}}
        >
            <div className={clsx(styles.commentItem, article_font.className)}>
                <div className={styles.commentHeader}>
                    <Avatar src={comment.avatarUrl} radius={"full"}
                            alt={comment.userName} width={12} height={12}
                            fallback={comment.userName === '' ? '' : comment.userName[0]}
                            className={styles.commentAvatar}/>
                    {comment.website ? (
                        <>
                            {(() => {
                                if (!comment.website.startsWith('http')) {
                                    comment.website = `https://${comment.website}`;
                                }
                                return (
                                    <a href={comment.website} target="_blank" rel="noopener noreferrer"
                                       className={styles.commentWebsite}>
                                        <div className={styles.commentUserName}> {comment.userName}</div>
                                    </a>
                                );
                            })()}
                        </>
                    ) : (
                        <div className={clsx(styles.commentUserName, "flex items-center")}>
                            <span className="mr-1">
                             {comment.userName}
                            </span>
                            {
                                comment.isOwner && (
                                    <Tooltip content="这个是本站的主人捏" side="top" align="center">
                                        <VscVerifiedFilled color={'blue'}/>
                                    </Tooltip>
                                )
                            }
                            {
                                comment.isFriend && (
                                    <Tooltip content="这位小伙伴是本站的友链捏" side="top" align="center">
                                        <VscVerifiedFilled color={'green'}/>
                                    </Tooltip>
                                )
                            }
                            {
                                comment.isAuthor && (
                                    <Tooltip content="本文作者呀" side="top" align="center">
                                        <VscVerifiedFilled color={'orange'}/>
                                    </Tooltip>
                                )
                            }
                        </div>
                    )}
                    <div className="gap-1 flex">
                        {comment.platform && getPlatformIcon(comment.platform)}
                        {comment.browser && getBrowserIcon(comment.browser)}
                    </div>
                    {
                        comment.parentId && (
                            <div className={styles.commentParent} style={{
                                paddingLeft: '0.3rem',
                                fontSize: '0.8rem',
                                color: 'rgba(var(--foreground), 0.7)',
                                lineHeight: '2rem',
                            }}>
                                <span> 回复 </span>
                                <span className={styles.commentParentName}>{comment.parentUserName}</span>
                            </div>
                        )
                    }
                </div>
                <div className={styles.commentMeta}>
                    <div className={styles.commentTime}>{formattedCreatedAt}</div>
                    <span className={styles.commentLocation}>{comment.location}</span>
                </div>
                <ReactMarkdown
                    className={styles.commentContent}
                    rehypePlugins={[rehypeSanitize]}
                    remarkPlugins={[remarkGfm]}
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
                        a({...props}) {
                            return <Link className={clsx(styles.underlineAnimation, styles.glowAnimation)}
                                         {...props}/>;
                        },
                        p({...props}) {
                            return <p className={'mt-2 mb-2 line'} style={{lineHeight: '1.5'}} {...props} />;
                        },
                        table({...props}) {
                            return <TableView {...props} />;
                        },
                        h1({...props}) {
                            return <h1 className={'mt-4 mb-4'} {...props} />;
                        },
                        h2({...props}) {
                            return <h2 className={'mt-3 mb-3'} {...props} />;
                        },
                        h3({...props}) {
                            return <h3 className={'mt-2 mb-2'} {...props} />;
                        },
                    }}
                >
                    {comment.content}
                </ReactMarkdown>
                <Button variant="ghost" size="2" className={styles.replyButton}
                        onClick={() => setIsReplying(true)}> 回复 </Button>
                {isReplying && <Button variant="ghost" size="2" className="ml-8"
                                       onClick={() => setIsReplying(false)}> 取消 </Button>}
                {isReplying && <CommentForm id={comment.areaId} parentId={comment.id}/>}
                {comment.children.length > 0 && <CommentList subComments={comment.children}/>}
            </div>
        </motion.div>
    );
};

export default CommentListItem;
