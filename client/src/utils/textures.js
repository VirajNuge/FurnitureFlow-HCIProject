/**
 * PBR Texture Registry
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
};

export const MATERIAL_PBR = {
  Wood: { roughness: 0.85, metalness: 0.0 },
  Fabric: { roughness: 1.0, metalness: 0.0 },
};
