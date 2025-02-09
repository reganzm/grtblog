"use client";

import React, {useState} from 'react';
import {useAppSelector} from "@/redux/hooks";
import {article_font} from "@/app/fonts/font";
import {clsx} from "clsx";
import {motion} from "framer-motion";
import {PaperclipIcon, UserIcon} from "lucide-react";

const FooterLink = () => {
    const onlineCount = useAppSelector(state => state.onlineCount.total);
    const pageViewCount = useAppSelector(state => state.onlineCount.pageView);

    const [isDetailVisible, setIsDetailVisible] = useState(false);
    return (
        <div className={clsx(article_font.className, "relative inline-block")} onMouseEnter={
            () => {
                setIsDetailVisible(true);
            }
        } onMouseLeave={
            () => {
                setIsDetailVisible(false);
            }
        } style={{
            cursor: 'pointer',
            fontSize: '0.8rem',
        }}>
            <span> 正在有 {onlineCount} 位小伙伴看着我的网站呐 </span>
            {
                isDetailVisible && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={isDetailVisible ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                        transition={{type: 'spring', stiffness: 100}}>
                        <div style={{
                            position: 'absolute',
                            width: 'max-content',
                            bottom: '100%',
                            left: '50%',
                            transform: 'translateX(-50%) translateY(-2rem)',
                            backgroundColor: 'rgba(var(--background), 0.9)',
                            padding: '0.7rem',
                            borderRadius: '0.5rem',
                            backdropFilter: 'blur(10px)',
                            zIndex: 100,
                            border: '1px solid rgba(var(--foreground), 0.1)',
                        }}>
                            {
                                pageViewCount.map((item, index) => {
                                    return (
                                        <div key={index} className={"flex"} style={{
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}>
                                            <div className="mr-8">
                                                <PaperclipIcon size={12} className="inline-block mr-2 opacity-35"/>
                                                <span>{item.name}</span>
                                            </div>
                                            <div>
                                                <UserIcon size={12} className="inline-block mr-1 opacity-35"/>
                                                <span>{item.count}</span>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </motion.div>
                )
            }

        </div>
    );
};

export default FooterLink;
