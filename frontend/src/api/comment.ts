import { request } from '@/api/request';

export const addNewComment = async (notLoginComment: {
  articleId: string,
  content: string,
  userName: string,
  email: string,
  website: string,
  parentId: string
}) => {
  return request('/comment', {
    method: 'POST',
    body: JSON.stringify(notLoginComment),
  });
};

export const getComments = async (articleId: string) => {
  return request(`/comment/article/${articleId}`);
};
