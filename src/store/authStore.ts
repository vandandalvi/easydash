import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login, register } from '@/api/auth.service';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import type { LoginPayload, RegisterPayload, User } from '@/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  loginAction: (payload: LoginPayload) => Promise<void>;
  registerAction: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loginAction: async (payload) => {
        const response = await login(payload);
        localStorage.setItem(STORAGE_KEYS.token, response.token);
        set({ user: response.user, token: response.token });
      },
      registerAction: async (payload) => {
        const response = await register(payload);
        localStorage.setItem(STORAGE_KEYS.token, response.token);
        set({ user: response.user, token: response.token });
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEYS.token);
        set({ user: null, token: null });
      },
    }),
    { name: STORAGE_KEYS.user },
  ),
);
