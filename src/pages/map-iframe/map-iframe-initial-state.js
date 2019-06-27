import { BIODIVERSITY_FACETS_LAYER } from 'constants/biodiversity';
import { FIREFLY_LAYER } from 'constants/base-layers';

export default {
  globe: {
    activeLayers: [
      { id: BIODIVERSITY_FACETS_LAYER }, // Biodiversity Facets (new grid)
      { id: 'Grid layer' }, // Biodiversity Facets (new grid)
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
  },
  listeners: true
}