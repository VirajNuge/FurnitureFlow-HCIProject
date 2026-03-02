import { create } from 'zustand';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const useDesignStore = create((set, get) => ({
  items: [],
  currentDesignId: null,
  isSaving: false,

  setItems: (items) => set({ items }),

  addItem: (item) => set((state) => ({ items: [...state.items, item] })),

  updateItem: (id, changes) =>
    set((state) => ({
      items: state.items.map((it) => (it.id === id ? { ...it, ...changes } : it)),
    })),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((it) => it.id !== id) })),

  saveDesign: async (name, roomConfig) => {
    set({ isSaving: true });
    const token = localStorage.getItem('token');
    try {
      const body = { name, furnitureItems: get().items, roomId: roomConfig?.roomId };
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
