import {request} from '@umijs/max';
import {AddArticleApiParams, AddArticleApiRes, ArticleVO} from '@/services/article/typings';
import {ApiResponse} from '@/services/typings';

const addArticle = async (data: AddArticleApiParams): Promise<AddArticleApiRes> => {
    return request('/api/admin/article', {
        method: 'POST',
        data,
    });
};

const getArticleList = async ({page = 1, pageSize = 10}: {
    page: number;
    pageSize: number
}): Promise<ApiResponse<ArticleVO[]>> => {
    return request(`/api/admin/article/all?page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
    });
};

const deleteArticle = async (id: number): Promise<ApiResponse<null>> => {
    return request(`/api/admin/article/${id}`, {
        method: 'DELETE',
    });
}

export default {
    addArticle,
    getArticleList,
    deleteArticle,
};
