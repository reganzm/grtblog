'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import RecentArticleItem from '@/app/home/recent/RecentArticleItem';

const staggerContainer = {
  hidden: { opacity: 1, blur: 20 },
  visible: {
    opacity: 1,
    transition: {
      // 间隔时间
      staggerChildren: 0.2,
    },
  },
};

const itemMotion = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1, x: 0, transition: {
      duration: 1,
    },
  },
};

const RecentArticleMotion = ({ list }: { list: any[] }) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {list.map((item: any, index: number) => (
        <motion.div key={index} variants={itemMotion} ref={ref}>
          <RecentArticleItem article={item} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RecentArticleMotion;
