"use client"

import type React from "react"
import {useState} from "react"
import {Theme, Flex, Button, Text} from "@radix-ui/themes"
import * as Form from "@radix-ui/react-form"
import {TextField} from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import styles from "./PasswordResetRequest.module.css"
import {resetPasswordRequest} from "@/api/user";
import {toast} from "react-toastify";

const PasswordResetRequestPage = () => {
    const [email, setEmail] = useState("")
    const [captcha, setCaptcha] = useState("")
    const [captchaRandom, setCaptchaRandom] = useState(Math.random())

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        resetPasswordRequest(captcha, email).then((res) => {
            if (res) {
                toast("重置密码请求已发送，请查看您的邮箱以获取下一步操作", {type: "success"})
            } else {
                toast("重置密码请求发送失败", {type: "error"})
            }
        });
    }

    return (
        <Theme accentColor="blue" grayColor="sand" radius="medium" scaling="95%">
            <div className="mt-8 flex items-center justify-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <Flex direction="column" gap="4" style={{maxWidth: "400px", width: "100%"}}>
                        <Text size="8" weight="bold" align="center" className="mb-4">
                            重置密码
                        </Text>
                        <Form.Root onSubmit={handleSubmit}>
                            <Flex direction="column" gap="3">
                                <div className={styles.formGroup}>
                                    <div className={styles.label}> 电子邮箱</div>
                                    <TextField.Root className={styles.textField}
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="请输入您的邮箱地址"
                                    >
                                    </TextField.Root>
                                </div>

                                <div className={styles.formGroup}>
                                    <div className={styles.label}> 验证码</div>
                                    <TextField.Root className={styles.textField}
                                                    type="text"
                                                    required
                                                    value={captcha}
                                                    onChange={(e) => setCaptcha(e.target.value)}
                                                    placeholder="请输入验证码"
                                    >
                                    </TextField.Root>
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/captcha?${captchaRandom}`}
                                        alt="captcha"
                                        className={styles.captcha}
                                        onClick={() => setCaptchaRandom(Math.random())}
                                    />
                                </div>

                                <Button type="submit"> 提交重置申请 </Button>
                            </Flex>
                        </Form.Root>
                    </Flex>
                </div>
            </div>
        </Theme>
    )
}

export default PasswordResetRequestPage
