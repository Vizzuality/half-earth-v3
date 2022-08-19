import {
  LOCAL_SCENE_TABS_SLUGS,
  BIODIVERSITY_DEFAULT_TAB,
} from 'constants/ui-params';
import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';

export const NRC_UI_DEFAULTS = {
  sceneMode: 'local',
  countryChallengesSelectedFilter: 'filter_steward',
  view: LOCAL_SCENE_TABS_SLUGS.OVERVIEW,
  localSceneActiveTab: LOCAL_SCENE_TABS_SLUGS.OVERVIEW,
  countryChallengesSelectedKey: [COUNTRY_ATTRIBUTES.nspecies_ter],
  biodiversityLayerVariant: BIODIVERSITY_DEFAULT_TAB,
  speciesModalSearch: null,
  speciesModalSort: null,
  rankingSearch: null,
  sortRankingCategory: null,
};
