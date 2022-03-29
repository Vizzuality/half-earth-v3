import {
  CITIES_LABELS_LAYER, FEATURED_PLACES_LAYER, GRAPHIC_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER, PRIORITY_POLYGONS_GRAPHIC_LAYER
} from 'constants/layers-slugs';

export default {
  globe: {
    activeLayers: [
      { title: GRAPHIC_LAYER },
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
      { title: CITIES_LABELS_LAYER },
      { title: PRIORITY_POLYGONS_GRAPHIC_LAYER },
      { title: FEATURED_PLACES_LAYER }
    ],
    zoom: 3.8,
    center: [16.9515536, 0.116959],
    padding: {
      left: 300
    },
    isGlobeUpdating: false,
    environment: {
      atmosphereEnabled: false,
      background: {
        type: 'color',
        color: [0, 10, 16]
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
    onBoardingType: null,
    onBoardingStep: 0,
    selectedSidebar: 'featuredMapCard',
    selectedFeaturedMap: 'priorPlaces',
    selectedTaxa: 'all',
    selectedFeaturedPlace: null,
    isFullscreenActive: false,
    activeOption: 'add_layer', // mobile
    isLandscapeMode: false
  },
  listeners: false
};