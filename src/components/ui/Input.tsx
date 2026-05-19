import type { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ className, label, error, ...props }: Props) {
  return (
    <label className="grid gap-2 text-sm">
      {label && <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>}
      <input
        className={cn(
          'rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus-visible:border-slate-400 focus-visible:ring-1 focus-visible:ring-slate-400 disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus-visible:border-slate-500 dark:focus-visible:ring-slate-500',
          error && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs font-medium text-red-600 dark:text-red-500">{error}</span>}
    </label>
  );
}
