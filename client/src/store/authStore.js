import { create } from 'zustand';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  get isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  register: async ({ name, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      set({ user: data.user, token: data.token, isLoading: false });
      return data;
    } catch (err) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      set({ user: data.user, token: data.token, isLoading: false });
      return data;
    } catch (err) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  logout: () => {
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
