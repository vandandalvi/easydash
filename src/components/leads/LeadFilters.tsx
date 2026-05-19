import { LEAD_SOURCES, LEAD_STATUSES } from '@/constants/leads';
import type { LeadFilters as LeadFiltersType } from '@/types/lead';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface Props {
  filters: LeadFiltersType;
  onChange: (next: Partial<LeadFiltersType>) => void;
}

export function LeadFilters({ filters, onChange }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Input label="Search" placeholder="Name or email" value={filters.search} onChange={(e) => onChange({ search: e.target.value, page: 1 })} />
      <Select
        label="Status"
        value={filters.status}
        onChange={(e) => onChange({ status: e.target.value as LeadFiltersType['status'], page: 1 })}
        options={[{ label: 'All', value: 'all' }, ...LEAD_STATUSES.map((s) => ({ label: s, value: s }))]}
      />
      <Select
        label="Source"
        value={filters.source}
        onChange={(e) => onChange({ source: e.target.value as LeadFiltersType['source'], page: 1 })}
        options={[{ label: 'All', value: 'all' }, ...LEAD_SOURCES.map((s) => ({ label: s, value: s }))]}
      />
      <Select
        label="Sort"
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value as LeadFiltersType['sort'], page: 1 })}
        options={[
          { label: 'Latest', value: 'latest' },
          { label: 'Oldest', value: 'oldest' },
        ]}
      />
    </div>
  );
}
