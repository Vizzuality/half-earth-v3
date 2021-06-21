import { LAYER_VARIANTS } from 'constants/biodiversity-layers-constants';

export const LOCAL_SCENE_TABS_SLUGS = {
  OVERVIEW: 'overview',
  CHALLENGES: 'challenges',
  RANKING: 'ranking',
}

export const LOCAL_SCENE_DEFAULT_TAB = LOCAL_SCENE_TABS_SLUGS.OVERVIEW;

export const LOCAL_SCENE_TABS = [
  {slug: LOCAL_SCENE_TABS_SLUGS.OVERVIEW, title: 'overview'},
  {slug: LOCAL_SCENE_TABS_SLUGS.CHALLENGES, title: 'challenges'},
  {slug: LOCAL_SCENE_TABS_SLUGS.RANKING, title: 'ranking'},
]

export const BIODIVERSITY_TABS_SLUGS = LAYER_VARIANTS;

export const BIODIVERSITY_DEFAULT_TAB = BIODIVERSITY_TABS_SLUGS.PRIORITY;

export const BIODIVERSITY_TABS = [
  {slug: BIODIVERSITY_TABS_SLUGS.PRIORITY, title: BIODIVERSITY_TABS_SLUGS.PRIORITY},
  {slug: BIODIVERSITY_TABS_SLUGS.RICHNESS, title: BIODIVERSITY_TABS_SLUGS.RICHNESS},
  {slug: BIODIVERSITY_TABS_SLUGS.RARITY, title: BIODIVERSITY_TABS_SLUGS.RARITY},
]

export const MODALS = {
  HE: 'HE',
  SPECIES: 'SPECIES',
}


export const ABOUT_TABS = {
  PARTNERS: 'partners',
  INSTRUCTIONS: 'map_instructions'
}