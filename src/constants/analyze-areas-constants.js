import {
ECOREGIONS_FEATURE_LAYER,
ADMIN_AREAS_FEATURE_LAYER,
AOIS_HISTORIC_PRODUCTION,
AOIS_HISTORIC_DEVELOPMENT,
WDPA_OECM_FEATURE_LAYER
} from 'constants/layers-slugs';

import { getTotalPressures, getMainPressure} from 'utils/analyze-areas-utils';
import { percentageFormat } from 'utils/data-formatting-utils';

export const LAND_HUMAN_PRESSURES_SLUG = 'land-human-pressures';
export const MARINE_HUMAN_PRESSURES_SLUG = 'marine-human-pressures';
export const BIODIVERSITY_SLUG = 'biodiversity';
export const PROTECTION_SLUG = 'protected-areas';

export const AOI_LEGEND_CATEGORIES = [
  LAND_HUMAN_PRESSURES_SLUG,
  BIODIVERSITY_SLUG
]

const SEARCH_SOURCES = {
  ECOREGIONS: ECOREGIONS_FEATURE_LAYER,
  POLITICAL_BOUNDARIES: ADMIN_AREAS_FEATURE_LAYER,
  PROTECTED_AREAS: WDPA_OECM_FEATURE_LAYER
}

export const { ECOREGIONS, POLITICAL_BOUNDARIES, PROTECTED_AREAS } = SEARCH_SOURCES;

export const DEFAULT_SOURCE = POLITICAL_BOUNDARIES;

export const PRECALCULATED_AOI_OPTIONS = [
  {title: POLITICAL_BOUNDARIES, slug: POLITICAL_BOUNDARIES, label: 'Political boundaries'},
  {title: ECOREGIONS, slug: ECOREGIONS, label: 'Ecoregions'},
  {title: PROTECTED_AREAS, slug: PROTECTED_AREAS, label: 'Protected areas'},
]

export const AOIS_HISTORIC = process.env.NODE_ENV === "development" ? AOIS_HISTORIC_DEVELOPMENT : AOIS_HISTORIC_PRODUCTION;

export const SIDEBAR_CARDS_CONFIG = {
  [BIODIVERSITY_SLUG]: {
    title: 'What is the biodiversity pattern in this area?',
    description: () => 'Species range maps are summarised in biodiversity richness which informs rarity driving __Half-Earth Project’s__ prioritisation exercise.',
  },
  [PROTECTION_SLUG]: {
    title: 'What is already protected in this area?',
    description: ({protectionPercentage}) => `Of the current area, __${percentageFormat(protectionPercentage)}% of land is under formal protection__, 
    the majority of which are protected areas.`,
  },
  [LAND_HUMAN_PRESSURES_SLUG]: {
    title: 'How are humans affecting this area?',
    description: ({pressures}) => `Of the current area, __${getTotalPressures(pressures)}% is under human pressure__,
    the majority of which are pressures from ${getMainPressure(pressures)}.`
  },

} 