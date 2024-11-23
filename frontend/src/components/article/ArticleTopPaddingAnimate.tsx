'use client';

import React from 'react';
import { motion } from 'framer-motion';

const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 10,
  mass: 1,
  bounce: 0.5,
};

const ArticleTopPaddingAnimate = () => {
  return (
    <motion.div
      initial={{ paddingTop: 0 }}
      animate={{ paddingTop: 50 }}
      transition={spring}
      style={{ width: '100%' }}
    >
      {/* Content goes here */}
    </motion.div>
  );
};

export default ArticleTopPaddingAnimate;
