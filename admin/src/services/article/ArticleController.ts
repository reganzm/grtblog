import { request } from '@umijs/max';
import { AddArticleApiParams, AddArticleApiRes } from '@/services/article/typings';

const addArticle = async (data: AddArticleApiParams): Promise<AddArticleApiRes> => {
  return request('/api/v1/article', {
    method: 'POST',
    data,
  });
};

export default {
  addArticle,
};
