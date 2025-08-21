import { create } from 'zustand';

type Theme = 'light' | 'dark';
type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface UIState {
  isSidebarOpen: boolean;
  theme: Theme;
  toasts: Toast[];
  toggleSidebar: () => void;
  toggleTheme: () => void;
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  theme: 'light',
  toasts: [],

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  addToast: (message, type, duration = 5000) =>
    set((state) => {
      const id = Date.now().toString();
      const newToast = { id, message, type, duration };
      
      // Auto-remove toast after duration
      if (duration > 0) {
        setTimeout(() => {
          useUIStore.getState().removeToast(id);
        }, duration);
      }

      return {
        toasts: [...state.toasts, newToast],
      };
    }),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  clearToasts: () => set({ toasts: [] }),
}));
