import { create } from 'zustand';
import api from '../api/apiClient';

const readUser = () => {
  try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
};

const useAuthStore = create((set) => ({
  user: localStorage.getItem('token') ? readUser() : null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  get isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  register: async ({ name, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      set({ user: data.user, token: data.token, isLoading: false });
      return data;
    } catch (err) {
      set({ isLoading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      set({ user: data.user, token: data.token, isLoading: false });
      return data;
    } catch (err) {
      set({ isLoading: false, error: err.response?.data?.message || err.message });
      throw err;
    }
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try { if (refreshToken) await api.post('/auth/logout', { refreshToken }); } catch { /* local logout still completes */ }
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },

  setUser: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData });
  },

  clearError: () => set({ error: null }),
}));

export { useAuthStore };
export default useAuthStore;
