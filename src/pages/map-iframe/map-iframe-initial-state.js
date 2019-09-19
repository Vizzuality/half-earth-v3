import {
  LABELS_LAYER_GROUP,
  FIREFLY_BASEMAP_LAYER
} from 'constants/layers-slugs';

export default {
  globe: {
    activeLayers: [
      { title: LABELS_LAYER_GROUP }, // This is the layer used to paint aggregated grid cells
      { title: FIREFLY_BASEMAP_LAYER } // half-earth firefly
    ],
    rasters: {},
    zoom: 3,
    center: [16.9515536, 51.116959],
    isGlobeUpdating: false
  },
  ui: {
    isSidebarOpen: false,
    isFullscreenActive: false, 
    activeCategory: ''
  },
  listeners: true
}