export interface FriendLinkVO {
    id: string;
    name: string;
    url: string;
    logo: string;
    description: string;
    userId: string;
    isActive: boolean;
    createdAt: string; // LocalDateTime is represented as string in TypeScript
    updatedAt: string;
    deletedAt?: string; // Optional field
}

export interface FriendLinkView {
    id: string;
    name: string;
    url: string;
    logo: string;
    description: string;
}

export interface FriendLinkRequest {
    name: string;
    url: string;
    logo: string;
    description: string;
}
