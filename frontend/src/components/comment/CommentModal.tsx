'use client'

import {X} from 'lucide-react'
import {Button, Flex, Dialog, ScrollArea} from "@radix-ui/themes"
import * as React from 'react';
import CommentArea from "@/components/comment/CommentArea";

interface CommentModalProps {
    isOpen: boolean
    onClose: () => void
    commentId: string
}

function CommentModal({isOpen = false, onClose, commentId}: CommentModalProps) {
    const [shake, setShake] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setShake(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, shake]);

    return (
        <Dialog.Root open={isOpen} onOpenChange={() => setShake(true)}>
            <Dialog.Content className={shake ? 'shake' : ''} style={{
                maxWidth: '1000px',
                background: 'rgba(var(--background), 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '7px',
            }}>
                <Dialog.Title>
                    <Flex justify="between" align="center">
                        评论
                        <Button variant="ghost" onClick={onClose}>
                            <X/>
                        </Button>
                    </Flex>
                </Dialog.Title>
                <ScrollArea style={{
                    maxHeight: 'calc(100vh - 300px)',
                }}>
                    <CommentArea id={commentId} isModal={true}/>
                </ScrollArea>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default CommentModal;
