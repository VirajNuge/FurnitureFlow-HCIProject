import React, { useMemo } from 'react';
import * as THREE from 'three';
import TexturedMaterial from './TexturedMaterial';

const SCALE = 0.01;

const Room3D = ({ width = 500, depth = 400, height = 280 }) => {
  const w = width * SCALE;
  const d = depth * SCALE;
  const h = height * SCALE;

  // Build floor geometry with correct UV mapping so 1 texture tile = 1m²
  const floorGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(w, d, 1, 1);
    // Remap UVs so texture tiles at 1m intervals
    const uvAttr = geo.attributes.uv;
    const positions = [
      [0, 0], [w, 0], [0, d], [w, d],
    ];
    positions.forEach(([u, v], i) => {
      uvAttr.setXY(i, u, v);
    });
    uvAttr.needsUpdate = true;
    return geo;
  }, [w, d]);

  const wallColor = '#f5f0e8';

  return (
    <group>
      {/* Floor */}
      <mesh geometry={floorGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <TexturedMaterial textureId="wood" repeat={[w, d]} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, h / 2, -d / 2]} receiveShadow>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-w / 2, h / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[d, h]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Right wall */}
      <mesh position={[w / 2, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[d, h]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, h, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
      </mesh>
    </group>
  );
};

export default Room3D;
