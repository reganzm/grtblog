import React, { useState, useRef } from 'react';
import styles from '@/styles/home/RecentArticleItem.module.scss';
import { clsx } from 'clsx';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import Link from 'next/link';
import { Article } from '@/types';


const RecentArticleItem: React.FC<{ article: Article }> = ({ article }) => {
  const formattedDate = formatDistanceToNow(parseISO(article.createdAt), { addSuffix: true, locale: zhCN });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  return (
    <Link href={`/posts/${article.id}`}>
      <div
        ref={cardRef}
        className={styles.itemCard}
        onMouseMove={handleMouseMove}
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        } as React.CSSProperties}
      >
        <div className={clsx(styles.itemTitle)}>
          <span className={styles.underlineAnimation}>{article.title}</span>
        </div>
        <span className={styles.date}>{formattedDate}</span>
        <ArrowRightIcon className={styles.arrowIcon} />
      </div>
    </Link>
  );
};

export default RecentArticleItem;
