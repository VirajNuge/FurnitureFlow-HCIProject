import React from 'react';
import { useTexture } from '@react-three/drei';
import { TEXTURE_URLS, MATERIAL_PBR } from '../../utils/textures';

// Map textureId strings to the keys used in TEXTURE_URLS / MATERIAL_PBR
const TEXTURE_ID_MAP = {
  wood: 'Wood',
  fabric: 'Fabric',
  leather: 'Leather',
  concrete: 'Concrete',
  metal: 'Metal',
};

const TexturedMaterial = ({ color, textureId, repeat }) => {
  const materialKey = TEXTURE_ID_MAP[textureId] || (TEXTURE_URLS[textureId] ? textureId : 'Wood');
  const urls = TEXTURE_URLS[materialKey];
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
