import React from 'react';

const TYPE_DIMS = {
  chair:  { w: 0.6, h: 0.9, d: 0.6 },
  table:  { w: 1.2, h: 0.75, d: 0.8 },
  sofa:   { w: 2.0, h: 0.85, d: 0.9 },
  bed:    { w: 1.6, h: 0.5, d: 2.0 },
  shelf:  { w: 1.0, h: 1.8, d: 0.3 },
  lamp:   { w: 0.3, h: 1.5, d: 0.3 },
};

const CANVAS_SCALE = 0.02; // pixels → metres

const Furniture3D = ({ item }) => {
  const { type = 'chair', x = 0, y = 0, color = '#93c5fd', rotation = 0 } = item;
  const dims = TYPE_DIMS[type] || { w: 1, h: 1, d: 1 };
  const px = (x - 400) * CANVAS_SCALE;
  const pz = (y - 300) * CANVAS_SCALE;

  return (
    <mesh
      position={[px, dims.h / 2, pz]}
      rotation={[0, (rotation * Math.PI) / 180, 0]}
      castShadow
    >
      <boxGeometry args={[dims.w, dims.h, dims.d]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Furniture3D;
