"use client";

import React, {useEffect, useState} from 'react';
import {useWebsiteInfo} from "@/app/website-info-provider";
import useIsMobile from "@/hooks/useIsMobile";
import {motion} from "framer-motion";
import {Clock} from "lucide-react";

const InfoCard = () => {
    const websiteInfo = useWebsiteInfo();
    const createTime = new Date(websiteInfo.WEBSITE_CREATE_TIME);
    const [timeDiff, setTimeDiff] = useState('');
    const isMobile = useIsMobile();

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = now.getTime() - createTime.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setTimeDiff(`${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒 `);
        }, 1000);

        return () => clearInterval(interval);
    }, [createTime]);

    if (isMobile) {
        return null;
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
        >
            <div
                className="w-64 p-4 bg-card text-card-foreground shadow-sm rounded-lg border-b-gray-600 border-opacity-45 dark:border-none sticky mt-80 ml-4">
                <div className="flex justify-center mb-3">
                    <div className="flex items-center justify-center">
                        <motion.div
                            animate={{rotate: 360}}
                            transition={{duration: 40, repeat: Infinity, ease: "linear"}}
                        >
                            <Clock className="w-12 h-12 text-primary"/>
                        </motion.div>
                    </div>
                    <div className={'flex flex-col items-center justify-center ml-4'}>
                        <p className="text-xs mb-1 text-muted-foreground"> 在风雨飘摇之中</p>
                        <p className="text-xs mb-1 text-muted-foreground"> 本站已运行了 </p>
                    </div>
                </div>

                <p className="text-sm font-medium text-center text-primary mb-1">
                    {timeDiff}
                </p>
                <p className="text-xs text-center mb-1 text-muted-foreground"> 一路走来，感谢陪伴与支持 </p>
                <p className="text-xs text-center text-muted-foreground"> 愿我们不负热爱，继续前行 </p>
            </div>
        </motion.div>
    );
};

export default InfoCard;
