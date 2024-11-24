"use client";

import React, {createContext, useContext} from 'react';
import {WebsiteInfo} from '@/types';

const WebsiteInfoContext = createContext<WebsiteInfo | null>(null);

export const WebsiteInfoProvider = ({children, websiteInfo}: {
    children: React.ReactNode,
    websiteInfo: WebsiteInfo
}) => {
    return (
        <WebsiteInfoContext.Provider value={websiteInfo}>
            {children}
        </WebsiteInfoContext.Provider>
    );
};

export const useWebsiteInfo = () => {
    const context = useContext(WebsiteInfoContext);
    if (!context) {
        throw new Error('useWebsiteInfo must be used within a WebsiteInfoProvider');
    }
    return context;
};
