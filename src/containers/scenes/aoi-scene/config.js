import {
  MASK_LAYER,
  GRAPHIC_LAYER,
  CITIES_LABELS_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER
} from 'constants/layers-slugs';


export default {
  activeLayers: [
    { title: MASK_LAYER },
    { title: GRAPHIC_LAYER },
    { title: CITIES_LABELS_LAYER },
    { title: LANDSCAPE_FEATURES_LABELS_LAYER },
    { title: PROTECTED_AREAS_VECTOR_TILE_LAYER },
  ],
  padding: {
    bottom: 60,
    left: 300
  },
  isGlobeUpdating: false,
  environment: {
    background: {
      type: 'color',
      color: [0, 0, 0, 0]
    },
    starsEnabled: false,
    atmosphereEnabled: false
  },
  ui: {
    components: []
  },
  constraints: {
    tilt: {
      max: 60
    }
  }
};