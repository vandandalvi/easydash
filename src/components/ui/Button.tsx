import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        size === 'sm' && 'px-2 py-1 text-xs',
        size === 'md' && 'px-3 py-2 text-sm',
        size === 'lg' && 'px-4 py-3 text-base',
        variant === 'primary' && 'bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-white',
        variant === 'secondary' && 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:focus-visible:ring-slate-600',
        variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 dark:hover:bg-red-700',
        variant === 'ghost' && 'text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-600',
        className,
      )}
      {...props}
    />
  );
}
