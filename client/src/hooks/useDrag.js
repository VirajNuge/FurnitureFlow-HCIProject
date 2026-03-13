import { useState, useCallback } from 'react';
import { useDesignStore } from '../store/designStore';

const GRID = 20;
const snap = (v) => Math.round(v / GRID) * GRID;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const useDrag = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { furniture, room, updateFurniture } = useDesignStore();

  const onDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onDragEnd = useCallback((e) => {
    setIsDragging(false);
    const node = e.target;
    const id = node.id();
    if (!id) return;

    const item = furniture.find((f) => f.id === id);
    if (!item) return;

    // Canvas2D applies scaleX/scaleY when passing coords; raw canvas coords here
    // The actual position update is done via handleFurnitureChange in Canvas2D
    // This hook only tracks drag state and provides callbacks
  }, [furniture]);

  const handleDragEnd = useCallback((id, rawX, rawY, scaleX = 1, scaleY = 1) => {
    const item = furniture.find((f) => f.id === id);
    if (!item) return;

    const roomW = room?.width ?? 700;
    const roomD = room?.depth ?? 500;

    // rawX/rawY are in canvas pixels; convert back to room units
    const roomX = rawX / scaleX;
    const roomY = rawY / scaleY;

    const x = clamp(snap(roomX), 0, roomW - item.width);
    const y = clamp(snap(roomY), 0, roomD - item.height);
    updateFurniture({ ...item, x, y });
  }, [furniture, room, updateFurniture]);

  return { isDragging, onDragStart, onDragEnd, handleDragEnd };
};

export default useDrag;
