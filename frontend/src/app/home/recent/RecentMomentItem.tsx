import React, { useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import styles from '@/styles/home/RecentMomentItem.module.scss';
import Link from 'next/link';
import { clsx } from 'clsx';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { varela_round } from '@/app/fonts/font';

type StatusUpdate = {
  id: string;
  title: string;
  createdAt: string;
}

const RecentMomentItem: React.FC<{ statusUpdate: StatusUpdate }> = ({ statusUpdate }) => {
  const day = format(parseISO(statusUpdate.createdAt), 'dd', { locale: zhCN });
  const monthYear = format(parseISO(statusUpdate.createdAt), 'yyyy.MM', { locale: zhCN });
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
    <Link href={`/moments/${statusUpdate.id}`}>
      <div
        ref={cardRef}
        className={styles.itemCard}
        onMouseMove={handleMouseMove}
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        } as React.CSSProperties}
      >
        <div className={styles.dateContainer}>
          <div className={clsx(styles.day, varela_round.className)}>{day}</div>
          <div className={clsx(styles.monthYear, varela_round.className)}>{monthYear}</div>
        </div>

        <div className={styles.itemTitle}>
          <span className={styles.underlineAnimation}>{statusUpdate.title}</span>
        </div>
        <ArrowRightIcon className={styles.arrowIcon} />
      </div>
    </Link>
  );
};

export default RecentMomentItem;
