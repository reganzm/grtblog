"use client";

import React, {useEffect} from 'react';
import {useAppSelector} from "@/redux/hooks";
import {Theme, Box, Flex, Text, Avatar, Card, Button, Dialog, TextField} from '@radix-ui/themes';
import {format} from 'date-fns';
import {UserInfo} from "@/redux/userSlice";
import {updateNickname} from "@/api/user";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

const LoginUserInformation = () => {
    const router = useRouter();
    const user = useAppSelector(state => state.user);
    const userInfo: UserInfo = user.userInfo;
    const [newNickname, setNewNickname] = React.useState<string>("");

    const nicknameUpdateHandle = (newNickname: string) => {
        updateNickname(newNickname).then((res) => {
            if (res) {
                toast('昵称更新成功', {type: 'success'});
            } else {
                toast('昵称更新失败', {type: 'error'});
            }
            router.refresh();
        })
    }

    useEffect(() => {
        if (!user.isLogin) {
            location.href = '/';
        }
    }, [user.isLogin]);

    return (
        <Theme accentColor="cyan" grayColor="sand" radius="large" scaling="95%">
            <div className="flex justify-center mb-8">
                <Text size="2" color="gray"> 当前登录用户信息 </Text>
            </div>
            <Card className="p-6 max-w-md mx-auto">
                {userInfo ? (
                    <Flex direction="column" gap="4">
                        <Flex align="center" gap="4">
                            <Avatar
                                size="5"
                                src={userInfo.avatar ?? undefined}
                                fallback={userInfo.nickname?.[0]?.toUpperCase() || 'U'}
                                radius="full"
                            />
                            <Box className={"flex flex-col"}>
                                <div className={"flex justify-center"}>
                                    <Text size="5" weight="bold">{userInfo.nickname}</Text>
                                    <div className="ml-4">
                                        <Dialog.Root>
                                            <Dialog.Trigger>
                                                <Button size="2" color="gray" variant="ghost">
                                                    更新全站昵称
                                                </Button>
                                            </Dialog.Trigger>

                                            <Dialog.Content maxWidth="450px">
                                                <Dialog.Title> 更新昵称 </Dialog.Title>
                                                <Dialog.Description size="2" mb="4">
                                                    这将会修改您在全站的显示昵称
                                                </Dialog.Description>

                                                <Flex direction="column" gap="3">
                                                    <label>
                                                        <Text as="div" size="2" mb="1" weight="bold">
                                                            新昵称
                                                        </Text>
                                                        <TextField.Root
                                                            defaultValue={userInfo.nickname}
                                                            placeholder="取一个新的昵称叭"
                                                            onChange={(e) => setNewNickname(e.target.value)}
                                                        />
                                                    </label>
                                                </Flex>

                                                <Flex gap="3" mt="4" justify="end">
                                                    <Dialog.Close>
                                                        <Button variant="soft" color="gray">
                                                            Cancel
                                                        </Button>
                                                    </Dialog.Close>
                                                    <Button onClick={() => {
                                                        nicknameUpdateHandle(newNickname);
                                                    }}>Save</Button>
                                                </Flex>
                                            </Dialog.Content>
                                        </Dialog.Root>
                                    </div>
                                </div>
                                <Text size="2" color="gray">{userInfo.email}</Text>
                            </Box>
                        </Flex>

                        <Text size="2" color="gray">
                            <Text size="3" weight="bold"> 加入于: </Text>
                            {userInfo.createdAt ? format(new Date(userInfo.createdAt), 'yyyy年MM月dd日') : 'Unknown'}
                        </Text>

                        <Box>
                            <Text size="3" weight="bold"> 注册方式:</Text>
                            <Text
                                size="2">{userInfo.oauthProvider ? `OAuth (${userInfo.oauthProvider})` : '本站注册'}</Text>
                        </Box>

                        <Box>
                            <Text size="3" weight="bold">User ID:</Text>
                            <Text size="2">{userInfo.id}</Text>
                        </Box>
                    </Flex>
                ) : (
                    <Text>Loading user information...</Text>
                )}
            </Card>
        </Theme>
    );
};

export default LoginUserInformation;

