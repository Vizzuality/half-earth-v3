import {
  FIREFLY_BASEMAP_LAYER,
  GRAPHIC_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  ALL_TAXA_RARITY,
  MERGED_WDPA_VECTOR_TILE_LAYER,
  COUNTRY_MASK_LAYER,
  COUNTRY_PRIORITY_LAYER,
} from 'constants/layers-slugs';

import { DEFAULT_OPACITY, LAYERS_CATEGORIES } from 'constants/mol-layers-configs'

export const COUNTRY_SCENE_INITIAL_STATE = {
  globe: {
    activeLayers: [
      { title: GRAPHIC_LAYER },
      { title: COUNTRY_MASK_LAYER },
      { title: CITIES_LABELS_LAYER },
      { title: FIREFLY_BASEMAP_LAYER },
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
      { title: COUNTRY_PRIORITY_LAYER, opacity: 0.4 },
      { title: MERGED_WDPA_VECTOR_TILE_LAYER, opacity: 0.4 }
    ],
  },
  ui: {
    sceneMode:'local'
  },
  listeners: false
}

export const DATA_SCENE_INITIAL_STATE = {
  globe: {
    activeLayers: [
      { title: GRAPHIC_LAYER },
      { title: CITIES_LABELS_LAYER },
      { title: FIREFLY_BASEMAP_LAYER },
      { title: COUNTRIES_LABELS_FEATURE_LAYER },
      { title: LANDSCAPE_FEATURES_LABELS_LAYER },
      { title: ALL_TAXA_RARITY, opacity: DEFAULT_OPACITY, category: LAYERS_CATEGORIES.BIODIVERSITY }
    ],
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

export const LOCAL_SPATIAL_REFERENCE = 102100;
export const LOCAL_SCENE = 'local';
export const DATA_SCENE = 'data';