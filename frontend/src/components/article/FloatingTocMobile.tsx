'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FloatingPanel, Search, ConfigProvider } from 'react-vant';
import 'react-vant/lib/index.css';
import '@vant/touch-emulator';
import { IconButton } from '@radix-ui/themes';
import { TocItem } from '@/components/article/Toc';
import { TableOfContentsIcon } from 'lucide-react';
import useIsMobile from '@/hooks/useIsMobile';
import { motion } from 'framer-motion';
import emitter from '@/utils/eventBus';

const FloatingTocMobile = ({ toc }: { toc: TocItem[] }) => {
  const isMobile = useIsMobile();
  const [anchors, setAnchors] = useState([0, 0, 0]);
  const [showPanel, setShowPanel] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

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
    '--rv-floating-panel-z-index': 1001,
    '--rv-floating-panel-background-color': 'rgba(var(--background), 0.8)',
    '--rv-floating-panel-header-background-color': 'var(--rv-background)',
    '--rv-floating-panel-header-padding': '8px',
    '--rv-floating-panel-thumb-background-color': 'var(--rv-gray-5)',
    '--rv-floating-panel-thumb-width': '20px',
    '--rv-floating-panel-thumb-height': '4px',
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
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: spring },
  };

  const debounce = useCallback((func: (...args: unknown[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: unknown[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  const getDoms = useCallback((items: TocItem[]): HTMLElement[] => {
    const doms: HTMLElement[] = [];
    const addToDoms = (items: TocItem[]) => {
      for (const item of items) {
        const dom = document.getElementById(item.anchor);
        if (dom) {
          doms.push(dom);
        }
        if (item.children && item.children.length) {
          addToDoms(item.children);
        }
      }
    };
    addToDoms(items);
    return doms;
  }, []);

  const doms = getDoms(toc);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const range = window.innerHeight;
      let newActiveAnchor = '';
      for (const dom of doms) {
        if (!dom) continue;
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          newActiveAnchor = dom.id;
          break;
        } else if (top > range) {
          break;
        } else {
          newActiveAnchor = dom.id;
        }
      }
      if (newActiveAnchor !== activeAnchor) {
        setActiveAnchor(newActiveAnchor);
      }
    }, 50);

    emitter.on('scroll', handleScroll);
    return () => {
      emitter.off('scroll', handleScroll);
    };
  }, [doms, activeAnchor, debounce]);

  const renderTocItems = (items: TocItem[]) => {
    return items.map((item, index) => (
      <motion.div
        key={index}
        style={{ marginLeft: `${(item.level - 2) * 20}px`, margin: '5px' }}
        variants={itemVariants}
        layout
      >
        <li className={item.anchor === activeAnchor ? 'font-semibold text-primary' : 'font-normal'}>
          <a href={`#${item.anchor}`}>{item.name}</a>
        </li>
        {item.children && item.children.length > 0 && (
          <ul>
            {renderTocItems(item.children)}
          </ul>
        )}
      </motion.div>
    ));
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
                {toc.length > 0 && renderTocItems(toc)}
              </motion.ul>
            </FloatingPanel>
          </ConfigProvider>
        </>
      )}
    </>
  ) : null;
};

export default FloatingTocMobile;
