export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost';
export type LeadSource = 'website' | 'instagram' | 'referral';
export type LeadSort = 'latest' | 'oldest';

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  createdById?: string;
}

export interface LeadFilters {
  status: 'all' | LeadStatus;
  source: 'all' | LeadSource;
  search: string;
  sort: LeadSort;
  page: number;
  pageSize: number;
}

export interface LeadListResponse {
  data: Lead[];
  total: number;
  page: number;
  pages: number;
}
