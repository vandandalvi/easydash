import type { Lead } from '@/types/lead';
import type { User } from '@/types/auth';

export const seedUsers: User[] = [
  { id: crypto.randomUUID(), name: 'Admin User', email: 'admin@smartleads.com', role: 'admin' },
  { id: crypto.randomUUID(), name: 'Sales User', email: 'sales@smartleads.com', role: 'sales' },
];

const now = Date.now();
export const seedLeads: Lead[] = Array.from({ length: 36 }).map((_, index) => {
  const sources = ['website', 'instagram', 'referral'] as const;
  const statuses = ['new', 'contacted', 'qualified', 'lost'] as const;
  const id = index + 1;
  return {
    id: crypto.randomUUID(),
    name: `Lead ${id}`,
    email: `lead${id}@mail.com`,
    source: sources[index % sources.length],
    status: statuses[index % statuses.length],
    createdAt: new Date(now - index * 1000 * 60 * 60 * 6).toISOString(),
  };
});
