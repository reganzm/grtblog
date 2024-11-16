import React from 'react';
import { Container } from '@radix-ui/themes';

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
