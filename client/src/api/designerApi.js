import api from './apiClient';

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
