import * as Papa from 'papaparse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as leadsService from '@/api/leads.service';
import type { Lead, LeadFilters } from '@/types/lead';

const LEADS_QUERY_KEY = 'leads';

export function useLeadsQuery(filters: LeadFilters) {
  return useQuery({ queryKey: [LEADS_QUERY_KEY, filters], queryFn: () => leadsService.getLeads(filters) });
}

export function useLeadQuery(id: string) {
  return useQuery({ queryKey: [LEADS_QUERY_KEY, id], queryFn: () => leadsService.getLeadById(id), enabled: Boolean(id) });
}

export function useLeadMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [LEADS_QUERY_KEY] });
  return {
    createMutation: useMutation({ mutationFn: leadsService.createLead, onSuccess: invalidate }),
    updateMutation: useMutation({
      mutationFn: ({ id, lead }: { id: string; lead: Omit<Lead, 'id' | 'createdAt'> }) => leadsService.updateLead(id, lead),
      onSuccess: invalidate,
    }),
    deleteMutation: useMutation({ mutationFn: leadsService.deleteLead, onSuccess: invalidate }),
  };
}

export async function downloadLeadsCsv(filters: LeadFilters): Promise<void> {
  const leads = await leadsService.getLeadsForExport(filters);
  const csv = Papa.unparse(
    leads.map((lead) => ({
      Name: lead.name,
      Email: lead.email,
      Status: lead.status,
      Source: lead.source,
      CreatedAt: new Date(lead.createdAt).toLocaleString(),
    })),
  );
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
