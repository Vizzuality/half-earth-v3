import { LAYER_VARIANTS, LAYER_VARIANTS_LABELS } from 'constants/biodiversity-layers-constants';
import { t } from '@transifex/native';

export const LOCAL_SCENE_TABS_SLUGS = {
  OVERVIEW: 'overview',
  CHALLENGES: 'challenges',
  RANKING: 'ranking',
}

export const LOCAL_SCENE_DEFAULT_TAB = LOCAL_SCENE_TABS_SLUGS.OVERVIEW;

export const LOCAL_SCENE_TABS = [
  {slug: LOCAL_SCENE_TABS_SLUGS.OVERVIEW, title: t('overview')},
  {slug: LOCAL_SCENE_TABS_SLUGS.CHALLENGES, title: t('challenges')},
  {slug: LOCAL_SCENE_TABS_SLUGS.RANKING, title: t('ranking')},
]

const BIODIVERSITY_TABS_SLUGS = LAYER_VARIANTS;

export const BIODIVERSITY_DEFAULT_TAB = BIODIVERSITY_TABS_SLUGS.PRIORITY;

export const BIODIVERSITY_TABS = [
  {slug: BIODIVERSITY_TABS_SLUGS.PRIORITY, title: LAYER_VARIANTS_LABELS.PRIORITY},
  {slug: BIODIVERSITY_TABS_SLUGS.RICHNESS, title:LAYER_VARIANTS_LABELS.RICHNESS},
  {slug: BIODIVERSITY_TABS_SLUGS.RARITY, title: LAYER_VARIANTS_LABELS.RARITY},
]

export const MODALS = {
  HE: 'HE',
  SPECIES: 'SPECIES',
}


export const ABOUT_TABS = {
  PARTNERS: 'partners',
  INSTRUCTIONS: 'map_instructions'
}
