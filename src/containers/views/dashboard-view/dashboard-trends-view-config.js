import {
  GRAPHIC_LAYER,
  CITIES_LABELS_LAYER,
  REGIONS_LABELS_LAYER,
  ADMIN_AREAS_FEATURE_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  FIREFLY_BASEMAP_LAYER,
  SATELLITE_BASEMAP_LAYER,
} from 'constants/layers-slugs';

export default {
  view: {
    activeLayers: [
      { title: GRAPHIC_LAYER },
      { title: CITIES_LABELS_LAYER },
      { title: REGIONS_LABELS_LAYER, opacity: 0 },
      { title: COUNTRIES_LABELS_FEATURE_LAYER },
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
      { title: ADMIN_AREAS_FEATURE_LAYER },
    ],
    highlightOptions:{
      color: [255, 255, 0, 1], // bright yellow
      haloOpacity: 0.9,
      fillOpacity: 0.2
    },
    padding: {
      left: 200,
    },
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
      minZoom: 3,
      rotationEnabled: false,
      snapToZoom: false,
      minScale: 147914381,
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
