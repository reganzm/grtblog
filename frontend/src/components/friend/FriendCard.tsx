'use client';

import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Card, Flex, Avatar, Box, Text, Link } from '@radix-ui/themes';
import { article_font, noto_sans_sc } from '@/app/fonts/font';

interface FriendCardProps {
  name: string;
  url: string;
  logo: string;
  description: string;
}

const FriendCard: React.FC<FriendCardProps> = ({ name, url, logo, description }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = React.useCallback(
    ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card
        size="2"
        style={{ position: 'relative', overflow: 'hidden', margin: '0.5em' }}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(var(--accent-9), 0.15),
                transparent 80%
              )
            `,
            zIndex: 1,
          }}
        />
        <Link href={url} target="_blank" rel="noopener noreferrer">
          <Flex align="center" gap="3" className={article_font.className} style={{ position: 'relative', zIndex: 2 }}>
            <Avatar size="5" src={logo} fallback={name[0]} radius="full" />
            <Box>
              <Text as="div" size="3" weight="bold" className={noto_sans_sc.className}>
                {name}
              </Text>
              <Text as="div" size="2" color="gray">
                {description}
              </Text>
            </Box>
          </Flex>
        </Link>
      </Card>
    </motion.div>
  );
};

export default FriendCard;
