import React from 'react';
import {Container} from "@radix-ui/themes";
import LoginUserInformation from "@/app/my/LoginUserInformation";
import FloatingMenu from "@/components/menu/FloatingMenu";

const LoginUserHome = async () => {
    return (
        <Container>
            <LoginUserInformation/>
            <FloatingMenu items={[]}/>
        </Container>
    );
};

export default LoginUserHome;
