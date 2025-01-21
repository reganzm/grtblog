import React from 'react';
import ArticleInlineLinkClient from "@/components/article/ArticleInlineLinkClient";

type SiteInfo = {
    icon: string;
    name: string;
    title: string;
    subtitle: string;
};

const API_URL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

async function fetchSiteInfo(url: string): Promise<SiteInfo | null> {
    console.log(url);
    const response = await fetch(`${API_URL}/api/fetchSiteInfo?url=${encodeURIComponent(url)}`, {
        next: {revalidate: 60},
    });
    if (!response.ok) {
        return null;
    }
    return await response.json();
}

const ArticleInlineLink = async ({linkTitle, linkUrl}: {
    linkTitle: string;
    linkUrl: string;
}) => {
    const siteInfo = await fetchSiteInfo(linkUrl) ?? undefined;
    return (
        <ArticleInlineLinkClient linkTitle={linkTitle} linkUrl={linkUrl} siteInfo={siteInfo}/>
    );
}

export default ArticleInlineLink;
