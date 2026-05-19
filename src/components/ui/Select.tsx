import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface Option {
  label: string;
  value: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

export function Select({ label, options, className, ...props }: Props) {
  return (
    <label className="grid gap-2 text-sm">
      {label && <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>}
      <select
        className={cn('rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus-visible:border-slate-400 focus-visible:ring-1 focus-visible:ring-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus-visible:border-slate-500 dark:focus-visible:ring-slate-500', className)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
