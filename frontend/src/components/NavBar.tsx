'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, Button } from '@radix-ui/themes';
import { MoonIcon, SunIcon, GitHubLogoIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import styles from '@/styles/NavBar.module.scss';
import { useTheme } from 'next-themes';
import { clsx } from 'clsx';

export default function NavBar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      name: '首页', href: '/',
      children: [
        { name: '留言板', href: '/comments' },
        { name: '友链', href: '/friends' },
      ],
    },
    { name: '关于', href: '/about' },
    { name: '分类', href: '/categories' },
    { name: '文章', href: '/posts' },
    { name: '项目', href: '/projects' },
    { name: '标签', href: '/tags' },
  ];

  const handleMouseEnter = (name: string) => {
    setActiveItem(name);
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };

  return (
    <div className={styles.navbarWrapper}>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <nav className={styles.navbar}>
          <div className={styles.navbarContainer}>
            <div className={styles.avatarWrapper}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <Avatar
                  size="3"
                  radius="large"
                  src="https://dogeoss.grtsinry43.com/img/author.jpeg"
                  fallback="A"
                  className={styles.avatar}
                />
              </motion.div>
            </div>
            <div className={styles.navItemContainer}>
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className={styles.navItemWrapper}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={item.href} passHref>
                    <div className={styles.navItemLink}>
                      <motion.div whileTap={{ scale: 0.95 }}>
                                                <span
                                                  className={clsx(styles.navItem, styles.underlineAnimation, styles.glowAnimation)}>
                                                    {item.name}
                                                </span>
                      </motion.div>
                    </div>
                  </Link>
                  <AnimatePresence>
                    {item.children && activeItem === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={styles.submenu}>
                          {item.children.map((child, index) => (
                            <motion.div
                              key={child.name}
                              initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Link href={child.href} passHref>
                                <div className={styles.submenuItemWrapper}>
                                  <motion.div whileTap={{ scale: 0.95 }}>
                                    <span className={styles.submenuItem}>{child.name}</span>
                                  </motion.div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <div className={styles.navbarContent}>
              <div className={styles.searchWrapper}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <div className={styles.search}>
                    <MagnifyingGlassIcon className={styles.searchIcon} />
                  </div>
                </motion.div>
              </div>
              <div className={styles.githubWrapper}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="https://github.com/grtsinry43"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                  >
                    <GitHubLogoIcon />
                  </a>
                </motion.div>
              </div>
              <div className={styles.themeToggleWrapper}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  {mounted && (
                    <div
                      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                      className={styles.themeToggle}
                    >
                      {resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </div>
                  )}
                </motion.div>
              </div>
              <div className={styles.loginButtonWrapper}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="soft" className={styles.loginButton}>
                    登录
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </nav>
      </motion.div>
      {/*<motion.div*/}
      {/*    initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}*/}
      {/*    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}*/}
      {/*    transition={{ delay: 0.5, duration: 0.5}}*/}
      {/*>*/}
      {/*    <div className={styles.subtitle}>*/}
      {/*        欢迎来到我的博客 */}
      {/*    </div>*/}
      {/*</motion.div>*/}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.2 }}
      >
        <div className={styles.background} />
      </motion.div>
    </div>
  );
}
