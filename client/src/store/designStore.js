import { create } from 'zustand';
import api from '../api/apiClient';

const MAX_HISTORY = 50;

const DEFAULT_ROOM = {
  width: 500,
  depth: 400,
  height: 280,
  wallColor: '#f5f0e8',
  floorTexture: 'wood',
};

const useDesignStore = create((set, get) => ({
  // ── Design meta ────────────────────────────────────────────────────────
  designName: 'Untitled Design',
  currentDesignId: null,
  isSaving: false,

  // ── Room config ────────────────────────────────────────────────────────
  room: { ...DEFAULT_ROOM },

  // ── Furniture list + selection ─────────────────────────────────────────
  furniture: [],
  selectedId: null,

  // ── Undo / redo ────────────────────────────────────────────────────────
  history: [],
  future: [],

  // ── Setters ────────────────────────────────────────────────────────────
  setDesignName: (name) => set({ designName: name }),

  resetDesign: () => set({
    designName: 'Untitled Design',
    currentDesignId: null,
    isSaving: false,
    room: { ...DEFAULT_ROOM },
    furniture: [],
    selectedId: null,
    history: [],
    future: [],
  }),

  setRoom: (room) => set({ room: { ...DEFAULT_ROOM, ...room } }),

  setFurniture: (furniture) => set({ furniture, history: [], future: [] }),

  replaceFurniture: (furniture) => {
    const prev = get().furniture;
    set({ furniture, history: [...get().history, prev].slice(-MAX_HISTORY), future: [] });
  },

  selectItem: (id) => set({ selectedId: id }),

  // ── Furniture mutations (all push to history) ─────────────────────────
  addFurniture: (item) => {
    const prev = get().furniture;
    set({
      furniture: [...prev, item],
      history: [...get().history, prev].slice(-MAX_HISTORY),
      future: [],
    });
  },

  updateFurniture: (updated) => {
    const prev = get().furniture;
    set({
      furniture: prev.map((f) => (f.id === updated.id ? { ...f, ...updated } : f)),
      history: [...get().history, prev].slice(-MAX_HISTORY),
      future: [],
    });
  },

  removeFurniture: (id) => {
    const prev = get().furniture;
    set({
      furniture: prev.filter((f) => f.id !== id),
      selectedId: get().selectedId === id ? null : get().selectedId,
      history: [...get().history, prev].slice(-MAX_HISTORY),
      future: [],
    });
  },

  duplicateFurniture: (id) => {
    const item = get().furniture.find((f) => f.id === id);
    if (!item) return;
    const clone = { ...item, id: crypto.randomUUID(), x: item.x + 20, y: item.y + 20 };
    get().addFurniture(clone);
  },

  rotateFurniture: (id, degrees = 90) => {
    const item = get().furniture.find((f) => f.id === id);
    if (!item) return;
    get().updateFurniture({ ...item, rotation: ((item.rotation ?? 0) + degrees) % 360 });
  },

  // ── Undo / redo ────────────────────────────────────────────────────────
  undo: () => {
    const { history, furniture } = get();
    if (!history.length) return;
    const prev = history[history.length - 1];
    set({
      furniture: prev,
      history: history.slice(0, -1),
      future: [furniture, ...get().future].slice(0, MAX_HISTORY),
    });
  },

  redo: () => {
    const { future, furniture } = get();
    if (!future.length) return;
    const next = future[0];
    set({
      furniture: next,
      future: future.slice(1),
      history: [...get().history, furniture].slice(-MAX_HISTORY),
    });
  },

  // ── Persist ────────────────────────────────────────────────────────────
  saveDesign: async (name) => {
    set({ isSaving: true });
    const { furniture, room, currentDesignId } = get();
    try {
      const payload = { name: name ?? get().designName, room, furniture };
      const { data } = currentDesignId
        ? await api.put(`/designs/${currentDesignId}`, payload)
        : await api.post('/designs', payload);
      set({ currentDesignId: data._id, designName: data.name, isSaving: false });
      return data;
    } catch (err) {
      set({ isSaving: false });
      throw new Error(err.response?.data?.message || err.message || 'Unable to save design');
    }
  },
}));

export { useDesignStore };
export default useDesignStore;
