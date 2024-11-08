'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Eye } from 'lucide-react';
import { ArticlePreview } from '@/types';

export default function RecommendCard({ item }: { item: ArticlePreview }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-60">
        {item.cover ? (
          <div className="relative h-48">
            <Image
              src={item.cover}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
        ) : (
          <div className="bg-card-foreground h-0 w-0" />
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">{item.title}</h2>
          <p className="text-muted-foreground mb-4 line-clamp-3">{item.summary}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Image
                src={item.avatar}
                alt={item.authorName}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span>{item.authorName}</span>
            </div>
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="bg-muted p-4 flex justify-between items-center text-sm">
          <motion.div whileHover={{ scale: 1.1 }}>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{item.likes}</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{item.comments}</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{item.views}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
