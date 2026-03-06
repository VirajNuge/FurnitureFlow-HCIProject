import React, { useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import RoomBoundary from './RoomBoundary';
import FurnitureNode from './FurnitureNode';
import PropertiesSidebar from '../ui/PropertiesSidebar';

const CANVAS_W = 800;
const CANVAS_H = 600;
const ROOM = { x: 50, y: 50, width: 700, height: 500 };
const GRID = 20;

const snap = (v) => Math.round(v / GRID) * GRID;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const overlaps = (a, b) =>
  a.x < b.x + b.w && a.x + a.w > b.x &&
  a.y < b.y + b.h && a.y + a.h > b.y;

const Canvas2D = () => {
  const stageRef = useRef(null);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  const selectedItem = items.find((i) => i.id === selected) || null;

  const clampToRoom = (x, y, w, h) => ({
    x: clamp(x, ROOM.x, ROOM.x + ROOM.width - w),
    y: clamp(y, ROOM.y, ROOM.y + ROOM.height - h),
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('furnitureType');
    if (!raw) return;
    const item = JSON.parse(raw);
    const rect = e.currentTarget.getBoundingClientRect();
    const { x, y } = clampToRoom(snap(e.clientX - rect.left), snap(e.clientY - rect.top), item.w, item.h);
    const candidate = { ...item, id: Date.now(), x, y, color: '#93c5fd' };
    if (!items.some((i) => overlaps(candidate, i))) setItems((prev) => [...prev, candidate]);
  };

  const handleDragEnd = (id, nx, ny) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const { x, y } = clampToRoom(snap(nx), snap(ny), item.w, item.h);
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, x, y } : it)));
  };

  const handleColorChange = (id, color) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, color } : it)));

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <div
        style={{ flex: 1, overflow: 'hidden', background: '#f3f4f6' }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage width={CANVAS_W} height={CANVAS_H} ref={stageRef} onMouseDown={() => setSelected(null)}>
          <Layer>
            <RoomBoundary {...ROOM} />
            {items.map((item) => (
              <FurnitureNode
                key={item.id}
                item={item}
                isSelected={selected === item.id}
                onSelect={setSelected}
                onDragEnd={handleDragEnd}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <PropertiesSidebar selectedItem={selectedItem} onColorChange={handleColorChange} />
    </div>
  );
};

export default Canvas2D;
