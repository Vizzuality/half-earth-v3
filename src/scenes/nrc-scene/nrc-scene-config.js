import {
  GRAPHIC_LAYER,
  COUNTRY_MASK_LAYER,
  CITIES_LABELS_LAYER,
  COUNTRY_PRIORITY_LAYER,
  MERGED_WDPA_VECTOR_TILE_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER,
} from 'constants/layers-slugs';

import { DEFAULT_OPACITY } from 'constants/mol-layers-configs.js'

export default {
  activeLayers: [
    { title: GRAPHIC_LAYER },
    { title: COUNTRY_MASK_LAYER },
    { title: CITIES_LABELS_LAYER },
    { title: COUNTRIES_LABELS_FEATURE_LAYER },
    { title: LANDSCAPE_FEATURES_LABELS_LAYER },
    { title: COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER },
    { title: COUNTRY_PRIORITY_LAYER, opacity: DEFAULT_OPACITY },
    { title: MERGED_WDPA_VECTOR_TILE_LAYER, opacity: DEFAULT_OPACITY }
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