import React, { useRef } from 'react';
import { Group, Rect, Text, Transformer } from 'react-konva';

const FurnitureNode = ({ item, isSelected, onSelect, onDragEnd }) => {
  const { x, y, w, h, label, color = '#93c5fd' } = item;
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  return (
    <Group>
      <Group
        x={x}
        y={y}
        draggable
        onClick={() => onSelect && onSelect(item.id)}
        onDragEnd={(e) => onDragEnd && onDragEnd(item.id, e.target.x(), e.target.y())}
        ref={shapeRef}
      >
        <Rect
          width={w}
          height={h}
          fill={color}
          stroke={isSelected ? '#1d4ed8' : '#6b7280'}
          strokeWidth={isSelected ? 2 : 1}
          cornerRadius={4}
          shadowEnabled={isSelected}
          shadowColor="rgba(59,130,246,0.4)"
          shadowBlur={8}
        />
        <Text
          text={label}
          width={w}
          height={h}
          align="center"
          verticalAlign="middle"
          fontSize={11}
          fill="#1e3a5f"
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
        />
      )}
    </Group>
  );
};

export default FurnitureNode;
