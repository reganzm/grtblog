'use client';

import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Button, TextField} from '@radix-ui/themes';
import styles from '@/styles/LoginModal.module.scss';
import {CloseIcon} from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import {clsx} from 'clsx';
import {varela_round, noto_sans_sc} from '@/app/fonts/font';
import {useAppSelector} from "@/redux/hooks";
import {applyFriendLink} from "@/api/friends";
// import {useAppDispatch} from '@/redux/hooks';
// import {applyFriendLink} from '@/api/friendLink';

const FriendLinkApplyModal = ({isOpen, onClose}: { isOpen: boolean; onClose: () => void }) => {
    const [form, setForm] = useState({
        siteName: '',
        siteUrl: '',
        siteDescription: '',
        avatarUrl: '',
    });
    const [error, setError] = useState('');

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.siteName || !form.siteUrl || !form.siteDescription || !form.avatarUrl) {
            setError('请填写所有必填字段');
            return;
        }
        applyFriendLink({
            name: form.siteName,
            url: form.siteUrl,
            logo: form.avatarUrl,
            description: form.siteDescription
        }).then((res) => {
            if (!res) {
                setError('申请失败，请稍后重试');
            } else {
                onClose();
            }
        });
    };

    const isLogin = useAppSelector((state) => state.user.isLogin);

    useEffect(() => {
        if (!isLogin) {
            setError('请先登录后再申请友链哦');
        }
    }, [isLogin]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.modalOverlay}>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            initial={{scale: 0.8, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.8, opacity: 0}}
                        >
                            <div className={styles.modalContent}>
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                }}>
                                    <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                                        <Button variant="ghost" onClick={onClose}>
                                            <CloseIcon/>
                                        </Button>
                                    </motion.div>
                                </div>
                                <h2 className={clsx(styles.title, varela_round.className)}>
                                    <span className={noto_sans_sc.className}> 申请友链 </span>
                                </h2>
                                <span className={clsx('text-sm block font-bold')}> 愿岁并谢，与长友兮 </span>
                                <form
                                    style={{
                                        marginTop: '1rem',
                                        width: '100%',
                                    }}
                                    onSubmit={submitForm}>
                                    {error && (
                                        <div className={styles.error}>{error}</div>
                                    )}
                                    <div className={styles.formGroup}>
                                        <div className={styles.label}> 网站名称</div>
                                        <TextField.Root
                                            className={styles.textField}
                                            value={form.siteName}
                                            onChange={(e) => setForm({...form, siteName: e.target.value})}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <div className={styles.label}> 网站 URL</div>
                                        <TextField.Root
                                            className={styles.textField}
                                            value={form.siteUrl}
                                            onChange={(e) => setForm({...form, siteUrl: e.target.value})}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <div className={styles.label}> 网站描述</div>
                                        <TextField.Root
                                            className={styles.textField}
                                            value={form.siteDescription}
                                            onChange={(e) => setForm({...form, siteDescription: e.target.value})}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <div className={styles.label}> 头像 URL</div>
                                        <TextField.Root
                                            className={styles.textField}
                                            value={form.avatarUrl}
                                            onChange={(e) => setForm({...form, avatarUrl: e.target.value})}
                                        />
                                    </div>
                                    <div className={styles.formActions}>
                                        <Button style={{marginRight: '1rem'}} type="submit">
                                            提交申请
                                        </Button>
                                        <Button variant="soft" onClick={onClose}>
                                            取消
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FriendLinkApplyModal;
