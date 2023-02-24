import {
  MASK_LAYER,
  GRAPHIC_LAYER,
  CITIES_LABELS_LAYER,
  LAND_COUNTRY_PRIORITY_LAYER,
  MARINE_COUNTRY_PRIORITY_LAYER,
  TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER,
  MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  EEZ_MARINE_AND_LAND_BORDERS,
} from 'constants/layers-slugs';
import { DEFAULT_OPACITY } from 'constants/mol-layers-configs.js';

export default {
  activeLayers: [
    { title: MASK_LAYER },
    { title: GRAPHIC_LAYER },
    { title: CITIES_LABELS_LAYER },
    { title: COUNTRIES_LABELS_FEATURE_LAYER },
    { title: LANDSCAPE_FEATURES_LABELS_LAYER },
    { title: EEZ_MARINE_AND_LAND_BORDERS, opacity: DEFAULT_OPACITY },
    { title: LAND_COUNTRY_PRIORITY_LAYER, opacity: DEFAULT_OPACITY },
    { title: MARINE_COUNTRY_PRIORITY_LAYER, opacity: DEFAULT_OPACITY },
    { title: TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER, opacity: DEFAULT_OPACITY },
    {
      title: MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER,
      opacity: DEFAULT_OPACITY,
    },
  ],
  zoom: 3.8,
  center: [16.9515536, 0.116959],
  padding: {
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
  constraints: {
    tilt: {
      max: 60,
    },
  },
};
