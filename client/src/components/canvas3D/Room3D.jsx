import React from 'react';

const Room3D = ({ width = 10, depth = 8, wallHeight = 3 }) => {
  const hw = width / 2;
  const hd = depth / 2;

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, wallHeight / 2, -hd]} receiveShadow>
        <planeGeometry args={[width, wallHeight]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      {/* Left wall */}
      <mesh position={[-hw, wallHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[depth, wallHeight]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </group>
  );
};

export default Room3D;
