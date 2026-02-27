import React from 'react';
import { Rect } from 'react-konva';

const RoomBoundary = ({ x = 50, y = 50, width = 600, height = 500 }) => {
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="#fafafa"
      stroke="#374151"
      strokeWidth={2}
      listening={false}
    />
  );
};

export default RoomBoundary;
