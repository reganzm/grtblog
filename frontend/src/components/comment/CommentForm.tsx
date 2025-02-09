'use client';

import React, {useEffect, useRef, useState} from 'react';
import {addNewComment, addNewCommentLogin} from '@/api/comment';
import {Button, Flex, TextArea, TextField, DropdownMenu, Avatar, IconButton} from '@radix-ui/themes';
import styles from '@/styles/comment/CommentForm.module.scss';
// import {clsx} from 'clsx';
import emitter from "@/utils/eventBus";
import EmojiPicker from "emoji-picker-react";
import {useAppSelector} from "@/redux/hooks";
import {useTheme} from "next-themes";
import {PickerConfigInternal} from "emoji-picker-react/src/config/config";
import {toast} from "react-toastify";
import {Smiley} from "@phosphor-icons/react";
import {BiPaperPlane} from "react-icons/bi";

const CommentForm = ({id, parentId}: { id: string, parentId?: string }) => {
    const [form, setForm] = useState({
        content: '',
        userName: '',
        email: '',
        website: '',
    });
    const user = useAppSelector(state => state.user);
    const [isLogin, setIsLogin] = useState(false);
    const isDark = useTheme().theme === 'dark';

    const phrases = [
        "看到你的评论我会很开心哒~",
        "期待你的评论哦~",
        "快来评论吧~",
        "宫廷玉液酒，评论走一走~",
        "你的评论对我很重要~",
        "我家的键盘会自己写评论你信不信鸭~",
        "老板，这评论区能涮火锅吗？",
        "您的好友【野生评论】已上线",
        "垂死病中惊坐起，评论竟无你踪迹",
        "确认过眼神，是还没评论的人",
        "在？看看评论？",
        "评论千万条，走心第一条",
        "这评论区凉得能种企鹅了（瑟瑟发抖）",
        "您的互联网嘴替正在待机中...",
        "别逼我跪下来求评论（滑跪.gif）",
        "苟评论，勿相忘（抱拳）",
        "这条要是火了你就是老粉！",
    ];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    useEffect(() => {
        setIsLogin(user.isLogin);
    }, [user.isLogin]);

    useEffect(() => {
        setForm({
            content: '',
            userName: localStorage.getItem('userName') || '',
            email: localStorage.getItem('email') || '',
            website: localStorage.getItem('website') || '',
        });
    }, []);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // const rippleRef = useRef<HTMLSpanElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLogin) {
            addNewComment({
                areaId: id,
                content: form.content,
                userName: form.userName,
                email: form.email,
                website: form.website,
                parentId: parentId || '',
            }).then((res) => {
                if (res) {
                    toast('评论成功', {type: 'success'});
                    // 使用事件总线触发评论列表的刷新
                    emitter.emit('refreshCommentList');
                }
            });
        } else {
            addNewCommentLogin({
                areaId: id,
                content: form.content,
                parentId: parentId || '',
            }).then((res) => {
                if (res) {
                    toast('评论成功', {type: 'success'});
                    // 使用事件总线触发评论列表的刷新
                    emitter.emit('refreshCommentList');
                }
            });
        }
        setForm({...form, content: ''});
    };

    // const handleRipple = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    //     if (textareaRef.current && rippleRef.current) {
    //         const textarea = textareaRef.current;
    //         const ripple = rippleRef.current;
    //         const rect = textarea.getBoundingClientRect();
    //
    //         const size = Math.max(textarea.clientWidth, textarea.clientHeight);
    //         ripple.style.width = ripple.style.height = `${size * 2}px`;
    //         ripple.style.left = `${e.clientX - rect.left - size}px`;
    //         ripple.style.top = `${e.clientY - rect.top - size}px`;
    //
    //         ripple.classList.remove(styles.animateRipple);
    //         void ripple.offsetWidth; // 触发强制重绘，使得动画可以重新播放
    //         ripple.classList.add(styles.animateRipple);
    //     }
    // };

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 40}px`;
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {/*{*/}
            {/*    !isLogin && <span> 登录之后评论体验更好哦 ~</span>*/}
            {/*}*/}
            {
                !isLogin &&
                <Flex direction="row" gap="4" className={styles.flex}>
                    <TextField.Root
                        value={form.userName}
                        required={true}
                        style={{
                            backgroundColor: 'rgba(var(--foreground), 0.03)',
                            flex: '1',
                            boxShadow: 'none',
                            minHeight: '2rem',
                            border: '1px solid rgba(var(--foreground), 0.1)',
                            borderBottom: '1px solid rgba(var(--foreground), 0.5)',
                            outline: 'none',
                        }}
                        onChange={(e) => {
                            setForm({...form, userName: e.target.value})
                            localStorage.setItem('userName', e.target.value);
                        }}
                        placeholder="昵称(*)"
                    />
                    <TextField.Root
                        value={form.email}
                        required={true}
                        style={{
                            backgroundColor: 'rgba(var(--foreground), 0.03)',
                            flex: '1',
                            minHeight: '2rem',
                            boxShadow: 'none',
                            border: '1px solid rgba(var(--foreground), 0.1)',
                            borderBottom: '1px solid rgba(var(--foreground), 0.5)',
                            outline: 'none',
                        }}
                        onChange={(e) => {
                            setForm({...form, email: e.target.value})
                            localStorage.setItem('email', e.target.value);
                        }}
                        placeholder="邮箱(*)"
                    />
                    <TextField.Root
                        value={form.website}
                        style={{
                            backgroundColor: 'rgba(var(--foreground), 0.03)',
                            flex: '1',
                            boxShadow: 'none',
                            minHeight: '2rem',
                            border: '1px solid rgba(var(--foreground), 0.1)',
                            borderBottom: '1px solid rgba(var(--foreground), 0.5)',
                            outline: 'none',
                        }}
                        onChange={(e) => {
                            setForm({...form, website: e.target.value})
                            localStorage.setItem('website', e.target.value);
                        }}
                        placeholder="网站"
                    />
                </Flex>
            }
            <div className="flex">
                {
                    isLogin && (
                        <Avatar className="mr-4" src={user.userInfo.avatar || ''}
                                fallback={user.userInfo.nickname?.[0]?.toUpperCase() || 'U'}/>
                    )
                }
                <div className={"relative w-full"}>
                    <TextArea
                        required={true}
                        variant={'soft'}
                        ref={textareaRef}
                        className=""
                        style={{
                            backgroundColor: 'rgba(var(--foreground), 0.03)',
                            flex: '1',
                            minHeight: '8rem',
                            boxShadow: 'none',
                            position: 'relative',
                            border: '1px solid rgba(var(--foreground), 0.1)',
                            borderBottom: '1px solid rgba(var(--foreground), 0.5)',
                            outline: 'none',
                        }}
                        value={form.content}
                        onChange={(e) => {
                            if (e.target.value.length <= 3000) {
                                setForm({...form, content: e.target.value});
                            }
                        }}
                        onInput={handleInput}
                        // onMouseDown={handleRipple}
                        placeholder={randomPhrase}
                    />
                    <div className="flex justify-between p-4 absolute bottom-0 w-full">
                        <div className={"text-[0.7em] opacity-70 flex self-end"}>
                            <span className="mr-4"> 支持 Markdown 语法 </span>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <IconButton variant={'ghost'} size="4" style={{
                                        color: 'var(--foreground)',
                                    }} >
                                        <Smiley width={16} height={16}/>
                                    </IconButton>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <EmojiPicker
                                        theme={isDark ? 'dark' as PickerConfigInternal['theme']
                                            : 'light' as PickerConfigInternal['theme']}
                                        onEmojiClick={(e) => {
                                            setForm({...form, content: form.content + e.emoji});
                                        }}/>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            <span className="ml-4"> {form.content.length} / 3000 </span>
                        </div>
                        <Button style={{
                            borderRadius: '0.5rem',
                        }} type="submit" variant={"soft"}><BiPaperPlane/> 发送 </Button>
                    </div>
                    {/*<span*/}
                    {/*    ref={rippleRef}*/}
                    {/*    className={clsx(styles.ripple, 'absolute rounded-full bg-gray-400 opacity-30 pointer-events-none')}*/}
                    {/*/>*/}
                </div>
            </div>
        </form>
    );
};

export default CommentForm;
