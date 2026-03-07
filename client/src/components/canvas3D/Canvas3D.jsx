import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import useDesignStore from '../../store/designStore';
import Room3D from './Room3D';
import Furniture3D from './Furniture3D';

const Canvas3D = ({ roomConfig }) => {
  const items = useDesignStore((s) => s.items);
  const room = roomConfig || { width: 10, depth: 8, wallHeight: 3 };

  return (
    <div style={{ flex: 1, height: '100%' }}>
      <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>Loading 3D…</div>}>
        <Canvas
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [0, 8, 12], fov: 50 }}
          shadows
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 20, 10]} intensity={1.0} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
          <pointLight position={[-10, 10, -10]} intensity={0.3} />
          <OrbitControls enablePan enableZoom maxPolarAngle={Math.PI / 2.05} minDistance={3} maxDistance={30} />
          <Room3D width={room.width} depth={room.depth} wallHeight={room.wallHeight} />
          {items.map((item) => (
            <Furniture3D key={item.id} item={item} />
          ))}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Canvas3D;
