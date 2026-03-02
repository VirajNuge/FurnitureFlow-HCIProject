import React, { useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import RoomBoundary from './RoomBoundary';
import FurnitureNode from './FurnitureNode';

const CANVAS_W = 800;
const CANVAS_H = 600;
const ROOM = { x: 50, y: 50, width: 700, height: 500 };
const GRID = 20;

const snap = (v) => Math.round(v / GRID) * GRID;

const overlaps = (a, b) =>
  a.x < b.x + b.w && a.x + a.w > b.x &&
  a.y < b.y + b.h && a.y + a.h > b.y;

const Canvas2D = () => {
  const stageRef = useRef(null);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('furnitureType');
    if (!raw) return;
    const item = JSON.parse(raw);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = snap(e.clientX - rect.left);
    const y = snap(e.clientY - rect.top);
    const candidate = { ...item, id: Date.now(), x, y };
    const collision = items.some((i) => overlaps(candidate, i));
    if (!collision) setItems((prev) => [...prev, candidate]);
  };

  const handleDragEnd = (id, nx, ny) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, x: snap(nx), y: snap(ny) } : it))
    );
  };

  return (
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
  );
};

export default Canvas2D;
