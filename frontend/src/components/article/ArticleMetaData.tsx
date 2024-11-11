import React from 'react';
import { User, Calendar, Eye, Clock } from 'lucide-react';

interface ArticleMetadataProps {
  authorName: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  readingTime: number;
}

const ArticleMetadata: React.FC<ArticleMetadataProps> = ({ authorName, createdAt, updatedAt, views, readingTime }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
      <div className="flex items-center">
        <User className="w-4 h-4 mr-2" />
        <span>{authorName}</span>
      </div>
      <div className="flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{new Date(createdAt).toLocaleDateString()}</span>
        {createdAt !== updatedAt && (
          <span className="ml-2 text-gray-700 dark:text-gray-300">（更新于 {new Date(updatedAt).toLocaleDateString()}）</span>
        )}
      </div>
      <div className="flex items-center">
        <Eye className="w-4 h-4 mr-2" />
        <span>{views} views</span>
      </div>
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-2" />
        <span> 预计阅读时长 {readingTime} 分钟 </span>
      </div>
    </div>
  );
};

export default ArticleMetadata;
