'use client';

import React, { useState, useEffect } from 'react';
import NavBarDesktop from './NavBarDesktop';
import NavBarMobile from './NavBarMobile';

type NavItem = {
  name: string;
  href: string;
  children?: NavItem[];
}

const NavBar = ({ items }: { items: NavItem[] }) => {
  
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
      {isMobile ? <NavBarMobile items={items} /> : <NavBarDesktop items={items} />}
    </div>
  );
};

export default NavBar;
