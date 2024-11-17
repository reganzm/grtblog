'use client';

import React from 'react';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { article_font } from '@/app/fonts/font';
import { FileText, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { CombinedItem } from '@/app/archives/page';
import Link from 'next/link';
import "@/styles/LinkAnimate.scss";

const ArchiveItem = ({ item, index }: { item: CombinedItem, index: number }) => {
  return (
    <motion.div
      key={`${item.type}-${item.shortUrl}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative pl-8">
        <div className="absolute left-0 top-2 w-3 h-3 bg-primary rounded-full" />
        <div className="absolute left-[5px] top-5 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        <div className="flex justify-between gap-4 items-center">
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">
              {format(new Date(item.createdAt), 'MM-dd')}
            </div>
            <h3 className={clsx(article_font.className, 'text-lg font-medium flex items-center')}>
              {item.type === 'article' ? (
                <FileText className="mr-2 text-blue-500" size={16} />
              ) : (
                <MessageCircle className="mr-2 text-green-500" size={16} />
              )}
              <Link href={item.type === 'article' ? `/posts/${item.shortUrl}` : `/moments/${item.shortUrl}`}
                    className="transition-colors duration-300 underlineAnimation glowAnimation">
                {item.title}
              </Link>
            </h3>
          </div>
          <div className={clsx(
            'text-sm px-2 py-1 rounded',
            item.type === 'article' ? 'bg-blue-100 text-blue-800 dark:bg-opacity-50 dark:bg-blue-900 dark:text-blue-100'
              : 'bg-green-100 text-green-800  dark:bg-opacity-50 dark:bg-green-900 dark:text-green-100',
          )}>
            {item.type === 'article' ? '文章' : '记录'} / {item.category}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArchiveItem;
