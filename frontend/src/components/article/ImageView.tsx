'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

// 这是个什么效果？
// 通过计算图片的四个角的平均颜色，然后设置一个阴影效果，这样图片就会有一个光晕的效果（更和谐）

export default function ImageView({ src, alt }: { src: string; alt: string }) {
  const [glowColor, setGlowColor] = useState('rgba(var(--foreground), 0.3)');
  const imgRef = useRef<HTMLImageElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // 组件挂载时更新状态
    return () => setIsMounted(false); // 组件卸载时更新状态
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img || !isMounted) return; // 只有在挂载时才执行

    const handleLoad = () => {

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

      try {
        const edgeColors = [
          ctx.getImageData(0, 0, 1, 1).data,
          ctx.getImageData(img.naturalWidth - 1, 0, 1, 1).data,
          ctx.getImageData(0, img.naturalHeight - 1, 1, 1).data,
          ctx.getImageData(img.naturalWidth - 1, img.naturalHeight - 1, 1, 1).data,
        ];

        const averageColor = edgeColors.reduce((acc, color) => {
          return acc.map((v, i) => v + color[i]);
        }, [0, 0, 0, 0]).map(v => Math.round(v / edgeColors.length));

        setGlowColor(`rgba(${averageColor[0]}, ${averageColor[1]}, ${averageColor[2]}, 0.5)`);
      } catch (e) {
        console.error('CORS error or image data not accessible', e);
      }
    };

    img.addEventListener('load', handleLoad);
    // 这里如果是重新挂载的话，需要在这里手动调用一次 handleLoad
    if (img.complete) handleLoad();
    return () => img.removeEventListener('load', handleLoad);
  }, [src, isMounted]); // 依赖于 src 和 isMounted

  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      width={700}
      height={400}
      style={{
        margin: '2em auto',
        objectFit: 'cover',
        borderRadius: '10px',
        filter: `drop-shadow(0 0 10px ${glowColor})`,
        transition: 'filter 0.3s ease-in-out',
      }}
      priority
      crossOrigin="anonymous"
    />
  );
}
