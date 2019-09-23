import {
  FIREFLY_BASEMAP_LAYER,
} from 'constants/layers-slugs';

export default {
  globe: {
    activeLayers: [
      { title: FIREFLY_BASEMAP_LAYER } // half-earth firefly
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