import { apiClient } from '@/api/client';
import type { Lead, LeadFilters, LeadListResponse } from '@/types/lead';

function toQuery(filters: LeadFilters): Record<string, string | number> {
  return {
    ...(filters.status !== 'all' ? { status: filters.status } : {}),
    ...(filters.source !== 'all' ? { source: filters.source } : {}),
    ...(filters.search.trim() ? { search: filters.search.trim() } : {}),
    sort: filters.sort,
    page: filters.page,
    limit: filters.pageSize,
  };
}

export async function getLeads(filters: LeadFilters): Promise<LeadListResponse> {
  const { data } = await apiClient.get<LeadListResponse>('/leads', { params: toQuery(filters) });
  return data;
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const { data } = await apiClient.get<Lead>(`/leads/${id}`);
  return data;
}

export async function createLead(payload: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
  const { data } = await apiClient.post<Lead>('/leads', payload);
  return data;
}

export async function updateLead(id: string, payload: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
  const { data } = await apiClient.put<Lead>(`/leads/${id}`, payload);
  return data;
}

export async function deleteLead(id: string): Promise<void> {
  await apiClient.delete(`/leads/${id}`);
}

export async function getLeadsForExport(filters: LeadFilters): Promise<Lead[]> {
  const { data } = await apiClient.get<LeadListResponse>('/leads', { params: { ...toQuery({ ...filters, page: 1, pageSize: 10000 }) } });
  return data.data;
}
