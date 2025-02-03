"use client"

import React, {useEffect, Suspense} from "react"
import {useState} from "react"
import {useSearchParams, useRouter} from "next/navigation"
import * as Form from "@radix-ui/react-form"
import {EyeOpenIcon, EyeClosedIcon} from "@radix-ui/react-icons"
import {resetPassword} from "@/api/user";

function PasswordResetFormContent() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            console.error("缺少 token")
            // 重定向到登录页面
            router.push("/")
        }
    }, [router, token]);

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (newPassword !== confirmPassword) {
            setError("两次输入的密码不匹配")
            return
        } else if (token === null) {
            setError("缺少 token")
            return
        }
        resetPassword(token, newPassword).then((res) => {
            if (res) {
                console.log("密码重置成功")
                router.push("/")
            }
        })
        console.log("密码重置已提交", {token, newPassword})
    }

    return (
        <div className="flex items-center justify-center" style={{
            height: "100%",
        }}>
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <Form.Root onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold"> 重置密码 </h1>
                        <p className="text-sm text-gray-500"> 请在下方输入您的新密码 </p>
                    </div>

                    <Form.Field name="newPassword" className="space-y-2">
                        <Form.Label className="text-sm font-medium text-gray-700"> 新密码 </Form.Label>
                        <div className="relative">
                            <Form.Control asChild>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </Form.Control>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeClosedIcon/> : <EyeOpenIcon/>}
                            </button>
                        </div>
                        <Form.Message match="valueMissing" className="text-sm text-red-500">
                            请输入新密码
                        </Form.Message>
                    </Form.Field>

                    <Form.Field name="confirmPassword" className="space-y-2">
                        <Form.Label className="text-sm font-medium text-gray-700"> 确认密码 </Form.Label>
                        <Form.Control asChild>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </Form.Control>
                        <Form.Message match="valueMissing" className="text-sm text-red-500">
                            请确认您的新密码
                        </Form.Message>
                    </Form.Field>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <Form.Submit asChild>
                        <button
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            重置密码
                        </button>
                    </Form.Submit>
                </Form.Root>
            </div>
        </div>
    )
}

export default function PasswordResetForm() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PasswordResetFormContent/>
        </Suspense>
    )
}
