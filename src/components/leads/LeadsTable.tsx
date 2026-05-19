import { Link } from 'react-router-dom';
import type { UserRole } from '@/types/auth';
import type { Lead } from '@/types/lead';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';

interface Props {
  leads: Lead[];
  role: UserRole;
  userId?: string;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export function LeadsTable({ leads, role, userId, onEdit, onDelete }: Props) {
  return (
    <Table headers={['Name', 'Email', 'Status', 'Source', 'Created', 'Actions']}>
      {leads.map((lead) => {
        const canDelete = role === 'admin' || (role === 'sales' && lead.createdById === userId);
        return (
          <tr key={lead.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
            <td className="px-5 py-4 font-medium">
              <Link to={`/dashboard/leads/${lead.id}`} className="text-slate-900 hover:text-slate-600 dark:text-white dark:hover:text-slate-300">
                {lead.name}
              </Link>
            </td>
            <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{lead.email}</td>
            <td className="px-5 py-4">
              <Badge label={lead.status} tone={lead.status === 'lost' ? 'danger' : lead.status === 'qualified' ? 'success' : 'default'} />
            </td>
            <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{lead.source}</td>
            <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
            <td className="px-5 py-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => onEdit(lead)} className="h-8 px-2 text-xs">
                  Edit
                </Button>
                {canDelete && (
                  <Button variant="danger" size="sm" onClick={() => onDelete(lead)} className="h-8 px-2 text-xs">
                    Delete
                  </Button>
                )}
              </div>
            </td>
          </tr>
        );
      })}
    </Table>
  );
}
