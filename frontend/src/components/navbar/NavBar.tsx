'use client';

import React, { useState, useEffect } from 'react';
import NavBarDesktop from './NavBarDesktop';
import NavBarMobile from './NavBarMobile';

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // 初始化
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? <NavBarMobile /> : <NavBarDesktop />}
    </div>
  );
};

export default NavBar;
