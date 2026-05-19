import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';

export function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-200 bg-white px-6 py-3 dark:border-slate-700 dark:bg-slate-900 md:w-64 md:border-b-0 md:border-r md:px-4 md:py-6">
      <nav className="flex gap-2 md:grid md:gap-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(
              'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
            )
          }
        >
          Leads
        </NavLink>
      </nav>
    </aside>
  );
}
