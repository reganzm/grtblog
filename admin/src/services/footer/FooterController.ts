// services/footer.ts
import { FooterSection } from '@/services/footer/typings';
import { ApiResponse } from '@/services/typings';
import { request } from '@umijs/max';

export async function queryFooterSections() {
  return request<ApiResponse<FooterSection[]>>('/api/v1/footer/all');
}

export async function updateFooterSection(params: FooterSection) {
  return request<ApiResponse<FooterSection>>(
    `/api/v1/footer/${params.id}`,
    {
      method: 'PUT',
      data: params,
    },
  );
}

export async function addFooterSection(params: FooterSection) {
  return request<ApiResponse<FooterSection>>('/api/v1/footer', {
    method: 'POST',
    data: params,
  });
}

export async function removeFooterSection(params: { id: number }) {
  return request<ApiResponse<void>>(`/api/v1/footer/${params.id}`, {
    method: 'DELETE',
  });
}
