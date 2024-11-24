import React from 'react';
import styles from '@/styles/Footer.module.scss';
import FooterInfo from '@/components/footer/FooterInfo';
import FooterLink from "@/components/footer/FooterLink";
import OnlineStats from "@/components/OnlineStats";
import {Container} from "@radix-ui/themes";
import {WebsiteInfo} from "@/types";

const Footer = ({websiteInfo}: { websiteInfo: WebsiteInfo }) => {
    return (
        <div className={`${styles.footerContainer} ${styles.textureOverlay}`}>
            <footer>
                <Container size={'4'}>
                    <OnlineStats/>
                    <FooterLink/>
                    <FooterInfo websiteInfo={websiteInfo}/>
                </Container>
            </footer>
        </div>
    );
};

export default Footer;
