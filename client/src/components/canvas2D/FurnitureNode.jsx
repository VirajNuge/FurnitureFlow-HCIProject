import React from 'react';
import { Group, Rect, Text } from 'react-konva';

const FurnitureNode = ({ item, isSelected, onSelect, onDragEnd }) => {
  const { x, y, w, h, label, color = '#93c5fd' } = item;

  return (
    <Group
      x={x}
      y={y}
      draggable
      onClick={() => onSelect && onSelect(item.id)}
      onDragEnd={(e) => onDragEnd && onDragEnd(item.id, e.target.x(), e.target.y())}
    >
      <Rect
        width={w}
        height={h}
        fill={color}
        stroke={isSelected ? '#1d4ed8' : '#6b7280'}
        strokeWidth={isSelected ? 2 : 1}
        cornerRadius={4}
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
  );
};

export default FurnitureNode;
