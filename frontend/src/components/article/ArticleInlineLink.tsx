'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Box, Flex, Heading, HoverCard, Text } from '@radix-ui/themes';
import { clsx } from 'clsx';
import styles from '@/styles/Home.module.scss';
import { jetbrains_mono } from '@/app/fonts/font';

type SiteInfo = {
  icon: string;
  name: string;
  title: string;
  subtitle: string;
};

async function fetchSiteInfo(url: string): Promise<SiteInfo> {
  const response = await fetch(`/api/fetchSiteInfo?url=${encodeURIComponent(url)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch site info');
  }
  return await response.json();
}

const ArticleInlineLink = ({ linkTitle, linkUrl }: { linkTitle: string; linkUrl: string }) => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);

  console.log('ArticleInlineLink', linkUrl);

  useEffect(() => {
    fetchSiteInfo(linkUrl).then(data => setSiteInfo(data));
  }, [linkUrl]);

  if (!siteInfo) {
    return <a className={jetbrains_mono.className}
              href={linkUrl} target="_blank" rel="noopener noreferrer">{linkTitle}</a>;
  }

  return (
    <Text>
      <HoverCard.Root>
        <HoverCard.Trigger>
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.underlineAnimation, 'text-blue-500 dark:text-blue-400', styles.glowAnimation, jetbrains_mono.className)}
          >
            {linkTitle}
          </a>
        </HoverCard.Trigger>
        <HoverCard.Content maxWidth="300px">
          <Flex gap="4">
            <Avatar
              size="3"
              fallback="R"
              radius="full"
              src={siteInfo.icon}
            />
            <Box>
              <Heading size="3" as="h3">
                {siteInfo.name}
              </Heading>
              <Text as="div" size="2" color="gray" mb="2">
                {siteInfo.title}
              </Text>
              <Text as="div" size="2">
                {siteInfo.subtitle}
              </Text>
            </Box>
          </Flex>
        </HoverCard.Content>
      </HoverCard.Root>
    </Text>
  );
};

export default ArticleInlineLink;
