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
  return request('/api/v1/admin/article', {
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
  return request(
    `/api/v1/admin/article/all?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
    },
  );
};

const deleteArticle = async (id: string): Promise<ApiResponse<null>> => {
  return request(`/api/v1/admin/article/${id}`, {
    method: 'DELETE',
  });
};

const getArticleDetail = async (
  id: string,
): Promise<ApiResponse<ArticleVO>> => {
  return request(`/api/v1/admin/article/${id}`, {
    method: 'GET',
  });
};

const editArticle = async (
  id: string,
  data: AddArticleApiParams,
): Promise<AddArticleApiRes> => {
  return request(`/api/v1/admin/article/${id}`, {
    method: 'PATCH',
    data,
  });
};

const toggleArticle = async (
  id: string,
  data: any,
): Promise<AddArticleApiRes> => {
  return request(`/api/v1/admin/article/toggle/${id}`, {
    method: 'PATCH',
    data,
  });
};

const importArticle = async (file: any): Promise<AddArticleApiRes> => {
  const formData = new FormData();
  formData.append('file', file);
  return request(`/api/v1/admin/article/import`, {
    method: 'POST',
    data: formData,
  });
};

export default {
  addArticle,
  getArticleList,
  deleteArticle,
  getArticleDetail,
  editArticle,
  toggleArticle,
  importArticle,
};
