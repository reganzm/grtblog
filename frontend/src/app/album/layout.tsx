import type {Metadata} from 'next';
import React from 'react';
import {Container} from '@radix-ui/themes';

export const metadata: Metadata = {
    title: '相册',
    description: '每一个精彩的瞬间，都值得被记录。',
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
