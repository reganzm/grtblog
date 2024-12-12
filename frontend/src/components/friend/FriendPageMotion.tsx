"use client";

import React from 'react';
import {Grid, Heading, Text} from "@radix-ui/themes";
import {clsx} from "clsx";
import {noto_sans_sc, noto_serif_sc_bold} from "@/app/fonts/font";
import {motion} from "framer-motion";
import FriendCard from "@/components/friend/FriendCard";

const FriendPageMotion = ({friends}: {
    friends: { name: string, url: string, logo: string, description: string }[]
}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 40}}
            animate={{opacity: 1, y: 0}}
            transition={{type: 'spring', stiffness: 100, damping: 30, mass: 0.5}}
        >
            <Heading size="8" align="center" className={clsx(noto_sans_sc.className, 'mt-6')}>
                亲爱的朋友们
            </Heading>
            <Text size="5" align="center" className={clsx(noto_serif_sc_bold.className, 'mt-2 mb-12 block')}>
                青山一道同云雨，明月何曾是两乡。
            </Text>
            <motion.div
                variants={{
                    hidden: {opacity: 0},
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
                initial="hidden"
                animate="show"
            >
                <Grid columns={{initial: '1', sm: '2', md: '3'}} gap="4">
                    {friends.map((friend, index) => (
                        <FriendCard key={index} {...friend} />
                    ))}
                </Grid>
            </motion.div>
        </motion.div>
    );
};

export default FriendPageMotion;
