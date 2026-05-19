import type { Lead } from '@/types/lead';
import { Card } from '@/components/ui/Card';

interface Props {
  leads: Lead[];
}

export function LeadStats({ leads }: Props) {
  const qualified = leads.filter((lead) => lead.status === 'qualified').length;
  const contacted = leads.filter((lead) => lead.status === 'contacted').length;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card title="Total Leads" value={leads.length} />
      <Card title="Qualified" value={qualified} description="High-intent prospects" />
      <Card title="Contacted" value={contacted} description="In active follow-up" />
    </div>
  );
}
