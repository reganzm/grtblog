'use client';

import React from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { motion } from 'framer-motion';

export type TocItem = {
  level: number;
  text: string;
  anchor: string;
};

const Toc = ({ toc }: { toc: TocItem[] }) => {
  const isMobile = useIsMobile();

  const spring = {
    type: 'spring',
    stiffness: 300,
    damping: 10,
    mass: 0.2,
    bounce: 0.5,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // 稍微错开
      },
    },
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: spring },
  };

  console.log('toc', toc);
  return isMobile ? null : (
    <div style={{
      position: 'sticky',
      transition: 'all 0.3s',
      width: '200px',
      zIndex: 1,
      top: '100px',
      left: '20px',
      overflowY: 'auto',
    }}>
      <motion.ul
        style={{
          overflow: 'hidden',
          padding: '20px',
        }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {toc.length > 0 && toc.map((item, index) => (
          <motion.li
            key={index}
            style={{ marginLeft: `${(item.level - 2) * 20}px`, marginBottom: '5px' }}
            variants={itemVariants}
          >
            <a href={`#${item.anchor}`}>{item.text}</a>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Toc;
