"use client";

import React, {useEffect} from 'react';
import {io} from "socket.io-client";
import {useDispatch} from "react-redux";

const SocketOnlineCount = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const socket = io('http://localhost:9092');
        socket.on('connect', () => {
            console.log('socket connected');
        });

        socket.on('onlineCount', (count: number) => {
            dispatch({type: 'onlineCount/updateOnlineCount', payload: count});
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);
    return (
        <div>

        </div>
    );
};

export default SocketOnlineCount;
