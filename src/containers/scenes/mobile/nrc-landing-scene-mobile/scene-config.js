import {
  GRAPHIC_LAYER,
  GLOBAL_SPI_FEATURE_LAYER,
  CITIES_LABELS_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  EEZ_MARINE_AND_LAND_BORDERS,
  FIREFLY_BASEMAP_LAYER,
  SATELLITE_BASEMAP_LAYER,
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
    zoom: 1.8,
    center: [16.9515536, 0.116959],
    padding: {
      left: 0,
      top: -220,
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
    basemap: {
      layersArray: [FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER],
    },
    // Remove the extra header on the popup
    popup: {
      dockOptions: {
        buttonEnabled: false,
      },
      visibleElements: {
        actionBar: false,
        closeButton: false,
        collapseButton: false,
        featureNavigation: false,
        heading: false,
        spinner: false,
      },
    },
  },
  ui: {
    isSidebarOpen: false,
    isFullscreenActive: false,
    activeCategory: '',
    sceneMode: 'data',
  },
};
