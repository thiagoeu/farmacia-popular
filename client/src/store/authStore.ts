import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  login as loginService,
  logout as logoutService,
} from '../services/authService';
import api from '../shared/api/api.ts';

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

// Função para normalizar a resposta do backend
const normalizeUserResponse = (data: any): User => {
  // Se o backend retornar { user: { ... } }, extrai o user
  if (data.user && typeof data.user === 'object' && data.user.id) {
    return data.user;
  }
  // Se já for o user diretamente, retorna como está
  return data;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true,

      login: async (email, password) => {
        try {
          const response = await loginService(email, password);
          const { user: userData, access_token, refresh_token } = response;

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);

          // Normaliza a resposta do backend
          const user = normalizeUserResponse(userData);

          set({ user, isAuthenticated: true, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: () => {
        logoutService();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({ user: null, isAuthenticated: false, loading: false });
      },

      loadUser: async () => {
        try {
          const token = localStorage.getItem('access_token');

          if (!token) {
            set({ user: null, isAuthenticated: false, loading: false });
            return;
          }

          set({ loading: true });

          const response = await api.get('/auth/profile');

          // Normaliza a resposta do backend
          const userData = response.data;
          const user = normalizeUserResponse(userData);

          set({ user, isAuthenticated: true, loading: false });
        } catch (err) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      // Migrator para corrigir estruturas antigas
    },
  ),
);
