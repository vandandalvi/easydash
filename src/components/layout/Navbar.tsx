import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { darkMode, toggleDarkMode } = useThemeStore();
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-white">Smart Leads</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Dashboard</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">Built by Vandan Dalvi</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={toggleDarkMode} className="h-9 w-9 p-0">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name}</p>
              <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{user?.role}</p>
            </div>
            <Button variant="secondary" onClick={logout} className="text-xs">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
