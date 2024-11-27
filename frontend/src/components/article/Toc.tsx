'use client';

import React, {useEffect, useState, useRef, useCallback} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useTheme} from 'next-themes';
import useIsMobile from '@/hooks/useIsMobile';
import emitter from '@/utils/eventBus';
import CommentModal from "@/components/comment/CommentModal";
import {Button} from "@radix-ui/themes";
import ReadingProgress from "@/components/article/ReadingProgress";

export type TocItem = {
    level: number
    name: string
    isSelect?: boolean
    anchor: string
    children?: TocItem[]
}

export default function Toc({toc, commentId}: { toc: TocItem[], commentId: string }) {
    const isMobile = useIsMobile();
    const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
    const {theme} = useTheme();
    const isDark = theme === 'dark';
    const [curTheme, setCurTheme] = useState('');
    const tocRef = useRef<HTMLDivElement>(null);
    const [activeItemRef, setActiveItemRef] = useState<HTMLLIElement | null>(null);
    const [isCommentOpen, setIsCommentOpen] = React.useState(false);

    const spring = {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.2,
        bounce: 0.7,
    };

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: {x: -20, opacity: 0},
        visible: {x: 0, opacity: 1, transition: spring},
    };

    const debounce = useCallback((func: (...args: unknown[]) => void, wait: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: unknown[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }, []);

    const getTOCWithSelect = useCallback((items: TocItem[], currentActiveAnchor: string | null): TocItem[] => {
        // 如果 items 不是数组，直接返回
        if (!Array.isArray(items)) {
            return [];
        }
        return items.map((item) => ({
            ...item,
            isSelect: item.anchor === currentActiveAnchor || (item.children && item.children.some(child => child.anchor === currentActiveAnchor)),
            children: item.children ? getTOCWithSelect(item.children, currentActiveAnchor) : [],
        }));
    }, []);

    const tocWithSelect = getTOCWithSelect(toc, activeAnchor);

    const getDoms = useCallback((items: TocItem[]): HTMLElement[] => {
        const doms: HTMLElement[] = [];
        const addToDoms = (items: TocItem[]) => {
            for (const item of items) {
                const dom = document.getElementById(item.anchor);
                if (dom) {
                    doms.push(dom);
                }
                if (item.children && item.children.length) {
                    addToDoms(item.children);
                }
            }
        };
        if (typeof document !== 'undefined' && items.length) {
            addToDoms(items);
        }
        return doms;
    }, []);

    const doms = getDoms(toc);

    useEffect(() => {
        setCurTheme(isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const handleScroll = debounce((scrollDom: HTMLElement) => {
            if (!scrollDom) return;
            const range = window.innerHeight;
            let newActiveAnchor = '';
            for (const dom of doms) {
                if (!dom) continue;
                const top = dom.getBoundingClientRect().top;
                if (top >= 0 && top <= range) {
                    newActiveAnchor = dom.id;
                    break;
                } else if (top > range) {
                    break;
                } else {
                    newActiveAnchor = dom.id;
                }
            }
            if (newActiveAnchor !== activeAnchor) {
                setActiveAnchor(newActiveAnchor);
            }
        }, 50);

        emitter.on('scroll', handleScroll);
        return () => {
            emitter.off('scroll', handleScroll);
        };
    }, [doms, activeAnchor, debounce]);

    const setItemRef = useCallback((el: HTMLLIElement | null, isSelect: boolean | undefined) => {
        if (isSelect && el) {
            setActiveItemRef(el);
        }
    }, []);

    useEffect(() => {
        if (activeItemRef && tocRef.current) {
            const tocContainer = tocRef.current;
            const containerRect = tocContainer.getBoundingClientRect();
            const activeItemRect = activeItemRef.getBoundingClientRect();

            const isItemVisible = (
                activeItemRect.top >= containerRect.top &&
                activeItemRect.bottom <= containerRect.bottom
            );

            if (!isItemVisible) {
                activeItemRef.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }
    }, [activeItemRef]);

    const renderTocItems = useCallback((items: TocItem[]) => {
        return items.map((item, index) => (
            <motion.div
                key={`${item.anchor}-${index}`}
                style={{
                    paddingLeft: `${(item.level - 2) * 12}px`,
                }}
                variants={itemVariants}
                ref={(el) => setItemRef(el as HTMLLIElement, item.isSelect)}
            >
                <li className={`mb-2 transition-all duration-300 ease-in-out ${
                    item.isSelect ? 'font-semibold' : 'font-normal'
                }`}>
                    <a
                        href={`#${item.anchor}`}
                        className={`block py-1 px-2 rounded transition-colors duration-300 ${
                            item.isSelect
                                ? 'text-primary bg-primary/10'
                                : `${curTheme}`
                        }`}
                    >
                        {item.name}
                    </a>
                </li>
                <AnimatePresence>
                    {item.isSelect && item.children && item.children.length > 0 && (
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={containerVariants}
                        >
                            <ul className="mt-1 ml-2 border-l border-primary/30 transition">
                                {renderTocItems(item.children)}
                            </ul>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </motion.div>
        ));
    }, [isDark, itemVariants, containerVariants, setItemRef]);

    if (isMobile) return null;

    return (
        <nav
            className="sticky top-24 h-[25em] overflow-y-auto w-56 pr-4 scroll-smooth text-sm"
            ref={tocRef}
        >
            <ReadingProgress/>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <ul className="space-y-1 py-4 transition">
                    {tocWithSelect.length > 0 && renderTocItems(tocWithSelect)}
                </ul>
                <Button onClick={() => setIsCommentOpen(true)}> 打开评论 </Button>
                <CommentModal isOpen={isCommentOpen} onClose={() => setIsCommentOpen(false)}
                              commentId={commentId}/>
            </motion.div>
        </nav>
    );
}
