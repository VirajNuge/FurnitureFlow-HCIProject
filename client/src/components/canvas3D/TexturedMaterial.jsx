import React from 'react';
import { useTexture } from '@react-three/drei';
import { TEXTURE_URLS, MATERIAL_PBR } from '../../utils/textures';

const TexturedMaterial = ({ materialKey = 'Wood' }) => {
  const urls = TEXTURE_URLS[materialKey] || TEXTURE_URLS.Wood;
  const pbr = MATERIAL_PBR[materialKey] || MATERIAL_PBR.Wood;

  const textures = useTexture({
    map: urls.map,
    roughnessMap: urls.roughnessMap,
    normalMap: urls.normalMap,
  });

  return (
    <meshStandardMaterial
      {...textures}
      roughness={pbr.roughness}
      metalness={pbr.metalness}
    />
  );
};

export default TexturedMaterial;
