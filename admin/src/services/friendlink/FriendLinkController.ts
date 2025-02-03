import { ApiResponse, PagedApiResponse } from '@/services/typings';
import { request } from '@umijs/max';
import {FriendLinkRequest, FriendLinkView, FriendLinkVO} from './typings';

const listAllFriendLinksByPageAdmin = async (page: number, pageSize: number): Promise<PagedApiResponse<FriendLinkVO[]>> => {
    return request(`/api/v1/admin/friendLink/all?page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
    });
};

const addFriendLink = async (data: FriendLinkRequest): Promise<ApiResponse<FriendLinkView>> => {
    return request('/api/v1/admin/friendLink', {
        method: 'POST',
        data,
    });
};

const updateFriendLink = async (id: string, data: FriendLinkRequest): Promise<ApiResponse<FriendLinkView>> => {
    return request(`/api/v1/admin/friendLink/${id}`, {
        method: 'PATCH',
        data,
    });
};

const toggleFriendLink = async (id: string): Promise<ApiResponse<string>> => {
    return request(`/api/v1/admin/friendLink/toggle/${id}`, {
        method: 'PATCH',
    });
};

const deleteFriendLink = async (id: string): Promise<ApiResponse<string>> => {
    return request(`/api/v1/admin/friendLink/${id}`, {
        method: 'DELETE',
    });
};

export default {
    listAllFriendLinksByPageAdmin,
    addFriendLink,
    updateFriendLink,
    toggleFriendLink,
    deleteFriendLink,
};
