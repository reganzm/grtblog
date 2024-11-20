import React from 'react';
import styles from '@/styles/Footer.module.scss';
import {Container, Link, Text} from '@radix-ui/themes';
import {article_font} from "@/app/fonts/font";
import {clsx} from "clsx";

const Footer = () => {
    return (
        <div className={clsx(article_font.className, "text-sm")}>
            <Container size={'4'}>
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <Text className={styles.footerTitle}> 想要了解我 &gt; </Text>
                        <Link href="/about" className={styles.footerLink}> 关于我 </Link>
                        <Link href="/about-grtblog" className={styles.footerLink}> 关于 Grtblog 的故事 </Link>
                    </div>
                    <div className={styles.footerSection}>
                        <Text className={styles.footerTitle}> 你也许在找 &gt;  </Text>
                        <Link href="/archives" className={styles.footerLink}> 归档 </Link>
                        <Link href="/friends" className={styles.footerLink}> 友链 </Link>
                        <Link href="/feed" className={styles.footerLink}> RSS </Link>
                        <Link href="/overview" className={styles.footerLink}> 概况 </Link>
                    </div>
                    <div className={styles.footerSection}>
                        <Text className={styles.footerTitle}> 联系我叭 &gt;  </Text>
                        <Link href="/message" className={styles.footerLink}> 写留言 </Link>
                        <Link href="mailto:grtsinry43@outlook.com" className={styles.footerLink}> 发邮件 </Link>
                        <Link href="https://github.com/grtsinry43" target="_blank" className={styles.footerLink}>
                            GitHub
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
