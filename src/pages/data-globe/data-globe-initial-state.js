import {
  FIREFLY_BASEMAP_LAYER,
  GRID_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  ALL_TAXA_RARITY
} from 'constants/layers-slugs';

import { DEFAULT_OPACITY, LAYERS_CATEGORIES } from 'constants/mol-layers-configs'

export default {
  globe: {
    activeLayers: [
      { title: FIREFLY_BASEMAP_LAYER }, 
      { title: GRID_LAYER }, 
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
      { title: CITIES_LABELS_LAYER },
      { title: ALL_TAXA_RARITY, opacity: DEFAULT_OPACITY, category: LAYERS_CATEGORIES.BIODIVERSITY }
    ],
    zoom: 1,
    center: [16.9515536, 0.116959],
    padding: {
      bottom: 60
    },
    isGlobeUpdating: false,
    environment: {
      atmosphereEnabled: false,
      background: {
        type: "color",
        color: [0,10,16]
      },
      alphaCompositingEnabled: true
    },
    constraints: {
      altitude: {
        max: 35512548,
        min: 10000
      }
    },
    ui: {
      components: []
    }
  },
  ui: {
    isSidebarOpen: false,
    activeOption: '', // mobile
    isFullscreenActive: false, 
    activeCategory: ''
  },
  listeners: false
}