import { request } from '@umijs/max';
import { AddArticleApiParams, AddArticleApiRes } from '@/services/article/typings';

const addArticle = async (data: AddArticleApiParams): Promise<AddArticleApiRes> => {
  return request('/api/admin/article', {
    method: 'POST',
    data,
  });
};

export default {
  addArticle,
};
