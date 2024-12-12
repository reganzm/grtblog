"use client";

import React, {useState} from "react";
import {motion} from "framer-motion";
import {article_font, noto_sans_sc} from "@/app/fonts/font";
import {clsx} from "clsx";
import {Button, ChevronDownIcon, IconButton} from "@radix-ui/themes";
import FriendLinkApplyModal from "@/components/friend/FriendLinkApplyModal";

const FriendCollapsibleInfo = () => {
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

export default FriendCollapsibleInfo;
