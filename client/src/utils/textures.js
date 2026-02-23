/**
 * PBR Texture Registry — PolyHaven CDN (CC0 license)
 */
const PH = 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k';

export const TEXTURE_URLS = {
  Wood: {
    map: `${PH}/wood_floor_deck/wood_floor_deck_diff_1k.jpg`,
    roughnessMap: `${PH}/wood_floor_deck/wood_floor_deck_rough_1k.jpg`,
    normalMap: `${PH}/wood_floor_deck/wood_floor_deck_nor_gl_1k.jpg`,
  },
  Fabric: {
    map: `${PH}/fabric_pattern_07/fabric_pattern_07_col_1_1k.jpg`,
    roughnessMap: `${PH}/fabric_pattern_07/fabric_pattern_07_rough_1k.jpg`,
    normalMap: `${PH}/fabric_pattern_07/fabric_pattern_07_nor_gl_1k.jpg`,
  },
  Leather: {
    map: `${PH}/brown_leather/brown_leather_albedo_1k.jpg`,
    roughnessMap: `${PH}/brown_leather/brown_leather_rough_1k.jpg`,
    normalMap: `${PH}/brown_leather/brown_leather_nor_gl_1k.jpg`,
  },
  Plastic: {
    map: `${PH}/painted_concrete/painted_concrete_diff_1k.jpg`,
    roughnessMap: `${PH}/painted_concrete/painted_concrete_rough_1k.jpg`,
    normalMap: `${PH}/painted_concrete/painted_concrete_nor_gl_1k.jpg`,
  },
};

export const MATERIAL_PBR = {
  Wood: { roughness: 0.85, metalness: 0.0 },
  Fabric: { roughness: 1.0, metalness: 0.0 },
  Leather: { roughness: 0.55, metalness: 0.1 },
  Plastic: { roughness: 0.45, metalness: 0.15 },
};
