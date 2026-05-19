import type { ReactNode } from 'react';

interface Props {
  headers: string[];
  children: ReactNode;
}

export function Table({ headers, children }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
      <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
        <thead className="sticky top-0 border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-5 py-3 font-semibold text-slate-900 dark:text-white">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {children}
        </tbody>
      </table>
    </div>
  );
}
