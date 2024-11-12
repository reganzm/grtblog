'use client';

import React, { useState } from 'react';
import { FloatingPanel, Search, ConfigProvider } from 'react-vant';
import 'react-vant/lib/index.css';
import '@vant/touch-emulator';
import { IconButton } from '@radix-ui/themes';
import { TocItem } from '@/components/article/Toc';
import { TableOfContentsIcon } from 'lucide-react';
import useIsMobile from '@/hooks/useIsMobile';
import { motion } from 'framer-motion';

const FloatingTocMobile = ({ toc }: { toc: TocItem[] }) => {
  const isMobile = useIsMobile();
  const [anchors, setAnchors] = useState([0, 0, 0]);
  const [showPanel, setShowPanel] = useState(false);

  const showPanelHandle = () => {
    setShowPanel(true);
    setAnchors([320, window.innerHeight * 0.8]);
    document.body.style.overflow = 'hidden';
  };

  const hidePanelHandle = () => {
    setShowPanel(false);
    document.body.style.overflow = '';
  };

  const themeVars = {
    '--rv-floating-panel-z-index': 1001, // 面板堆叠显示优先级
    '--rv-floating-panel-background-color': 'rgba(var(--background), 0.8)', // 背景颜色
    '--rv-floating-panel-header-background-color': 'var(--rv-background)', // 头部背景颜色
    '--rv-floating-panel-header-padding': '8px', // 头部内边距
    '--rv-floating-panel-thumb-background-color': 'var(--rv-gray-5)', // 滑块颜色
    '--rv-floating-panel-thumb-width': '20px', // 滑块宽度
    '--rv-floating-panel-thumb-height': '4px', // 滑块高度
    '--rv-search-background-color': 'var(--background)',
    '--rv-search-content-background-color': 'rgba(var(--foreground), 0.05)',
    '--rv-search-left-icon-color': 'var(--foreground)',
    '--rv-search-label-color': 'var(--foreground)',
    '--rv-search-action-text-color': 'var(--foreground)',
    '--rv-cell-text-color': 'var(--foreground)',
    '--rv-input-text-color': 'var(--foreground)',
    '--rv-input-value-color': 'var(--foreground)',
    '--rv-input-placeholder-color': 'var(--foreground)',
    'rv-text-color': 'var(--foreground)',
  };

  const spring = {
    type: 'spring',
    stiffness: 300,
    damping: 10,
    mass: 0.6,
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

  return isMobile ? (
    <>
      <IconButton
        variant={'ghost'}
        style={{
          position: 'fixed',
          bottom: '2em',
          right: '2em',
          zIndex: 1000,
          backgroundColor: 'rgba(var(--background), 0.8)',
          borderRadius: '5px',
          border: '1px solid rgba(var(--foreground), 0.1)',
        }}
        onClick={showPanelHandle}
      >
        <TableOfContentsIcon />
      </IconButton>
      {showPanel && (
        <>
          <div
            style={{
              position: 'fixed',
              overflow: 'hidden',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1000,
            }}
            onClick={hidePanelHandle}
          />
          <ConfigProvider themeVars={themeVars}>
            <FloatingPanel style={{
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
            }} anchors={anchors}>
              <Search />
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
            </FloatingPanel>
          </ConfigProvider>
        </>
      )}
    </>
  ) : null;
};

export default FloatingTocMobile;
