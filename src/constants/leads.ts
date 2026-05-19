import type { LeadSource, LeadStatus } from '@/types/lead';

export const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'lost'];
export const LEAD_SOURCES: LeadSource[] = ['website', 'instagram', 'referral'];
