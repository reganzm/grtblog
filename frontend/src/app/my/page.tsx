import React from 'react';
import {Container} from "@radix-ui/themes";
import LoginUserInformation from "@/app/my/LoginUserInformation";

const LoginUserHome = async () => {
    return (
        <Container>
            <LoginUserInformation/>
        </Container>
    );
};

export default LoginUserHome;
