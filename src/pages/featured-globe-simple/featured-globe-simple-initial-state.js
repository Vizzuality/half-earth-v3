import {
  VIBRANT_BASEMAP_LAYER,
  GRID_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER
} from 'constants/layers-slugs';

export default {
  globe: {
    activeLayers: [
      { title: VIBRANT_BASEMAP_LAYER },
      { title: GRID_LAYER },
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
      { title: CITIES_LABELS_LAYER }
    ],
    zoom: 1,
    center: [16.9515536, 0.116959],
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
    selectedSidebar: 'featuredMapCard',
    selectedFeaturedMap: 'priorPlaces',
    selectedTaxa: 'all',
    selectedFeaturedPlace: null,
    isFullscreenActive: false
  },
  listeners: false
}