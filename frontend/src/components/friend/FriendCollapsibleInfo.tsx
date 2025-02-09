"use client"

import {useState} from "react"
import {motion} from "framer-motion"
import {article_font, noto_sans_sc} from "@/app/fonts/font"
import {clsx} from "clsx"
import {Button} from "@/components/ui/button"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import FriendLinkApplyModal from "@/components/friend/FriendLinkApplyModal"

const FriendCollapsibleInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onClose = () => {
        setIsModalOpen(false)
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 40}}
            animate={{opacity: 1, y: 0}}
            transition={{type: "spring", stiffness: 100, damping: 30, mass: 0.5}}
        >
            <div className={article_font.className}>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="friend-info">
                        <AccordionTrigger
                            className={clsx(noto_sans_sc, "text-xl font-bold")}> 申请友链与本站信息 </AccordionTrigger>
                        <AccordionContent>
                            <div className="p-4">
                                <div>
                                    <span
                                        className={clsx(noto_sans_sc, "block mt-2 text-sm")}> 网站名称：Grtsinry43&#39;s Blog</span>
                                    <span className={clsx(noto_sans_sc, "block mt-2 text-sm")}>
                    网站地址：https://blog.grtsinry43.com
                  </span>
                                    <span
                                        className={clsx(noto_sans_sc, "block mt-2 text-sm")}> 网站描述：总之岁月漫长，然而值得等待 </span>
                                    <span className={clsx(noto_sans_sc, "block mt-2 text-sm")}>
                    网站头像：https://blog.grtsinry43.com/favicon.ico
                  </span>
                                </div>
                                <div>
                                    <span className={clsx(noto_sans_sc, "block mt-6 text-md")}> 友链要求：</span>
                                    <span className={clsx(noto_sans_sc, "block mt-2 text-sm")}>
                    请确保贵站有一定的更新频率，内容原创，且内容健康向上。
                  </span>
                                    <span className={clsx(noto_sans_sc, "block mt-2 text-sm")}>
                    如需友链，请在贵站友链页面添加本站链接后联系本站。
                  </span>
                                    <span
                                        className={clsx(noto_sans_sc, "block mt-2 text-sm")}> 请确认网站能够正常访问哦！</span>
                                </div>
                                <Button onClick={() => setIsModalOpen(true)} className="block mx-auto mt-8"
                                        variant="default" style={{
                                    backgroundColor: "var(--primary)",
                                    border: "2px solid rgba(var(--foreground), 0.1)",
                                }}>
                                    我想和你交朋友٩(๑˃̵ᴗ˂̵๑)۶
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <FriendLinkApplyModal isOpen={isModalOpen} onClose={onClose}/>
        </motion.div>
    )
}

export default FriendCollapsibleInfo

