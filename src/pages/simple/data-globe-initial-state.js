import {
  FIREFLY_BASEMAP_LAYER,
  GRID_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER
} from 'constants/layers-slugs';

export default {
  globe: {
    activeLayers: [
      { title: FIREFLY_BASEMAP_LAYER }, 
      { title: GRID_LAYER }, 
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
      { title: CITIES_LABELS_LAYER }
    ],
    zoom: 1,
    center: [16.9515536, 0.116959],
    isGlobeUpdating: false
  },
  ui: {
    isSidebarOpen: false,
    isFullscreenActive: false, 
    activeCategory: ''
  },
  listeners: false
}