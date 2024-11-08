import React from 'react';
import clsx from 'clsx';
import styles from '@/styles/Footer.module.scss';
import { varela_round } from '@/app/fonts/font';
import { Avatar, Box, Flex, Heading, HoverCard, Link, Text } from '@radix-ui/themes';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const FooterInfo = () => {
  return (
    <>
      <div className={clsx(styles.footerText, varela_round.className)}>
        Powered by
        <div className="inline-flex ms-0.5 me-0.5 items-center">
          <Text>
            <HoverCard.Root>
              <HoverCard.Trigger>
                <Link href="https://github.com/grtsinry43/grtblog"
                      weight={'bold'}
                      className={styles.footerLink}>Grtblog</Link>
              </HoverCard.Trigger>
              <HoverCard.Content maxWidth="300px">
                <Flex gap="4">
                  <Avatar
                    size="3"
                    fallback="G"
                    radius="full"
                    src="https://avatars.githubusercontent.com/u/77447646?v=4"
                  />
                  <Box>
                    <Heading size="3" as="h3">
                      Grtblog
                    </Heading>
                    <Text as="div" size="2" color="gray" mb="2">
                      A blog framework for developers
                    </Text>
                    <Text as="div" size="2">
                      基于 Reactjs 与 SpringBoot，前后端分离，支持服务端与静态生成混合模式，有丰富自定义，支持部分重载与主题更换的综合型博客系统（内容管理系统）
                    </Text>
                  </Box>
                </Flex>
              </HoverCard.Content>
            </HoverCard.Root>
          </Text>
          <GitHubLogoIcon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
        </div>
        &middot; A blog framework
        for developers
      </div>
      <p className={clsx(styles.footerText, varela_round.className)}>
        Copyright &copy; 2022-2024 grtsinry43. All rights reserved.
      </p>
      <p className={clsx(styles.footerText, styles.recordNumber)}>
          <span>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
            湘 ICP 备 0000000000 号 -1
            </a>
          </span>
        <span>
             湘公网安备 0000000000000 号
          </span>
      </p>
    </>
  );
};

export default FooterInfo;
