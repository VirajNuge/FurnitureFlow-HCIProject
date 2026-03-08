import { useCallback } from 'react';
import useDesignStore from '../store/designStore';

const GRID = 20;
const snap = (v) => Math.round(v / GRID) * GRID;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const ROOM = { x: 50, y: 50, width: 700, height: 500 };

const useDrag = () => {
  const { items, updateItem } = useDesignStore();

  const handleDragEnd = useCallback((id, rawX, rawY) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const x = clamp(snap(rawX), ROOM.x, ROOM.x + ROOM.width - item.w);
    const y = clamp(snap(rawY), ROOM.y, ROOM.y + ROOM.height - item.h);
    updateItem(id, { x, y });
  }, [items, updateItem]);

  return { handleDragEnd };
};

export default useDrag;
