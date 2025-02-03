import { request } from './request';

export function getFooterLinks(options = {}) {
    return request('/footer/all', options);
}

/**
 * FooterSection
 */
export interface FooterSection {
    id: number;
    links: Map<string, FooterLink>[];
    title: string;
}

/**
 * FooterLink
 */
export interface FooterLink {
    text: string;
    url: string;
}
