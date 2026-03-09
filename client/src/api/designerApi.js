import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refresh = localStorage.getItem('refreshToken');
      if (refresh) {
        try {
          const { data } = await axios.post('/api/auth/refresh', { refreshToken: refresh });
          localStorage.setItem('token', data.token);
          err.config.headers.Authorization = `Bearer ${data.token}`;
          return api.request(err.config);
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(err);
  }
);

/* ── Designs ─────────────────────────────────────────────────────────── */
export const getDesigns = (page = 1, limit = 12) =>
  api.get(`/designs?page=${page}&limit=${limit}`);

export const getDesign = (id) => api.get(`/designs/${id}`);

export const createDesign = (payload) => api.post('/designs', payload);

export const updateDesign = (id, payload) => api.put(`/designs/${id}`, payload);

export const deleteDesign = (id) => api.delete(`/designs/${id}`);

/* ── Rooms ───────────────────────────────────────────────────────────── */
export const getRooms = () => api.get('/rooms');
export const createRoom = (payload) => api.post('/rooms', payload);
export const updateRoom = (id, payload) => api.put(`/rooms/${id}`, payload);

/* ── Furniture ───────────────────────────────────────────────────────── */
export const getFurnitureCatalog = () => api.get('/furniture');

/* ── Feedback ────────────────────────────────────────────────────────── */
export const submitFeedback = (payload) => api.post('/feedback', payload);
export const getFeedback = () => api.get('/feedback');

export default api;
