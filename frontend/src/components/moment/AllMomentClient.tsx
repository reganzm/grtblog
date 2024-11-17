'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getAllSharesByPage } from '@/api/share';
import MomentCardItem from '@/components/moment/MomentCardItem';
import { Moment } from '@/types';
import { Skeleton, Text } from '@radix-ui/themes';
import { motion } from 'framer-motion';

const AllMomentClient = ({ initialMoments }: { initialMoments: Moment[] }) => {
  const [moments, setMoments] = useState<Moment[]>(initialMoments);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialMoments.length > 0);
  const observer = useRef<IntersectionObserver>(null);

  const lastMomentElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setLoading(true);
        getAllSharesByPage(page + 1, 5)
          .then(newMoments => {
            setMoments(prevMoments => [...prevMoments, ...newMoments]);
            setPage(prevPage => prevPage + 1);
            setHasMore(newMoments.length > 0);
            setLoading(false);
          });
      }
    });

    if (lastMomentElementRef.current) {
      observer.current.observe(lastMomentElementRef.current);
    }
  }, [loading, hasMore, page]);

  return (
    <div>
      <div className="container mx-auto p-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />
            {moments.map((moment, index) => {
              if (moments.length === index + 1) {
                return (
                  <motion.div
                    ref={lastMomentElementRef}
                    key={moment.shortUrl}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 100 }}
                  >
                    <MomentCardItem moment={moment} index={index} />
                  </motion.div>
                );
              } else {
                return (
                  <motion.div
                    key={moment.shortUrl}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                  >
                    <MomentCardItem moment={moment} index={index} />
                  </motion.div>
                );
              }
            })}
          </div>
        </motion.div>
        {loading && (
          <Skeleton>
            <div className="flex items-center gap-2">
              <Text as="div" className="w-16 h-16 rounded-full" />
              <div className="flex-1">
                <Text as="div" className="h-4 w-1/2" />
                <Text as="div" className="h-4 w-3/4" />
                <Text as="div" className="h-4 w-1/4" />
              </div>
            </div>
          </Skeleton>
        )}
        {!hasMore && (
          <div className="text-center text-gray-500 text-sm mt-2"> 没有更多啦，不小心让你翻到底了欸 〃•ω‹〃</div>
        )}
      </div>
    </div>
  );
};

export default AllMomentClient;
