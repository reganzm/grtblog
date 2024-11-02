'use client';

import React from 'react';
import styles from '@/styles/Home.module.scss';
import { Avatar, Container, HoverCard, Text, Flex, Box, Heading } from '@radix-ui/themes';
import { CodeIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const AuthorCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.bannerCard}>
        <div className="relative w-full max-w-md">
          <div
            className="absolute -left-16 -bottom-16 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-50 animate-pulse" />
          <div
            className="absolute -right-16 -top-16 w-32 h-32 bg-orange-500 rounded-full blur-2xl opacity-50 animate-pulse" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            drag
            dragConstraints={{
              top: -50,
              left: -50,
              right: 50,
              bottom: 50,
            }}
          >
            <Container
              className="relative backdrop-blur-3xl bg-gradient-to-r from-white/40 to-white/20 dark:from-black/40 dark:to-black/20 p-8 rounded-xl z-0 border border-white/20 shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16 border-2 border-white shadow-lg"
                        src="https://dogeoss.grtsinry43.com/img/author.jpeg" alt="Author"
                        size={'4'}
                        fallback={'Avatar'} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300">grtsinry43</h2>
                  <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">Java + JavaScript
                    全栈开发者 </p>
                </div>
              </div>
              <div className="space-y-2">
                <p
                  className="text-gray-700 dark:text-gray-300"> 一个正在学习前端的大二学生，喜欢折腾各种技术，欢迎来我的博客逛逛！</p>
                <p
                  className="text-gray-700 dark:text-gray-300"> 希望我的博客能给你带来一些帮助，也希望能和你成为朋友！</p>
                <div className="links flex">
                  <div className="flex items-center space-x-2">
                    <GitHubLogoIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <Text>
                      <HoverCard.Root>
                        <HoverCard.Trigger>
                          <a
                            href="https://github.com/grtsinry43"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={clsx(styles.underlineAnimation, 'text-blue-700 dark:text-blue-400', styles.glowAnimation)}
                          >
                            grtsinry43
                          </a>
                        </HoverCard.Trigger>
                        <HoverCard.Content maxWidth="300px">
                          <Flex gap="4">
                            <Avatar
                              size="3"
                              fallback="R"
                              radius="full"
                              src="https://avatars.githubusercontent.com/u/77447646?v=4"
                            />
                            <Box>
                              <Heading size="3" as="h3">
                                grtsinry43
                              </Heading>
                              <Text as="div" size="2" color="gray" mb="2">
                                grtsinry43 · he/him
                              </Text>
                              <Text as="div" size="2">
                                Nothing but enthusiasm brightens up the endless years.
                              </Text>
                            </Box>
                          </Flex>
                        </HoverCard.Content>
                      </HoverCard.Root>
                    </Text>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <CodeIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <Text>
                      <HoverCard.Root>
                        <HoverCard.Trigger>
                          <a
                            href="https://www.grtsinry43.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={clsx(styles.underlineAnimation, 'text-blue-700 dark:text-blue-400', styles.glowAnimation)}
                          >
                            Home Page
                          </a>
                        </HoverCard.Trigger>
                        <HoverCard.Content maxWidth="300px">
                          <Flex gap="4">
                            <Avatar
                              size="3"
                              fallback="R"
                              radius="full"
                              src="https://www.grtsinry43.com/favicon.ico"
                            />
                            <Box>
                              <Heading size="3" as="h3">
                                学习开发记录
                              </Heading>
                              <Text as="div" size="2" color="gray" mb="2">
                                grtsinry43 的个人主页
                              </Text>
                              <Text as="div" size="2">
                                记录了最近项目，学习进度，折腾历程，以及一些技术分享。
                              </Text>
                            </Box>
                          </Flex>
                        </HoverCard.Content>
                      </HoverCard.Root>
                    </Text>
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorCard;
