import {
  NavMenuBatchUpdateDTO,
  NavMenuDTO,
  NavMenuVO,
} from '@/services/nav/typings';
import { ApiResponse } from '@/services/typings';
import { request } from '@umijs/max';

export const getNavMenus = async (): Promise<ApiResponse<NavMenuVO[]>> => {
  return request('/api/v1/nav', {
    method: 'GET',
  });
};

export const createNavMenu = async (data: NavMenuDTO) => {
  return request('/api/v1/nav', {
    method: 'POST',
    data,
  });
};

export const updateNavMenu = async (id: number, data: NavMenuDTO) => {
  return request(`/api/v1/nav/${id}`, {
    method: 'PUT',
    data,
  });
};

export const deleteNavMenu = async (id: number) => {
  return request(`/api/v1/nav/${id}`, {
    method: 'DELETE',
  });
};

export const batchUpdateNavMenus = async (data: NavMenuBatchUpdateDTO[]) => {
  return request('/api/v1/nav/batch', {
    method: 'PUT',
    data,
  });
};

export default {
  getNavMenus,
  createNavMenu,
  updateNavMenu,
  deleteNavMenu,
  batchUpdateNavMenus,
};
