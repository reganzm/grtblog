import { CommentVO } from '@/services/comment/typings';
import { ApiResponse, PagedApiResponse } from '@/services/typings';
import { request } from '@umijs/max';

export const getAllCommentListApi = async (
  areaId: string,
  page: number,
  pageSize: number,
  notRead: boolean,
) => {
  return request('/api/v1/admin/comment/all', {
    method: 'GET',
    params: {
      page: page,
      pageSize: pageSize,
      notRead: notRead,
    },
  });
};

export const getAllCommentAreaListApi = async () => {
  return request('/api/v1/admin/comment/allArea', {
    method: 'GET',
  });
};

export const getCommentByAreaIdApi = async (
  areaId: string,
  page: number,
  pageSize: number,
  notRead: boolean,
): Promise<PagedApiResponse<CommentVO[]>> => {
  return request(`/api/v1/admin/comment/${areaId}`, {
    method: 'GET',
    params: {
      page: page,
      pageSize: pageSize,
      notRead: notRead,
    },
  });
};

export const deleteCommentApi = async (
  id: string,
): Promise<ApiResponse<string>> => {
  return request(`/api/v1/admin/comment/${id}`, {
    method: 'DELETE',
  });
};

export const topCommentApi = async (
  id: string,
): Promise<ApiResponse<string>> => {
  return request(`/api/v1/admin/comment/top/${id}`, {
    method: 'PATCH',
  });
};

export const markCommentAsReadApi = async (
  id: string,
): Promise<ApiResponse<string>> => {
  return request(`/api/v1/admin/comment/read/${id}`, {
    method: 'PATCH',
  });
};

export const addNewCommentApi = async (
  areaId: string,
  content: string,
  parentId: string,
) => {
  return request('/api/v1/comment/add', {
    method: 'POST',
    data: {
      areaId,
      content,
      parentId,
    },
  });
};

export default {
  getAllCommentListApi,
  getAllCommentAreaListApi,
  getCommentByAreaIdApi,
  deleteCommentApi,
  topCommentApi,
  markCommentAsReadApi,
  addNewCommentApi,
};
