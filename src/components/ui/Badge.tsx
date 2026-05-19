import { cn } from '@/utils/cn';

interface Props {
  label: string;
  tone?: 'default' | 'success' | 'warning' | 'danger';
}

export function Badge({ label, tone = 'default' }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
        tone === 'default' && 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
        tone === 'success' && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
        tone === 'warning' && 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
        tone === 'danger' && 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
      )}
    >
      {label}
    </span>
  );
}
