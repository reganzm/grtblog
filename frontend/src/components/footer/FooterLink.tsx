import React from 'react';
import styles from '@/styles/Footer.module.scss';
import {Container, Link, Text} from '@radix-ui/themes';
import {article_font} from "@/app/fonts/font";
import {clsx} from "clsx";
import {FooterLink, FooterSection, getFooterLinks} from "@/api/footer";

const Footer = async () => {
    const footerLinks: FooterSection[] = await getFooterLinks({next: {revalidate: 60}});
    return (
        <div className={clsx(article_font.className, "text-sm")}>
            <Container size={'4'}>
                <div className={styles.footerContent}>
                    {footerLinks?.map((section) => (
                        <div key={section.id} className={styles.footerSection}>
                            <Text className={styles.footerTitle}>{section.title}</Text>
                            {section.links.map((linkMap, index) =>
                                Object.values(linkMap).map((link: FooterLink, subIndex) => (
                                    <Link
                                        key={`${index}-${subIndex}`}
                                        href={link.url}
                                        className={styles.footerLink}
                                        target={link.url.startsWith('http') ? '_blank' : undefined}
                                    >
                                        {link.text}
                                    </Link>
                                )),
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Footer;
