import {
  AddPageApiParams,
  AddPageApiRes,
  PageVO,
} from '@/services/page/typings';
import { ApiResponse } from '@/services/typings';
import { request } from '@umijs/max';

const addPage = async (data: AddPageApiParams): Promise<AddPageApiRes> => {
  return request('/api/admin/page', {
    method: 'POST',
    data,
  });
};

const getPageList = async ({
  page = 1,
  pageSize = 10,
}: {
  page: number;
  pageSize: number;
}): Promise<ApiResponse<PageVO[]>> => {
  return request(`/api/admin/page/all?page=${page}&pageSize=${pageSize}`, {
    method: 'GET',
  });
};

const deletePage = async (id: string): Promise<ApiResponse<null>> => {
  return request(`/api/admin/page/${id}`, {
    method: 'DELETE',
  });
};

const getPageDetail = async (id: string): Promise<ApiResponse<PageVO>> => {
  return request(`/api/admin/page/${id}`, {
    method: 'GET',
  });
};

const editPage = async (
  id: string,
  data: AddPageApiRes,
): Promise<AddPageApiRes> => {
  return request(`/api/admin/page/${id}`, {
    method: 'PATCH',
    data,
  });
};

export default {
  addPage,
  getPageList,
  deletePage,
  getPageDetail,
  editPage,
};
