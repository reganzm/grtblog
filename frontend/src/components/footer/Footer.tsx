import React from 'react';
import styles from '@/styles/Footer.module.scss';
import FooterInfo from '@/components/footer/FooterInfo';
import FooterLink from "@/components/footer/FooterLink";
import OnlineStats from "@/components/OnlineStats";
import {Container} from "@radix-ui/themes";

const Footer = () => {
    return (
        <div className={`${styles.footerContainer} ${styles.textureOverlay}`}>
            <footer>
                <Container size={'4'}>
                    <OnlineStats/>
                    <FooterLink/>
                    <FooterInfo/>
                </Container>
            </footer>
        </div>
    );
};

export default Footer;
