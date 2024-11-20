import {
  AddArticleApiParams,
  AddArticleApiRes,
  ArticleVO,
} from '@/services/article/typings';
import { ApiResponse } from '@/services/typings';
import { request } from '@umijs/max';

const addArticle = async (
  data: AddArticleApiParams,
): Promise<AddArticleApiRes> => {
  return request('/api/admin/article', {
    method: 'POST',
    data,
  });
};

const getArticleList = async ({
  page = 1,
  pageSize = 10,
}: {
  page: number;
  pageSize: number;
}): Promise<ApiResponse<ArticleVO[]>> => {
  return request(`/api/admin/article/all?page=${page}&pageSize=${pageSize}`, {
    method: 'GET',
  });
};

const deleteArticle = async (id: string): Promise<ApiResponse<null>> => {
  return request(`/api/admin/article/${id}`, {
    method: 'DELETE',
  });
};

const getArticleDetail = async (
  id: string,
): Promise<ApiResponse<ArticleVO>> => {
  return request(`/api/admin/article/${id}`, {
    method: 'GET',
  });
};

const editArticle = async (
  id: string,
  data: AddArticleApiParams,
): Promise<AddArticleApiRes> => {
  return request(`/api/admin/article/${id}`, {
    method: 'PATCH',
    data,
  });
};

export default {
  addArticle,
  getArticleList,
  deleteArticle,
  getArticleDetail,
  editArticle,
};
