import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';

const POLL_INTERVAL_SECONDS = 6;
const ESTIMATED_WAKEUP_SECONDS = 45;

type WarmupState = 'checking' | 'waking' | 'ready';

export function useBackendWarmup() {
  const [state, setState] = useState<WarmupState>('checking');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [nextRetryAt, setNextRetryAt] = useState<number | null>(null);

  const healthUrl = useMemo(() => {
    const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';
    return `${base.replace(/\/$/, '')}/health`;
  }, []);

  const pingBackend = useCallback(async () => {
    try {
      await axios.get(healthUrl, { timeout: 8000 });
      setState('ready');
      setStartedAt(null);
      setNextRetryAt(null);
    } catch {
      const ts = Date.now();
      setState('waking');
      setStartedAt((prev) => prev ?? ts);
      setNextRetryAt(ts + POLL_INTERVAL_SECONDS * 1000);
    }
  }, [healthUrl]);

  useEffect(() => {
    void pingBackend();
  }, [pingBackend]);

  useEffect(() => {
    if (state !== 'waking') return;
    const poll = window.setInterval(() => void pingBackend(), POLL_INTERVAL_SECONDS * 1000);
    return () => window.clearInterval(poll);
  }, [pingBackend, state]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const elapsed = startedAt ? Math.floor((now - startedAt) / 1000) : 0;
  const etaSeconds = Math.max(0, ESTIMATED_WAKEUP_SECONDS - elapsed);
  const nextRetrySeconds = nextRetryAt ? Math.max(0, Math.ceil((nextRetryAt - now) / 1000)) : 0;

  return {
    isReady: state === 'ready',
    isChecking: state === 'checking',
    isWaking: state === 'waking',
    etaSeconds,
    nextRetrySeconds,
    retryNow: () => void pingBackend(),
  };
}
