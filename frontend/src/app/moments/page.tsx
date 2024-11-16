// 'use client';
//
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Avatar, Card, Button } from '@radix-ui/themes';
// import { Heart, MessageCircle, Share2, Eye, ArrowRight } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
//
// interface Moment {
//   id: number;
//   title: string;
//   summary: string;
//   authorId: number;
//   authorName: string;
//   authorAvatar: string;
//   images: string[];
//   views: number;
//   likes: number;
//   comments: number;
//   createdAt: string;
//   isTop: boolean;
//   isHot: boolean;
//   isOriginal: boolean;
// }
//
// const generateMockData = (count: number): Moment[] => {
//   return Array.from({ length: count }, (_, i) => ({
//     id: i + 1,
//     title: `Moment ${i + 1}`,
//     summary: `This is a summary of moment ${i + 1}. It provides a brief overview of the content.`,
//     authorId: Math.floor(Math.random() * 1000),
//     authorName: `User ${Math.floor(Math.random() * 100)}`,
//     authorAvatar: `/placeholder.svg?height=40&width=40`,
//     images: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => `/placeholder.svg?height=200&width=300&text=Image${j + 1}`),
//     views: Math.floor(Math.random() * 1000),
//     likes: Math.floor(Math.random() * 100),
//     comments: Math.floor(Math.random() * 20),
//     createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleString(),
//     isTop: Math.random() < 0.1,
//     isHot: Math.random() < 0.2,
//     isOriginal: Math.random() < 0.8,
//   }));
// };
//
// export default function AllMomentPage() {
//   const [moments, setMoments] = useState<Moment[]>([]);
//   const [page, setPage] = useState(1);
//
//   useEffect(() => {
//     const newMoments = generateMockData(5);
//     setMoments(prevMoments => [...prevMoments, ...newMoments]);
//   }, [page]);
//
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
//       setPage(prevPage => prevPage + 1);
//     };
//
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
//
//   return (
//     <div className="container mx-auto p-4 max-w-2xl">
//       <motion.div
//         className="relative"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />
//         {moments.map((moment, index) => (
//           <motion.div
//             key={moment.id}
//             className="mb-8 flex justify-between items-center w-full"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <Card className="w-full max-w-md z-10 bg-white dark:bg-gray-800 p-8">
//               <div className="flex flex-row items-center gap-4">
//                 <Avatar src={moment.authorAvatar} alt={moment.authorName}
//                         fallback={moment.authorName[0]}
//                 />
//                 <div className="flex-grow">
//                   <div className="text-lg">{moment.authorName}</div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">{moment.createdAt}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   {moment.isTop && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded"> 置顶 </span>}
//                   {moment.isHot && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded"> 热门 </span>}
//                   {moment.isOriginal &&
//                     <span className="bg-green-500 text-white text-xs px-2 py-1 rounded"> 原创 </span>}
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold mb-2">{moment.title}</h3>
//                 <p className="text-gray-700 dark:text-gray-300 mb-4">{moment.summary}</p>
//                 <div className="grid grid-cols-2 gap-2 mb-4">
//                   {moment.images.slice(0, 2).map((image, imgIndex) => (
//                     <div key={imgIndex} className="relative aspect-video">
//                       <Image
//                         src={image}
//                         alt={`Image ${imgIndex + 1} for ${moment.title}`}
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded"
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex justify-between items-center mt-4 text-gray-500 dark:text-gray-400">
//                   <div className="flex gap-4">
//                     <span className="flex items-center gap-1"><Eye size={16} /> {moment.views}</span>
//                     <span className="flex items-center gap-1"><Heart size={16} /> {moment.likes}</span>
//                     <span className="flex items-center gap-1"><MessageCircle size={16} /> {moment.comments}</span>
//                     <span className="flex items-center gap-1"><Share2 size={16} /></span>
//                   </div>
//                   <Link href={`/moment/${moment.id}`} passHref>
//                     <Button variant="ghost" size="3" className="text-primary">
//                       查看详情 <ArrowRight className="ml-2 h-4 w-4" />
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </Card>
//             <div className="absolute left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2" />
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

import React from 'react';

const Page = () => {
  return (
    <div>

    </div>
  );
};

export default Page;
