import { RARITY_RICHNESS_GRID_LAYER_ID } from 'constants/biodiversity';

export default {
  globe: {
    activeLayers: [
      { id: RARITY_RICHNESS_GRID_LAYER_ID }, // rarity-richness-GRID
      { id: '16b23629a42-layer-0'} // half-earth firefly
    ],
    rasters: {},
    isPaddingActive: true,
    zoom: 3,
    center: [16.9515536, 51.116959]
  },
  ui: {
    isSidebarOpen: false,
    isFullscreenActive: false, 
    activeCategory: ''
  }
}