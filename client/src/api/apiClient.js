import axios from 'axios';

const configuredApi = import.meta.env.VITE_API_URL?.replace(/\/$/, '').replace(/\/api$/, '');
const apiRoot = configuredApi ? `${configuredApi}/api` : '/api';

const api = axios.create({
  baseURL: apiRoot,
  headers: { 'Content-Type': 'application/json' },
});

let refreshPromise = null;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const isAuthRequest = original?.url?.includes('/auth/refresh') || original?.url?.includes('/auth/login') || original?.url?.includes('/auth/register');
    if (error.response?.status !== 401 || original?._retry || isAuthRequest) return Promise.reject(error);

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return Promise.reject(error);
    original._retry = true;

    try {
      refreshPromise ||= axios.post(`${apiRoot}/auth/refresh`, { refreshToken });
      const { data } = await refreshPromise;
      refreshPromise = null;
      localStorage.setItem('token', data.token);
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      original.headers.Authorization = `Bearer ${data.token}`;
      return api.request(original);
    } catch (refreshError) {
      refreshPromise = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') window.location.assign('/login');
      return Promise.reject(refreshError);
    }
  }
);

export default api;
