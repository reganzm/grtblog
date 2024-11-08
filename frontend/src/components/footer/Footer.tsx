import React from 'react';
import styles from '@/styles/Footer.module.scss';
import FooterInfo from '@/components/footer/FooterInfo';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <footer>
        <FooterInfo />
      </footer>
    </div>
  );
};

export default Footer;
