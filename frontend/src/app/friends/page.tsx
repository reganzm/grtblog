'use client';

import React, {useState} from 'react';
import {article_font, noto_sans_sc, noto_serif_sc_bold} from '@/app/fonts/font';
import {clsx} from 'clsx';
import {motion} from 'framer-motion';
import {Container, Heading, Text, Grid, Button, IconButton, ChevronDownIcon} from '@radix-ui/themes';
import FriendCard from '@/components/friend/FriendCard';
import FriendLinkApplyModal from '@/components/friend/FriendLinkApplyModal';

const friends = [
    {
        name: 'Barkure',
        url: 'https://barku.re/',
        avatar: 'https://barku.re/assets/icon.svg',
        description: 'Hello! I\'m Barkure',
    },
    {name: '李四', url: 'https://lisi.com', avatar: '/placeholder.svg?height=100&width=100', description: '设计师'},
    {
        name: '王五',
        url: 'https://wangwu.com',
        avatar: '/placeholder.svg?height=100&width=100',
        description: '全栈工程师',
    },
    // 根据需要添加更多朋友
];

const CollapsibleInfo = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClose = () => {
        setIsModalOpen(false);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <motion.div
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                transition={{type: 'spring', stiffness: 100, damping: 30, mass: 0.5}}
            >
                <div className={article_font.className}>
                    <div className="flex mt-6 w-full items-center" style={{
                        padding: '0 1em',
                    }}>
          <span
              className={clsx(noto_sans_sc, 'block mt-4 mb-4 text-xl font-bold justify-start flex-1')}> 申请友链与本站信息 </span>
                        <IconButton size="2" className="justify-end" variant={'ghost'} onClick={toggleCollapse}
                                    style={{display: 'block', margin: '1em auto'}}>
                            <motion.div
                                animate={{rotate: isCollapsed ? 0 : 180}}
                                transition={{duration: 0.3}}
                            >
                                <ChevronDownIcon style={{
                                    color: 'var(--foreground)',
                                }}/>
                            </motion.div>
                        </IconButton>
                    </div>
                    {!isCollapsed && (
                        <motion.div
                            initial={{opacity: 0, y: -40}}
                            animate={{opacity: 1, y: 0}}
                            transition={{type: 'spring', stiffness: 100, damping: 10, mass: 0.5, bounce: 0.7}}
                        >
                            <div className="p-4">
                                <div>
                                    <span
                                        className={clsx(noto_sans_sc, 'block mt-2 text-sm')}> 网站名称：Grtsinry43&#39;s Blog </span>
                                    <span
                                        className={clsx(noto_sans_sc, 'block mt-2 text-sm')}> 网站地址：https://blog.grtsinry43.com </span>
                                    <span
                                        className={clsx(noto_sans_sc, 'block mt-2 text-sm')}> 网站描述：总之岁月漫长，然而值得等待 </span>
                                    <span
                                        className={clsx(noto_sans_sc, 'block mt-2 text-sm')}> 网站头像：https://blog.grtsinry43.com/favicon.ico </span>
                                </div>
                                <div>
                                    <span className={clsx(noto_sans_sc, 'block mt-6 text-md')}> 友链要求： </span>
                                    <span
                                        className={clsx(noto_sans_sc, 'block mt-2 text-sm')}> 请确保贵站有一定的更新频率，内容原创，且内容健康向上。 </span>
                                    <span
                                        className={clsx(noto_sans_sc, 'block mt-2 text-sm')}> 如需友链，请在贵站友链页面添加本站链接后联系本站。 </span>
                                    <span
                                        className={clsx(noto_sans_sc, 'block mt-2 text-sm')}> 请确认网站能够正常访问哦！ </span>
                                </div>
                                <Button onClick={() => setIsModalOpen(true)}
                                        size="2" variant={'soft'} style={{display: 'block', margin: '2em auto'}}>
                                    我想和你交朋友٩(๑˃̵ᴗ˂̵๑)۶
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
            <FriendLinkApplyModal isOpen={isModalOpen} onClose={onClose}/>
        </>
    );
};

const FriendPage = () => {
    return (
        <Container size="3">
            <div className="p-10">
                <motion.div
                    initial={{opacity: 0, y: 40}}
                    animate={{opacity: 1, y: 0}}
                    transition={{type: 'spring', stiffness: 100, damping: 30, mass: 0.5}}
                >
                    <Heading size="8" align="center" className={clsx(noto_sans_sc.className, 'mt-6')}>
                        亲爱的朋友们
                    </Heading>
                    <Text size="5" align="center" className={clsx(noto_serif_sc_bold.className, 'mt-2 mb-12 block')}>
                        青山一道同云雨，明月何曾是两乡。
                    </Text>
                    <motion.div
                        variants={{
                            hidden: {opacity: 0},
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2,
                                },
                            },
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        <Grid columns={{initial: '1', sm: '2', md: '3'}} gap="4">
                            {friends.map((friend, index) => (
                                <FriendCard key={index} {...friend} />
                            ))}
                        </Grid>
                    </motion.div>
                </motion.div>

                <CollapsibleInfo/>
            </div>
        </Container>
    );
};

export default FriendPage;
