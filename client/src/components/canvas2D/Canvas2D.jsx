import React, { useRef, useState, useCallback } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import FurnitureNode from './FurnitureNode';
import RoomBoundary from './RoomBoundary';
import { useDesignStore } from '../../store/designStore';
import useSnapGrid from '../../hooks/useSnapGrid';

const GRID_SIZE = 20;

const Canvas2D = () => {
  const { furniture, room, updateFurniture, selectItem, selectedId } = useDesignStore();
  const { snapPoint } = useSnapGrid(GRID_SIZE);
  const stageRef = useRef();

  const [selection, setSelection] = useState(null);
  const [selecting, setSelecting] = useState(false);

  const drawGrid = () => {
    const lines = [];
    for (let x = 0; x <= 800; x += GRID_SIZE) {
      lines.push(<Line key={`v${x}`} points={[x, 0, x, 600]} stroke="#e5e7eb" strokeWidth={0.5} />);
    }
    for (let y = 0; y <= 600; y += GRID_SIZE) {
      lines.push(<Line key={`h${y}`} points={[0, y, 800, y]} stroke="#e5e7eb" strokeWidth={0.5} />);
    }
    return lines;
  };

  const drawRoomLabels = () => {
    const scaleX = 800 / room.width;
    const scaleY = 600 / room.depth;
    return (
      <>
        <Line points={[0, 580, room.width * scaleX, 580]} stroke="#9ca3af" strokeWidth={1} dash={[4, 4]} />
        <Line points={[780, 0, 780, room.depth * scaleY]} stroke="#9ca3af" strokeWidth={1} dash={[4, 4]} />
      </>
    );
  };

  const handleStageMouseDown = useCallback((e) => {
    if (e.target !== e.target.getStage()) return;
    selectItem(null);
    const pos = stageRef.current.getPointerPosition();
    setSelection({ x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y });
    setSelecting(true);
  }, [selectItem]);

  const handleStageMouseMove = useCallback(() => {
    if (!selecting) return;
    const pos = stageRef.current.getPointerPosition();
    setSelection((prev) => prev ? { ...prev, x2: pos.x, y2: pos.y } : null);
  }, [selecting]);

  const handleStageMouseUp = useCallback(() => {
    if (!selection) return;
    setSelecting(false);

    const { x1, y1, x2, y2 } = selection;
    const selBox = {
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      w: Math.abs(x2 - x1),
      h: Math.abs(y2 - y1),
    };

    // Only select if the rubber-band box is large enough to be intentional
    if (selBox.w > 5 && selBox.h > 5) {
      const scaleX = 800 / room.width;
      const scaleY = 600 / room.depth;
      const hit = furniture.filter((f) => {
        const fx = f.x * scaleX;
        const fy = f.y * scaleY;
        const fw = f.width * scaleX;
        const fh = f.height * scaleY;
        return fx < selBox.x + selBox.w &&
          fx + fw > selBox.x &&
          fy < selBox.y + selBox.h &&
          fy + fh > selBox.y;
      });
      if (hit.length === 1) selectItem(hit[0].id);
    }
    setSelection(null);
  }, [selection, furniture, room, selectItem]);

  const handleFurnitureChange = (updated) => {
    const snapped = snapPoint({ x: updated.x, y: updated.y });
    updateFurniture({ ...updated, ...snapped });
  };

  const selRect = selection
    ? {
        x: Math.min(selection.x1, selection.x2),
        y: Math.min(selection.y1, selection.y2),
        width: Math.abs(selection.x2 - selection.x1),
        height: Math.abs(selection.y2 - selection.y1),
      }
    : null;

  return (
    <div className="w-full h-full overflow-auto bg-gray-50 p-4">
      <Stage
        ref={stageRef}
        width={800}
        height={600}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
        onMouseUp={handleStageMouseUp}
      >
        <Layer>
          {drawGrid()}
          {drawRoomLabels()}
          <RoomBoundary room={room} scaleX={800 / room.width} scaleY={600 / room.depth} />
          {furniture.map((f) => (
            <FurnitureNode
              key={f.id}
              item={{
                ...f,
                x: f.x * (800 / room.width),
                y: f.y * (600 / room.depth),
                width: f.width * (800 / room.width),
                height: f.height * (600 / room.depth),
              }}
              isSelected={f.id === selectedId}
              onSelect={() => selectItem(f.id)}
              onChange={(updated) =>
                handleFurnitureChange({
                  ...updated,
                  x: updated.x / (800 / room.width),
                  y: updated.y / (600 / room.depth),
                  width: updated.width / (800 / room.width),
                  height: updated.height / (600 / room.depth),
                })
              }
            />
          ))}
          {selRect && selecting && (
            <Rect
              {...selRect}
              fill="rgba(37,99,235,0.08)"
              stroke="#2563EB"
              strokeWidth={1}
              dash={[4, 3]}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas2D;
