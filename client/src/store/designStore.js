import { create } from 'zustand';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const MAX_HISTORY = 50;

const useDesignStore = create((set, get) => ({
  items: [],
  history: [],
  future: [],
  currentDesignId: null,
  isSaving: false,

  setItems: (items) => set({ items }),

  addItem: (item) => {
    const prev = get().items;
    set({ items: [...prev, item], history: [...get().history, prev].slice(-MAX_HISTORY), future: [] });
  },

  updateItem: (id, changes) => {
    const prev = get().items;
    set({
      items: prev.map((it) => (it.id === id ? { ...it, ...changes } : it)),
      history: [...get().history, prev].slice(-MAX_HISTORY),
      future: [],
    });
  },

  removeItem: (id) => {
    const prev = get().items;
    set({ items: prev.filter((it) => it.id !== id), history: [...get().history, prev].slice(-MAX_HISTORY), future: [] });
  },

  undo: () => {
    const { history, items } = get();
    if (!history.length) return;
    const prev = history[history.length - 1];
    set({ items: prev, history: history.slice(0, -1), future: [items, ...get().future] });
  },

  redo: () => {
    const { future, items } = get();
    if (!future.length) return;
    const next = future[0];
    set({ items: next, future: future.slice(1), history: [...get().history, items] });
  },

  saveDesign: async (name, roomConfig) => {
    set({ isSaving: true });
    const token = localStorage.getItem('token');
    try {
      const body = { name, furnitureItems: get().items, roomConfig };
      const method = get().currentDesignId ? 'PUT' : 'POST';
      const url = get().currentDesignId
        ? `${API}/api/designs/${get().currentDesignId}`
        : `${API}/api/designs`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      set({ currentDesignId: data._id, isSaving: false });
      return data;
    } catch (err) {
      set({ isSaving: false });
      throw err;
    }
  },
}));

export default useDesignStore;
