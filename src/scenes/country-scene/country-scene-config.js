import {
  GRAPHIC_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  MERGED_WDPA_VECTOR_TILE_LAYER,
  COUNTRY_MASK_LAYER,
  COUNTRY_PRIORITY_LAYER,
} from 'constants/layers-slugs';

import {
  LOCAL_SCENE_TABS_SLUGS,
  BIODIVERSITY_DEFAULT_TAB
} from 'constants/ui-params';

export default {
  globe: {
    activeLayers: [
      { title: GRAPHIC_LAYER },
      { title: COUNTRY_MASK_LAYER },
      { title: CITIES_LABELS_LAYER },
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
        type: 'color',
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
    }
  },
  ui: {
    sceneMode: 'local',
    countryChallengesSelectedFilter: 'filter_steward',
    localSceneActiveTab: LOCAL_SCENE_TABS_SLUGS.OVERVIEW,
    countryChallengesSelectedKey: 'N_SPECIES',
    biodiversityLayerVariant: BIODIVERSITY_DEFAULT_TAB,
    speciesModalSearch: null,
    speciesModalSort: null,
    rankingSearch: null,
    sortRankingCategory: null
  },
  listeners: false
};