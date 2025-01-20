"use client";

import React, {useEffect, useState} from 'react';
import {IconButton} from "@radix-ui/themes";
import {Cross1Icon} from "@radix-ui/react-icons";
import channel from "@/utils/channel";

interface UpdateNotification {
    content: string;
    publishAt: string;
}

const UpdateNotification = () => {
    const [notification, setNotification] = useState<UpdateNotification>({
        content: '',
        publishAt: '',
    });
    const [show, setShow] = useState(false);
    const [elapsedTime, setElapsedTime] = useState('');

    useEffect(() => {
        let timer: NodeJS.Timeout;
        channel.port1.onmessage = (event) => {
            console.log(event);
            const res = event.data;
            if (res) {
                setNotification(res);
                setShow(true);
                timer = setTimeout(() => setShow(false), 10000);
            }
        };

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const calculateElapsedTime = () => {
            const timeParsed = new Date(notification.publishAt);
            const now = new Date();
            const timeDifference = Math.abs(now.getTime() - timeParsed.getTime());

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            let elapsedTime = '';
            if (days > 0) elapsedTime += days + " 天 ";
            if (hours > 0) elapsedTime += hours + " 小时 ";
            if (minutes > 0) elapsedTime += minutes + " 分钟 ";
            if (seconds > 0) elapsedTime += seconds + " 秒";
            elapsedTime += "前";

            setElapsedTime(elapsedTime);
        };

        calculateElapsedTime();
        const interval = setInterval(calculateElapsedTime, 1000);

        return () => clearInterval(interval);
    }, [notification.publishAt]);

    return (
        <div className="flex" style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            background: 'rgba(var(--background), 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(var(--foreground), 0.2)',
            padding: '20px 10px 20px 25px',
            borderRadius: '5px',
            color: 'var(--text)',
            boxShadow: '0 0 10px 0 rgba(var(--foreground), 0.1)',
            width: '400px',
            transform: show ? 'translateX(0)' : 'translateX(450px)',
            transition: 'transform 0.3s ease-in-out',
        }}>
            <div className="flex flex-col flex-1">
                <div className="flex justify-between">
                    <div className="font-bold mb-2"> 更新通知</div>
                    <div className="text-[0.7em] opacity-50"> {elapsedTime} </div>
                </div>
                <div> {notification.content} </div>
            </div>
            <div className="flex items-center justify-center">
                <IconButton onClick={() => setShow(false)} variant="ghost">
                    <Cross1Icon height="16"/>
                </IconButton>
            </div>
        </div>
    );
};

export default UpdateNotification;
