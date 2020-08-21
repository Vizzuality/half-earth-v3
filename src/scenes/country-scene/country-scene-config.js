import {
  FIREFLY_BASEMAP_LAYER,
  GRAPHIC_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  MERGED_WDPA_VECTOR_TILE_LAYER,
  COUNTRY_MASK_LAYER,
  COUNTRY_PRIORITY_LAYER,
} from 'constants/layers-slugs';


export default {
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
  ui: {
    sceneMode:'local',
    countryChallengesSelectedFilter: 'filter_steward',
    localSceneActiveTab: 'map',
    countryChallengesSelectedKey: 'N_SPECIES'
  },
  listeners: false
}