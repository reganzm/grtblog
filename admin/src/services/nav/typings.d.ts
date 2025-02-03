/**
 * NavMenuVO
 */
export interface NavMenuVO {
    children: NavMenuVO[];
    href: string;
    id: number;
    isArticle: boolean;
    name: string;
    parentId: number;
    sort: number;
}

/**
 * NavMenuDTO
 */
export interface NavMenuDTO {
    id: number;
    name: string;
    parentId: number;
    url: string;
}

/**
 * NavMenuBatchUpdateDTO
 */
export interface NavMenuBatchUpdateDTO {
    id: number;
    parentId: number;
    sort: number;
}

