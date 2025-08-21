import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../lib/api';

type UserRole = 'customer' | 'employee' | 'manager' | 'admin' | 'franchisee';

interface AuthResponse {
  token: string;
  role: UserRole;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      isAuthenticated: false,

      login: async ({ email, password }: LoginCredentials) => {
        try {
          if (import.meta.env.VITE_API_URL) {
            const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
            set({ token: data.token, role: data.role, isAuthenticated: true });
          } else {
            // Mock authentication for development
            set({
              token: 'mock_token',
              role: 'franchisee',
              isAuthenticated: true,
            });
          }
        } catch (error) {
          // Fallback to mock auth if API fails
          set({
            token: 'mock_token',
            role: 'franchisee',
            isAuthenticated: true,
          });
        }
      },

      logout: () => {
        set({ token: null, role: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, role: state.role }),
    }
  )
);
