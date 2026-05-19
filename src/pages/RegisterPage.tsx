import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthForm } from '@/components/forms/AuthForm';
import { Button } from '@/components/ui/Button';
import { ServerWarmupNotice } from '@/components/ui/ServerWarmupNotice';
import { useBackendWarmup } from '@/hooks/useBackendWarmup';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';

export function RegisterPage() {
  const navigate = useNavigate();
  const registerAction = useAuthStore((state) => state.registerAction);
  const { darkMode, toggleDarkMode } = useThemeStore();
  const warmup = useBackendWarmup();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <Button variant="ghost" onClick={toggleDarkMode} className="absolute right-4 top-4 h-9 w-9 p-0">
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create account</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Join Smart Leads to start managing leads</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <ServerWarmupNotice
            isChecking={warmup.isChecking}
            isWaking={warmup.isWaking}
            etaSeconds={warmup.etaSeconds}
            nextRetrySeconds={warmup.nextRetrySeconds}
            onRetry={warmup.retryNow}
          />
          <AuthForm
            type="register"
            loading={loading}
            disabled={!warmup.isReady}
            onSubmit={async (values) => {
              if (!warmup.isReady) {
                toast('Backend is waking up. Please wait a few seconds.');
                return;
              }
              try {
                setLoading(true);
                await registerAction({
                  email: values.email,
                  password: values.password,
                  name: values.name ?? '',
                  role: values.role ?? 'sales',
                });
                toast.success('Account created');
                navigate('/dashboard');
              } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Unable to register');
              } finally {
                setLoading(false);
              }
            }}
          />
          <div className="mt-4 rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs text-slate-700 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">Demo Credentials</p>
            <p className="mt-1">Admin: <span className="font-medium">admin@smartleads.com</span> / <span className="font-medium">admin123</span></p>
            <p className="mt-1">Register or use: <span className="font-medium">user@mail.com</span> / <span className="font-medium">user123</span></p>
          </div>
          <div className="mt-6 border-t border-slate-200 pt-6 text-center dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-slate-900 hover:underline dark:text-white">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
