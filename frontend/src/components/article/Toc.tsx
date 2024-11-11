'use client';

import React from 'react';
import useIsMobile from '@/hooks/useIsMobile';

export type TocItem = {
  level: number;
  text: string;
  anchor: string;
};

const Toc = ({ toc }: { toc: TocItem[] }) => {
  const isMobile = useIsMobile();
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
      <ul>
        {toc.length > 0 && toc.map((item, index) => (
          <li key={index} style={{ marginLeft: `${(item.level - 2) * 20}px`, marginBottom: '5px' }}>
            <a href={`#${item.anchor}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toc;
