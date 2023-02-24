import {
  GRAPHIC_LAYER,
  GLOBAL_SPI_FEATURE_LAYER,
  CITIES_LABELS_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  EEZ_MARINE_AND_LAND_BORDERS,
} from 'constants/layers-slugs';
import { BASEMAP_OPACITY } from 'constants/mol-layers-configs';

export default {
  globe: {
    activeLayers: [
      { title: GRAPHIC_LAYER },
      { title: CITIES_LABELS_LAYER },
      { title: COUNTRIES_LABELS_FEATURE_LAYER },
      { title: EEZ_MARINE_AND_LAND_BORDERS, opacity: 0 },
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
      { title: GLOBAL_SPI_FEATURE_LAYER, opacity: BASEMAP_OPACITY },
    ],
    zoom: 3.8,
    padding: {
      left: 300,
    },
    center: [-66.9515536, 0.116959],
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
