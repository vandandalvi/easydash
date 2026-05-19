import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Loader } from '@/components/ui/Loader';
import { useLeadQuery } from '@/hooks/useLeads';

export function LeadDetailsPage() {
  const { leadId = '' } = useParams();
  const { data, isLoading } = useLeadQuery(leadId);

  if (isLoading) return <div className="grid place-items-center py-20"><Loader /></div>;
  if (!data) return <EmptyState title="Lead not found" description="The lead may have been removed." />;

  return (
    <div className="max-w-2xl">
      <Link to="/dashboard">
        <Button variant="ghost" className="mb-6 -ml-3 gap-1">
          <ChevronLeft size={18} />
          Back to leads
        </Button>
      </Link>

      <div className="rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{data.name}</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{data.email}</p>
          </div>
          <Badge
            label={data.status}
            tone={data.status === 'lost' ? 'danger' : data.status === 'qualified' ? 'success' : 'default'}
          />
        </div>

        <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Source</p>
              <p className="mt-2 text-base font-medium text-slate-900 dark:text-white">{data.source}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Created</p>
              <p className="mt-2 text-base font-medium text-slate-900 dark:text-white">{new Date(data.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
