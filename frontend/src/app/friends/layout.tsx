import React from 'react';
import {Container} from '@radix-ui/themes';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: '亲爱的朋友们',
    description: '青山一道同云雨，明月何曾是两乡。',
};

const FriendPageLayout = ({
                              children,
                          }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <Container size={'3'}>
                {children}
            </Container>
        </div>
    );
};

export default FriendPageLayout;
