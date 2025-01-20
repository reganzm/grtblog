'use client';

import React, {useEffect, useState, useRef} from 'react';
import {Avatar, Box, Flex, Text, Link as RadixLink} from '@radix-ui/themes';
import {motion, AnimatePresence} from 'framer-motion';
import Link from "next/link";
import {ExternalLinkIcon} from '@radix-ui/react-icons';
import {useTheme} from 'next-themes';
import {jetbrains_mono} from "@/app/fonts/font";

type SiteInfo = {
    icon: string;
    name: string;
    title: string;
    subtitle: string;
};

async function fetchSiteInfo(url: string): Promise<SiteInfo | null> {
    const response = await fetch(`/api/fetchSiteInfo?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
        return null;
    }
    return await response.json();
}

const ArticleInlineLink = ({linkTitle, linkUrl}: { linkTitle: string; linkUrl: string }) => {
    const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [bgColor, setBgColor] = useState('');
    const linkRef = useRef<HTMLDivElement>(null);
    const {theme} = useTheme();

    const fullUrl = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;

    useEffect(() => {
        fetchSiteInfo(fullUrl).then(data => setSiteInfo(data));
    }, [fullUrl]);

    useEffect(() => {
        if (siteInfo?.icon) {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = siteInfo.icon;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;
                    let r = 0, g = 0, b = 0;
                    for (let i = 0; i < data.length; i += 4) {
                        r += data[i];
                        g += data[i + 1];
                        b += data[i + 2];
                    }
                    r = Math.floor(r / (data.length / 4));
                    g = Math.floor(g / (data.length / 4));
                    b = Math.floor(b / (data.length / 4));
                    setBgColor(`rgba(${r}, ${g}, ${b}, 0.1)`);
                }
            };
        }
    }, [siteInfo]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!linkRef.current) return;
        const rect = linkRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        linkRef.current.style.setProperty('--mouse-x', `${x}px`);
        linkRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    if (!siteInfo) {
        return (
            <RadixLink asChild>
                <Link href={fullUrl} target="_blank" rel="noopener noreferrer">
                    {linkTitle}
                </Link>
            </RadixLink>
        );
    }

    return (
        <>
            <RadixLink asChild>
                <Link href={fullUrl} target="_blank" rel="noopener noreferrer" className={jetbrains_mono.className}>
                    {linkTitle}
                </Link>
            </RadixLink>
            <Link href={linkUrl} target="_blank">
                {
                    siteInfo.name && (
                        <motion.div
                            animate={{
                                maxWidth: isHovered ? '600px' : '400px',
                                maxHeight: 'auto',
                                padding: isHovered ? '1.5em' : '1em'
                            }}
                            transition={{duration: 0.3, ease: 'easeInOut'}}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onMouseMove={handleMouseMove}

                            ref={linkRef}
                            p="3"
                            style={{
                                margin: '10px auto',
                                border: '1px solid var(--gray-5)',
                                borderRadius: 'var(--radius-3)',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                background: bgColor || 'var(--gray-2)',
                                position: 'relative',
                            }}>

                            <Flex align="center" gap="3" style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}>
                                <Avatar
                                    size="3"
                                    src={siteInfo.icon}
                                    fallback={siteInfo.name[0]}
                                    radius="large"
                                />
                                <Box style={{
                                    flex: 1,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    <Text as="div" size="2" weight="bold" style={{color: 'var(--gray-12)'}}>
                                        {siteInfo.name}
                                    </Text>
                                    <Text as="div" size="1" style={{color: 'var(--gray-11)'}}>
                                        {siteInfo.title}
                                    </Text>
                                </Box>
                                <ExternalLinkIcon/>
                            </Flex>
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 0.2}}
                                    >
                                        <Text as="p" size="1" style={{
                                            color: 'var(--gray-11)',
                                            margin: '10px auto'
                                        }}>
                                            {siteInfo.subtitle}
                                        </Text>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    opacity: 0.05,
                                    background: `radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), 
                              ${theme === 'dark' ? 'white' : 'black'}, 
                              transparent)`,
                                    pointerEvents: 'none',
                                }}
                            />
                        </motion.div>
                    )
                }
            </Link>
        </>
    );
};

export default ArticleInlineLink;
