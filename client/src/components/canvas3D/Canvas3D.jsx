import React, { Suspense, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Room3D from './Room3D';
import Furniture3D from './Furniture3D';
import { useDesignStore } from '../../store/designStore';

const SceneSetup = () => {
  const { gl } = useThree();
  React.useEffect(() => {
    gl.shadowMap.enabled = true;
  }, [gl]);
  return null;
};

const SceneFallback = () => (
  <mesh>
    <boxGeometry args={[0.1, 0.1, 0.1]} />
    <meshBasicMaterial color="transparent" />
  </mesh>
);

const Canvas3D = () => {
  const furniture = useDesignStore((s) => s.furniture);
  const room = useDesignStore((s) => s.room);
  const controlsRef = useRef();

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Outer Suspense boundary catches lazy-loaded Environment preset */}
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Loading 3D scene…
          </div>
        }
      >
        <Canvas
          shadows
          camera={{ position: [0, 5, 8], fov: 50 }}
          onCreated={({ gl }) => { gl.setClearColor('#1a1a2e'); }}
        >
          <SceneSetup />

          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={30}
          />
          <pointLight position={[-4, 6, -4]} intensity={0.6} />

          <Environment preset="apartment" />

          {/* Inner Suspense catches individual model/texture loads */}
          <Suspense fallback={<SceneFallback />}>
            <Room3D width={room.width} depth={room.depth} height={room.height} wallColor={room.wallColor} floorTexture={room.floorTexture} />
            {furniture.map((f) => (
              <Furniture3D key={f.id} item={f} room={room} />
            ))}
            <ContactShadows
              position={[0, -0.01, 0]}
              opacity={0.4}
              scale={20}
              blur={1.5}
              far={4}
            />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enablePan
            enableZoom
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Canvas3D;
