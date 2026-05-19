import type { ReactNode } from 'react';

interface Props {
  title: string;
  value: string | number;
  description?: string;
  right?: ReactNode;
}

export function Card({ title, value, description, right }: Props) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
        {right}
      </div>
      <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{value}</p>
      {description && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{description}</p>}
    </article>
  );
}
