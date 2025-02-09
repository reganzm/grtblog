'use client';

import React, {useEffect, useState, useRef} from 'react';
import {Avatar, Box, Flex, Text, Link as RadixLink} from '@radix-ui/themes';
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

const ArticleInlineLinkClient = ({linkTitle, linkUrl, siteInfo}: {
    linkTitle: string;
    linkUrl: string,
    siteInfo?: SiteInfo
}) => {
    const [bgColor, setBgColor] = useState('');
    const linkRef = useRef<HTMLDivElement>(null);
    const {theme} = useTheme();

    const fullUrl = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;

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
            <div className="flex justify-center">
                {
                    siteInfo.name && (
                        <Link href={linkUrl} target="_blank">
                            <div
                                ref={linkRef}
                                onMouseMove={handleMouseMove}
                                style={{
                                    margin: '10px 0',
                                    border: '1px solid rgba(var(--foreground), 0.1)',
                                    borderRadius: '0.5em',
                                    padding: '1em',
                                    maxWidth: '400px',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    background: bgColor || 'var(--gray-2)',
                                    position: 'relative',
                                }}>

                                <div>
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

                                    <Text as="p" size="1" style={{
                                        color: 'var(--gray-11)',
                                        margin: '10px auto'
                                    }}>
                                        {siteInfo.subtitle}
                                    </Text>
                                </div>
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
                            </div>
                        </Link>
                    )
                }
            </div>
        </>
    );
};

export default ArticleInlineLinkClient;
