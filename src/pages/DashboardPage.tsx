import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { LeadForm } from '@/components/forms/LeadForm';
import { LeadFilters } from '@/components/leads/LeadFilters';
import { LeadStats } from '@/components/leads/LeadStats';
import { LeadsTable } from '@/components/leads/LeadsTable';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Loader } from '@/components/ui/Loader';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';
import { useDebounce } from '@/hooks/useDebounce';
import { downloadLeadsCsv, useLeadMutations, useLeadsQuery } from '@/hooks/useLeads';
import { useAuthStore } from '@/store/authStore';
import type { Lead, LeadFilters as LeadFiltersType } from '@/types/lead';

const baseFilters: LeadFiltersType = { status: 'all', source: 'all', search: '', sort: 'latest', page: 1, pageSize: 10 };

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [filters, setFilters] = useState<LeadFiltersType>(baseFilters);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [open, setOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const debouncedSearch = useDebounce(filters.search, 350);
  const debouncedFilters = useMemo(() => ({ ...filters, search: debouncedSearch }), [debouncedSearch, filters]);
  const { data, isLoading, isError } = useLeadsQuery(debouncedFilters);
  const { createMutation, updateMutation, deleteMutation } = useLeadMutations();

  if (isLoading) return <div className="grid place-items-center py-20"><Loader /></div>;
  if (isError) return <EmptyState title="Error" description="Unable to load leads right now." />;

  return (
    <section className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Leads</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage and track your leads</p>
      </div>

      <LeadStats leads={data?.data ?? []} />

      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">All Leads</h2>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={async () => {
                try {
                  await downloadLeadsCsv(debouncedFilters);
                } catch {
                  toast.error('CSV export failed');
                }
              }}
            >
              Export CSV
            </Button>
            <Button
              onClick={() => {
                setSelectedLead(null);
                setFormMode('create');
                setOpen(true);
              }}
            >
              Add Lead
            </Button>
          </div>
        </div>
        <div className="mb-6">
          <LeadFilters filters={filters} onChange={(next) => setFilters((prev) => ({ ...prev, ...next }))} />
        </div>
      </div>

      {data?.total === 0 ? (
        <EmptyState title="No leads found" description="Try changing filters or create a new lead." />
      ) : (
        <div className="grid gap-6">
          <div className="overflow-hidden">
            <LeadsTable
              role={user?.role ?? 'sales'}
              userId={user?.id}
              leads={data?.data ?? []}
              onEdit={(lead) => {
                setSelectedLead(lead);
                setFormMode('edit');
                setOpen(true);
              }}
              onDelete={async (lead) => {
                const canDelete = user?.role === 'admin' || (user?.role === 'sales' && lead.createdById === user?.id);
                if (!canDelete) return;
                try {
                  await deleteMutation.mutateAsync(lead.id);
                  toast.success('Lead deleted');
                } catch {
                  toast.error('Delete failed');
                }
              }}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <Pagination page={filters.page} pages={data?.pages ?? 1} onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))} />
          </div>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={formMode === 'create' ? 'Create Lead' : 'Update Lead'}>
        <LeadForm
          loading={createMutation.isPending || updateMutation.isPending}
          initialValues={selectedLead ? { name: selectedLead.name, email: selectedLead.email, status: selectedLead.status, source: selectedLead.source } : undefined}
          onSubmit={async (lead) => {
            try {
              if (formMode === 'create') {
                await createMutation.mutateAsync(lead);
                toast.success('Lead created');
              } else if (selectedLead) {
                await updateMutation.mutateAsync({ id: selectedLead.id, lead });
                toast.success('Lead updated');
              }
              setOpen(false);
            } catch {
              toast.error('Unable to save lead');
            }
          }}
        />
      </Modal>
    </section>
  );
}
