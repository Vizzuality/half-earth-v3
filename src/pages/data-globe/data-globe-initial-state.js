import { BIODIVERSITY_FACETS_LAYER } from 'constants/biodiversity';
import { FIREFLY_LAYER, FEATURES_LABELS_LAYER, GRID_LAYER } from 'constants/base-layers';

export default {
  globe: {
    activeLayers: [
      { id: BIODIVERSITY_FACETS_LAYER }, // Biodiversity Facets (new grid)
      { id: GRID_LAYER }, // This is the layer used to paint aggregated grid cells
      { id: FEATURES_LABELS_LAYER }, // This is the layer used to paint aggregated grid cells
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