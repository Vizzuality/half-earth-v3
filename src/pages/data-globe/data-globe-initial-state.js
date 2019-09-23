import {
  BIODIVERSITY_FACETS_LAYER,
  LABELS_LAYER_GROUP,
  FIREFLY_BASEMAP_LAYER,
  GRID_LAYER
} from 'constants/layers-slugs';

export default {
  globe: {
    activeLayers: [
      { title: BIODIVERSITY_FACETS_LAYER }, // Biodiversity Facets (new grid)
      { title: GRID_LAYER }, // This is the layer used to paint aggregated grid cells
      { title: LABELS_LAYER_GROUP }, // This is the layer used to paint aggregated grid cells
      { title: FIREFLY_BASEMAP_LAYER } // half-earth firefly
    ],
    rasters: {},
    zoom: 1,
    center: [16.9515536, 0.116959],
    isGlobeUpdating: false
  },
  ui: {
    isSidebarOpen: false,
    isEntryBoxesOpen: false,
    isLegendOpen: false,
    isFullscreenActive: false, 
    activeCategory: ''
  },
  listeners: false
}