import {
  GRAPHIC_LAYER,
  GLOBAL_SPI_FEATURE_LAYER,
  MARINE_SPI_FEATURE_LAYER,
  CITIES_LABELS_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER,
} from 'constants/layers-slugs';

const { REACT_APP_FEATURE_MARINE } = process.env;

export default {
  globe: {
    activeLayers: [
      { title: GRAPHIC_LAYER },
      { title: CITIES_LABELS_LAYER },
      { title: COUNTRIES_LABELS_FEATURE_LAYER },
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
      { title: COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER },
      { title: GLOBAL_SPI_FEATURE_LAYER },
      ...(REACT_APP_FEATURE_MARINE ? [{ title: MARINE_SPI_FEATURE_LAYER }] : [])
    ],
    zoom: 3.8,
    padding: {
      left: 300
    },
    center: [-66.9515536, 0.116959],
    isGlobeUpdating: false,
    environment: {
      atmosphereEnabled: false,
      background: {
        type: "color",
        color: [0, 10, 16]
      },
      alphaCompositingEnabled: true
    },
    viewingMode: 'global',
    constraints: {
      altitude: {
        max: 35512548,
        min: 10000
      }
    },
    ui: {
      components: []
    },
  },
  ui: {
    isSidebarOpen: false,
    activeOption: 'add_layer', // mobile
    isFullscreenActive: false,
    activeCategory: '',
    sceneMode: 'data'
  },
  listeners: false
}
