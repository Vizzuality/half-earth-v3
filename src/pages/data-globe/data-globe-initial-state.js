import { RARITY_RICHNESS_GRID_LAYER_ID } from 'constants/biodiversity';
import { FIREFLY_LAYER } from 'constants/base-layers';

export default {
  globe: {
    activeLayers: [
      { id: RARITY_RICHNESS_GRID_LAYER_ID }, // rarity-richness-GRID
      { id: FIREFLY_LAYER } // half-earth firefly
    ],
    rasters: {},
    zoom: 3,
    center: [16.9515536, 51.116959]
  },
  ui: {
    isSidebarOpen: false,
    isFullscreenActive: false, 
    activeCategory: ''
  }
}