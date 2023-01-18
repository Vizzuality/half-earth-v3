import {
  GRAPHIC_LAYER,
  CITIES_LABELS_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
} from 'constants/layers-slugs';

export default {
  globe: {
    activeLayers: [
      { title: GRAPHIC_LAYER },
      { title: CITIES_LABELS_LAYER },
      { title: COUNTRIES_LABELS_FEATURE_LAYER },
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
    ],
    zoom: 1.8,
    padding: {
      left: 0,
      top: -300,
    },
    isGlobeUpdating: false,
    environment: {
      atmosphereEnabled: false,
      background: {
        type: 'color',
        color: [0, 10, 16],
      },
      alphaCompositingEnabled: true,
    },
    viewingMode: 'global',
    constraints: {
      altitude: {
        max: 35512548,
        min: 10000,
      },
    },
    ui: {
      components: [],
    },
  },
  ui: {
    isSidebarOpen: false,
    isFullscreenActive: false,
    activeCategory: '',
    sceneMode: 'data',
  },
};
