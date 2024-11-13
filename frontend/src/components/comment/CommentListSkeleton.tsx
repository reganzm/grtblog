'use client';

import React from 'react';
import styles from '@/styles/comment/CommentList.module.scss';
import { Avatar, Skeleton, Text } from '@radix-ui/themes';
import { GlobeIcon } from '@radix-ui/react-icons';

const CommentListSkeleton = () => {
  return (
    <ul className={styles.commentList}>
      {[...Array(4)].map((_, index) => (
        <li key={index} className={styles.commentItem}>
          <div className={styles.commentHeader}>
            <Skeleton>
              <Avatar className={styles.commentAvatar} fallback={'0'} />
            </Skeleton>
            <Skeleton style={{
              borderRadius: '6px',
            }}>
              <div className={styles.commentUserName}> grtsinry43</div>
            </Skeleton>
            <Skeleton>
              <GlobeIcon className={styles.commentWebsite} />
            </Skeleton>
          </div>
          <Skeleton style={{
            borderRadius: '6px',
          }}>
            <Text className={styles.commentContent}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />
              Ad aut consectetur cupiditate earum impedit<br />
            </Text>
          </Skeleton>
        </li>
      ))}
    </ul>
  );
};

export default CommentListSkeleton;
