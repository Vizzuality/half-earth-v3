import { t } from '@transifex/native';

import { LAYER_VARIANTS } from 'constants/biodiversity-layers-constants';

export const getSidebarTabs = () => [
  { slug: 'map-layers', title: t('Map Layers') },
  { slug: 'analyze-areas', title: t('Analyze Areas') },
];

export const LOCAL_SCENE_TABS_SLUGS = {
  OVERVIEW: 'overview',
  CHALLENGES: 'challenges',
  RANKING: 'ranking',
};

export const LOCAL_SCENE_DEFAULT_TAB = LOCAL_SCENE_TABS_SLUGS.OVERVIEW;

const BIODIVERSITY_TABS_SLUGS = LAYER_VARIANTS;

export const BIODIVERSITY_DEFAULT_TAB = BIODIVERSITY_TABS_SLUGS.PRIORITY;

export const getBiodiversityTabs = () => {
  const LAYER_VARIANTS_LABELS = {
    PRIORITY: t('priority'),
    RICHNESS: t('richness'),
    RARITY: t('rarity'),
  };

  return [
    {
      slug: BIODIVERSITY_TABS_SLUGS.PRIORITY,
      title: LAYER_VARIANTS_LABELS.PRIORITY,
    },
    {
      slug: BIODIVERSITY_TABS_SLUGS.RICHNESS,
      title: LAYER_VARIANTS_LABELS.RICHNESS,
    },
    {
      slug: BIODIVERSITY_TABS_SLUGS.RARITY,
      title: LAYER_VARIANTS_LABELS.RARITY,
    },
  ];
};

export const MODALS = {
  HE: 'HE',
  SPECIES: 'SPECIES',
};

export const ABOUT_TABS = {
  PARTNERS: 'partners',
  INSTRUCTIONS: 'map_instructions',
};
