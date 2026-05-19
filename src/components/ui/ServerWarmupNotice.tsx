import { Button } from '@/components/ui/Button';

interface Props {
  isChecking: boolean;
  isWaking: boolean;
  etaSeconds: number;
  nextRetrySeconds: number;
  onRetry: () => void;
}

export function ServerWarmupNotice({ isChecking, isWaking, etaSeconds, nextRetrySeconds, onRetry }: Props) {
  if (!isChecking && !isWaking) return null;

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4 text-slate-800 dark:border-amber-900/50 dark:from-amber-950/30 dark:to-orange-950/20 dark:text-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{isChecking ? 'Checking server status...' : 'Waking up backend server'}</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            {isChecking
              ? 'Please wait while we verify API availability.'
              : `Render free tier can sleep. Estimated ready time: ~${etaSeconds}s`}
          </p>
          {isWaking && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Next auto retry in {nextRetrySeconds}s</p>}
        </div>
        {isWaking && (
          <Button variant="secondary" className="shrink-0" onClick={onRetry}>
            Retry now
          </Button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-amber-100 dark:bg-amber-900/30">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-amber-500" />
      </div>
    </div>
  );
}
