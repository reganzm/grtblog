import type {Metadata} from 'next';
import React from 'react';
import {Container} from '@radix-ui/themes';

export const metadata: Metadata = {
    title: '文章',
    description: '这是所有文章，与你分享我的所思所想。',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container size={'4'} style={{
            padding: '0 20px',
            scrollBehavior: 'smooth',
        }}>
            {children}
        </Container>
    );
}
