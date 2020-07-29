import {
  FIREFLY_BASEMAP_LAYER,
  GRAPHIC_LAYER,
  COUNTRY_PRIORITY_LAYER,
  MERGED_WDPA_VECTOR_TILE_LAYER,
  COUNTRY_MASK_LAYER
} from 'constants/layers-slugs';

export const COUNTRY_SCENE_INITIAL_STATE = {
  globe: {
    activeLayers: [
      { title: GRAPHIC_LAYER },
      { title: COUNTRY_MASK_LAYER },
      { title: FIREFLY_BASEMAP_LAYER },
      { title: COUNTRY_PRIORITY_LAYER, opacity: 0.6 },
      { title: MERGED_WDPA_VECTOR_TILE_LAYER, opacity: 0.4 }
    ],
    countryISO:'MOZ',
    countryName: 'Mozambique',
    padding: {
      bottom: 60,
      left: 300
    },
    isGlobeUpdating: false,
    environment: {
      background: {
        type: "color",
        color: [0, 0, 0, 0]
      },
      starsEnabled: false,
      atmosphereEnabled: false
    },
    ui: {
      components: []
    },
    viewingMode: 'local',
    constraints: {
      tilt: {
        max: 60
      }
    },
  },
  ui: {},
  listeners: false
}

export const LOCAL_SPATIAL_REFERENCE = 102100;