import {
  MASK_LAYER,
  GRAPHIC_LAYER,
  CITIES_LABELS_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  FIREFLY_BASEMAP_LAYER,
  SATELLITE_BASEMAP_LAYER,
} from 'constants/layers-slugs';

// ! All the 'map layers tab' layers should have a category attribute
export default {
  activeLayers: [
    { title: MASK_LAYER },
    { title: GRAPHIC_LAYER },
    { title: CITIES_LABELS_LAYER },
    { title: LANDSCAPE_FEATURES_LABELS_LAYER },
    { title: PROTECTED_AREAS_VECTOR_TILE_LAYER, category: 'Protection' },
  ],
  padding: {
    bottom: 60,
    left: 300,
  },
  isGlobeUpdating: false,
  environment: {
    background: {
      type: 'color',
      color: [0, 0, 0, 0],
    },
    starsEnabled: false,
    atmosphereEnabled: false,
  },
  ui: {
    components: [],
  },
  basemap: {
    layersArray: [FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER],
  },
  constraints: {
    tilt: {
      max: 60,
    },
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
};
