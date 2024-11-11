'use client';

import React, { useState } from 'react';
import { FloatingPanel, Search } from 'react-vant';
import 'react-vant/lib/index.css';
import '@vant/touch-emulator';
import { IconButton } from '@radix-ui/themes';
import { TocItem } from '@/components/article/Toc';
import { TableOfContentsIcon } from 'lucide-react';
import useIsMobile from '@/hooks/useIsMobile';

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
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1000,
            }}
            onClick={hidePanelHandle}
          />
          <FloatingPanel style={{
            overflow: 'hidden',
          }} anchors={anchors}>
            <Search />
            <ul style={{
              overflow: 'hidden',
              padding: '20px',
            }}>
              {toc.length > 0 && toc.map((item, index) => (
                <li key={index} style={{ marginLeft: `${(item.level - 2) * 20}px`, marginBottom: '5px' }}>
                  <a href={`#${item.anchor}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          </FloatingPanel>
        </>
      )}
    </>
  ) : null;
};

export default FloatingTocMobile;
