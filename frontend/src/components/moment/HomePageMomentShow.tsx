"use client";

import React from 'react';
import styles from "@/styles/moment/HomePageMomentShow.module.scss";
import {ChevronDownIcon} from "@radix-ui/themes";
import {motion} from 'framer-motion';
import {clsx} from "clsx";
import Image from "next/image";
import quoteFront from "@/assets/quote-front.svg";

const HomePageMomentShow = () => {
    // const [msg, setMsg] = React.useState<string>("");
    // const [date, setDate] = React.useState<string>("");
    // React.useEffect(() => {
    //     hello().then(res => {
    //         setMsg(res.data?.data.msg);
    //         setDate(res.data?.data.date);
    //     });
    // }, []);
    return (
        <div className={styles.container}>
            <div className={clsx(styles.content, "max-w-md")}>
                {/* 左上角的上引号 */}
                <motion.div
                    initial={{y: 100}}
                    animate={{y: 0}}
                    transition={{type: 'spring', stiffness: 80, damping: 20}}
                >
                    <div className={styles.quotationMark}>
                        <Image src={quoteFront} alt={"quotation mark"} width={50} height={50}/>
                    </div>
                    <span className={clsx(styles.underlineAnimation, "text-[0.8em] cursor-pointer")}>
                        {/* 如果你赶不上凌晨 5 点的日出不妨看看傍晚 6 点的夕阳 <br/>*/}
                        {/* 任何时间都不晚 <br/>*/}
                        {/* 希望你有足够的勇气 <br/>*/}
                        {/* 面对风雪面对锣鼓铿锵的号角 <br/>*/}
                        {/* 也面对朝阳 🌅*/}
                        我们终此一生，就是摆脱他人的期待，找到真正的自己
                        {/*{msg}*/}
                    </span>
                    <p className="mt-4 flex justify-end text-gray-400 text-[0.75rem]">
                        <span className="mr-4"> 原创 </span>
                        <span className="mr-1"> 发布于 2024-10-27 </span>
                    </p>
                </motion.div>
            </div>
            <div className={styles.arrowContainer}>
                <motion.span
                    initial={{y: 0}}
                    animate={{y: 10}}
                    transition={{type: 'spring', stiffness: 260, damping: 20}}
                >
                    <span className="text-gray-400 text-[0.75rem]">
                        下滑查看更多
                    </span>
                </motion.span>
                <motion.div
                    initial={{y: 0}}
                    animate={{y: 10}}
                    transition={{repeat: Infinity, repeatType: "reverse", duration: 1}}
                >
                    <ChevronDownIcon style={{width: 20, height: 20}}/>
                </motion.div>
            </div>
        </div>
    );
};

export default HomePageMomentShow;
