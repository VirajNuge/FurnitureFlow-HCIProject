import React, { useRef, useState, useCallback } from 'react';
import { Stage, Layer, Rect, Line, Text, Arrow } from 'react-konva';
import FurnitureNode from './FurnitureNode';
import RoomBoundary from './RoomBoundary';
import { useDesignStore } from '../../store/designStore';
import useSnapGrid from '../../hooks/useSnapGrid';
import useDrag from '../../hooks/useDrag';

const GRID_SIZE = 20;
const CANVAS_W = 800;
const CANVAS_H = 600;

const Canvas2D = () => {
  const { furniture, room, updateFurniture, selectItem, selectedId } = useDesignStore();
  const { snapPoint } = useSnapGrid(GRID_SIZE);
  const { isDragging, onDragStart, onDragEnd } = useDrag();
  const stageRef = useRef();
  const transformerRef = useRef();

  const [selection, setSelection] = useState(null);
  const [selecting, setSelecting] = useState(false);

  const scaleX = CANVAS_W / room.width;
  const scaleY = CANVAS_H / room.depth;
  const rw = room.width * scaleX;
  const rh = room.depth * scaleY;

  const drawGrid = () => {
    const lines = [];
    for (let x = 0; x <= CANVAS_W; x += GRID_SIZE)
      lines.push(<Line key={`v${x}`} points={[x, 0, x, CANVAS_H]} stroke="#e5e7eb" strokeWidth={0.5} />);
    for (let y = 0; y <= CANVAS_H; y += GRID_SIZE)
      lines.push(<Line key={`h${y}`} points={[0, y, CANVAS_W, y]} stroke="#e5e7eb" strokeWidth={0.5} />);
    return lines;
  };

  const drawAxisLabels = () => (
    <>
      <Arrow points={[10, rh + 20, rw - 10, rh + 20]} fill="#6b7280" stroke="#6b7280" strokeWidth={1} pointerLength={6} pointerWidth={5} />
      <Text x={rw / 2 - 25} y={rh + 24} text={`${room.width} cm`} fontSize={11} fill="#6b7280" />
      <Arrow points={[rw + 20, 10, rw + 20, rh - 10]} fill="#6b7280" stroke="#6b7280" strokeWidth={1} pointerLength={6} pointerWidth={5} />
      <Text x={rw + 24} y={rh / 2 - 10} text={`${room.depth} cm`} fontSize={11} fill="#6b7280" rotation={90} />
    </>
  );

  const handleStageMouseDown = useCallback((e) => {
    // Only deselect when clicking directly on the stage background
    const clickedOnEmpty = e.target === e.target.getStage();
    if (!clickedOnEmpty) return;

    selectItem(null);

    // Explicitly detach transformer so handles disappear immediately
    if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }

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
    const selBox = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1) };
    if (selBox.w > 5 && selBox.h > 5) {
      const hit = furniture.filter((f) => {
        const fx = f.x * scaleX, fy = f.y * scaleY, fw = f.width * scaleX, fh = f.height * scaleY;
        return fx < selBox.x + selBox.w && fx + fw > selBox.x && fy < selBox.y + selBox.h && fy + fh > selBox.y;
      });
      if (hit.length === 1) selectItem(hit[0].id);
    }
    setSelection(null);
  }, [selection, furniture, scaleX, scaleY, selectItem]);

  const handleFurnitureChange = (updated) => {
    const snapped = snapPoint({ x: updated.x, y: updated.y });
    updateFurniture({ ...updated, ...snapped });
  };

  const selRect = selection
    ? { x: Math.min(selection.x1, selection.x2), y: Math.min(selection.y1, selection.y2), width: Math.abs(selection.x2 - selection.x1), height: Math.abs(selection.y2 - selection.y1) }
    : null;

  return (
    <div className="w-full h-full overflow-auto bg-gray-50 p-4" style={{ cursor: isDragging ? 'grabbing' : 'default' }}>
      <Stage ref={stageRef} width={CANVAS_W} height={CANVAS_H}
        onMouseDown={handleStageMouseDown} onMouseMove={handleStageMouseMove} onMouseUp={handleStageMouseUp}>
        <Layer>
          {drawGrid()}
          <RoomBoundary room={room} scaleX={scaleX} scaleY={scaleY} />
          {drawAxisLabels()}
          {furniture.map((f) => (
            <FurnitureNode
              key={f.id}
              item={{ ...f, x: f.x * scaleX, y: f.y * scaleY, width: f.width * scaleX, height: f.height * scaleY }}
              isSelected={f.id === selectedId}
              onSelect={() => selectItem(f.id)}
              onDragStart={onDragStart}
              onDragEnd={(e) => { onDragEnd(e); handleFurnitureChange({ ...f, x: e.target.x() / scaleX, y: e.target.y() / scaleY }); }}
              onChange={(u) => handleFurnitureChange({ ...u, x: u.x / scaleX, y: u.y / scaleY, width: u.width / scaleX, height: u.height / scaleY })}
            />
          ))}
          {selRect && selecting && (
            <Rect {...selRect} fill="rgba(37,99,235,0.08)" stroke="#2563EB" strokeWidth={1} dash={[4, 3]} />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas2D;
