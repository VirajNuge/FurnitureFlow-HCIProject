import React, { useRef, useEffect } from 'react';
import { Group, Rect, Text, Transformer, Circle } from 'react-konva';

const HANDLE_RADIUS = 7;

const FurnitureNode = ({ item, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e) => {
    onChange({ ...item, x: e.target.x(), y: e.target.y() });
  };

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    onChange({
      ...item,
      x: node.x(),
      y: node.y(),
      width: Math.max(20, node.width() * scaleX),
      height: Math.max(20, node.height() * scaleY),
      rotation: node.rotation(),
    });
  };

  const handleRotateDrag = (e) => {
    const node = shapeRef.current;
    const cx = node.x() + item.width / 2;
    const cy = node.y() + item.height / 2;
    const dx = e.evt.clientX - cx;
    const dy = e.evt.clientY - cy;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    onChange({ ...item, rotation: angle });
  };

  return (
    <>
      <Group
        ref={shapeRef}
        x={item.x}
        y={item.y}
        width={item.width}
        height={item.height}
        rotation={item.rotation || 0}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      >
        <Rect
          width={item.width}
          height={item.height}
          fill={item.color || '#A0855B'}
          stroke={isSelected ? '#2563EB' : '#6B4C2A'}
          strokeWidth={isSelected ? 2 : 1}
          cornerRadius={4}
        />
        <Text
          text={item.label || item.type}
          fontSize={11}
          fill="#fff"
          width={item.width}
          height={item.height}
          align="center"
          verticalAlign="middle"
        />
        {isSelected && (
          <Circle
            x={item.width / 2}
            y={-HANDLE_RADIUS * 2}
            radius={HANDLE_RADIUS}
            fill="#2563EB"
            draggable
            onDragMove={handleRotateDrag}
            onMouseEnter={(e) => { e.target.getStage().container().style.cursor = 'crosshair'; }}
            onMouseLeave={(e) => { e.target.getStage().container().style.cursor = 'default'; }}
          />
        )}
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) =>
            newBox.width < 20 || newBox.height < 20 ? oldBox : newBox
          }
        />
      )}
    </>
  );
};

export default FurnitureNode;
