import React from 'react';
import { Rect } from 'react-konva';

const RoomBoundary = ({ room, scaleX = 1, scaleY = 1 }) => {
  const width = (room?.width ?? 700) * scaleX;
  const height = (room?.depth ?? 500) * scaleY;

  return (
    <Rect
      x={0}
      y={0}
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
