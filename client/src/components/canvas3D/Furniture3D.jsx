import React from 'react';

const TYPE_DIMS = {
  chair:  [0.6, 0.9, 0.6],
  table:  [1.2, 0.75, 0.8],
  sofa:   [2.0, 0.85, 0.9],
  bed:    [1.6, 0.5, 2.0],
  shelf:  [1.0, 1.8, 0.3],
  lamp:   [0.3, 1.5, 0.3],
};

const Furniture3D = ({ type = 'chair', position = [0, 0, 0], color = '#93c5fd' }) => {
  const [w, h, d] = TYPE_DIMS[type] || [1, 1, 1];

  return (
    <mesh position={[position[0], h / 2, position[2]]} castShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Furniture3D;
