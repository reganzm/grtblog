import type {Metadata} from 'next';
import React from 'react';
import {Container} from '@radix-ui/themes';

export const metadata: Metadata = {
    title: '记录',
    description: '记录生活中的点点滴滴。',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container size={'4'} style={{
            padding: '0 20px',
        }}>
            {children}
        </Container>
    );
}
