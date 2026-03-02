import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Canvas3D = ({ children }) => {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 8, 12], fov: 50 }}
      shadows
    >
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.3} />
      <OrbitControls
        enablePan
        enableZoom
        maxPolarAngle={Math.PI / 2.05}
        minDistance={3}
        maxDistance={30}
      />
      {children}
    </Canvas>
  );
};

export default Canvas3D;
