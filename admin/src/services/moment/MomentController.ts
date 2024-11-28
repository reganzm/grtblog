import {
  AddMomentApiParams,
  AddMomentApiRes,
  MomentVO,
} from '@/services/moment/typings';
import { ApiResponse } from '@/services/typings';
import { request } from '@umijs/max';

const addMoment = async (
  data: AddMomentApiParams,
): Promise<AddMomentApiRes> => {
  return request('/api/v1/admin/statusUpdate', {
    method: 'POST',
    data,
  });
};

const getMomentList = async ({
  page = 1,
  pageSize = 10,
}: {
  page: number;
  pageSize: number;
}): Promise<ApiResponse<MomentVO[]>> => {
  return request(
    `/api/v1/admin/statusUpdate/all?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
    },
  );
};

const deleteMoment = async (id: string): Promise<ApiResponse<null>> => {
  return request(`/api/v1/admin/statusUpdate/${id}`, {
    method: 'DELETE',
  });
};

const getMomentDetail = async (id: string): Promise<ApiResponse<MomentVO>> => {
  return request(`/api/v1/admin/statusUpdate/${id}`, {
    method: 'GET',
  });
};

const editMoment = async (
  id: string,
  data: AddMomentApiParams,
): Promise<AddMomentApiRes> => {
  return request(`/api/v1/admin/statusUpdate/${id}`, {
    method: 'PATCH',
    data,
  });
};

const editMomentStatus = async (
  id: string,
  data: any,
): Promise<AddMomentApiRes> => {
  return request(`/api/v1/admin/statusUpdate/toggle/${id}`, {
    method: 'PATCH',
    data,
  });
};

export default {
  addMoment,
  getMomentList,
  deleteMoment,
  getMomentDetail,
  editMoment,
  editMomentStatus,
};
