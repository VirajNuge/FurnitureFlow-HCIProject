import React, { useRef } from 'react';
import { Stage, Layer } from 'react-konva';

const CANVAS_W = 800;
const CANVAS_H = 600;

const Canvas2D = () => {
  const stageRef = useRef(null);

  return (
    <div style={{ flex: 1, overflow: 'hidden', background: '#f3f4f6' }}>
      <Stage width={CANVAS_W} height={CANVAS_H} ref={stageRef}>
        <Layer>
          {/* furniture nodes rendered here */}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas2D;
