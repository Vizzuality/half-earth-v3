import {
  GRAPHIC_LAYER,
  ALL_TAXA_PRIORITY,
  CITIES_LABELS_LAYER,
  REGIONS_LABELS_LAYER,
  ADMIN_AREAS_FEATURE_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  FIREFLY_BASEMAP_LAYER,
  SATELLITE_BASEMAP_LAYER,
} from 'constants/layers-slugs';
import {
  DEFAULT_OPACITY,
  LAYERS_CATEGORIES,
} from 'constants/mol-layers-configs';

export default {
  globe: {
    activeLayers: [
      { title: GRAPHIC_LAYER },
      { title: CITIES_LABELS_LAYER },
      { title: REGIONS_LABELS_LAYER, opacity: 0 },
      { title: COUNTRIES_LABELS_FEATURE_LAYER },
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
      {
        title: ALL_TAXA_PRIORITY,
        opacity: DEFAULT_OPACITY,
        category: LAYERS_CATEGORIES.BIODIVERSITY,
      },
      { title: ADMIN_AREAS_FEATURE_LAYER },
    ],
    zoom: 3.8,
    center: [16.9515536, 0.116959],
    padding: {
      left: 300,
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
    isGlobeUpdating: false,
    environment: {
      atmosphereEnabled: false,
      background: {
        type: 'color',
        color: [0, 10, 16],
      },
      alphaCompositingEnabled: true,
    },
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
  },
  ui: {
    isSidebarOpen: false,
    isFullscreenActive: false,
    activeCategory: '',
    sceneMode: 'data',
    selectedAnalysisLayer: ADMIN_AREAS_FEATURE_LAYER,
  },
};
