import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import TexturedMaterial from './TexturedMaterial';

const TYPE_DIMS = {
  sofa:       { w: 1.8, h: 0.8, d: 0.9 },
  chair:      { w: 0.7, h: 0.9, d: 0.7 },
  table:      { w: 1.2, h: 0.75, d: 0.8 },
  bed:        { w: 1.6, h: 0.5, d: 2.0 },
  wardrobe:   { w: 1.2, h: 2.0, d: 0.6 },
  bookshelf:  { w: 0.9, h: 1.8, d: 0.3 },
  desk:       { w: 1.4, h: 0.75, d: 0.7 },
  lamp:       { w: 0.3, h: 1.5, d: 0.3 },
};

const ROOM_SCALE = 0.01; // 1 px = 0.01 m

const Furniture3D = ({ item }) => {
  const meshRef = useRef();
  const targetPos = useRef(new THREE.Vector3());
  const targetRot = useRef(0);

  const dims = TYPE_DIMS[item.type] || { w: 1, h: 1, d: 1 };
  const hw = (item.width ?? dims.w / ROOM_SCALE) * ROOM_SCALE / 2;
  const hd = (item.height ?? dims.d / ROOM_SCALE) * ROOM_SCALE / 2;
  const hh = dims.h / 2;

  // Update target whenever item changes
  useEffect(() => {
    if (!item) return;
    const x = ((item.x ?? 0) + (item.width ?? 0) / 2) * ROOM_SCALE - 2.5;
    const z = ((item.y ?? 0) + (item.height ?? 0) / 2) * ROOM_SCALE - 2;
    targetPos.current.set(x, hh, z);
    targetRot.current = ((item.rotation ?? 0) * Math.PI) / 180;
  }, [item, hh]);

  // Lerp mesh toward target for smooth real-time updates
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.lerp(targetPos.current, 0.15);
    meshRef.current.rotation.y +=
      (targetRot.current - meshRef.current.rotation.y) * 0.15;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[hw * 2, dims.h, hd * 2]} />
      <TexturedMaterial
        color={item.color || '#A0855B'}
        textureId={item.textureId}
      />
    </mesh>
  );
};

export default Furniture3D;
