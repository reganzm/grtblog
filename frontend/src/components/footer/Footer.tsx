import React from 'react';
import styles from '@/styles/Footer.module.scss';
import FooterInfo from '@/components/footer/FooterInfo';
// import SocketOnlineCount from "@/components/SocketOnlineCount";
// import {useAppSelector} from "@/redux/hooks";

const Footer = () => {
    // const onlineCount = useAppSelector(state => state.onlineCount.count);
    return (
        <div className={`${styles.footerContainer} ${styles.textureOverlay}`}>
            <footer>
                <FooterInfo/>
                <div className={styles.onlineCount}>
                    {/* 在线人数: {onlineCount}*/}
                </div>
                {/*<SocketOnlineCount/>*/}
            </footer>
        </div>
    );
};

export default Footer;
