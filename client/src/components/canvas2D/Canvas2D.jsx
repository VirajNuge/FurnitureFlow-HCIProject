import React, { useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import RoomBoundary from './RoomBoundary';

const CANVAS_W = 800;
const CANVAS_H = 600;
const ROOM = { x: 50, y: 50, width: 700, height: 500 };

const Canvas2D = () => {
  const stageRef = useRef(null);
  const [items, setItems] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('furnitureType');
    if (!raw) return;
    const item = JSON.parse(raw);
    const stage = stageRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setItems((prev) => [
      ...prev,
      { ...item, id: Date.now(), x, y },
    ]);
  };

  return (
    <div
      style={{ flex: 1, overflow: 'hidden', background: '#f3f4f6' }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Stage width={CANVAS_W} height={CANVAS_H} ref={stageRef}>
        <Layer>
          <RoomBoundary {...ROOM} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas2D;
