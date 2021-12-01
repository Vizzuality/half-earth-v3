import {
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  AOIS_HISTORIC_PRODUCTION,
  AOIS_HISTORIC_DEVELOPMENT,
} from 'constants/layers-slugs';

import { BIRDS, AMPHIBIANS, MAMMALS, REPTILES } from 'constants/geo-processing-services';

import { getTotalPressures, getMainPressure} from 'utils/analyze-areas-utils';
import { percentageFormat, localeFormatting } from 'utils/data-formatting-utils';

export const LAND_HUMAN_PRESSURES_SLUG = 'land-human-pressures';
export const MARINE_HUMAN_PRESSURES_SLUG = 'marine-human-pressures';
export const BIODIVERSITY_SLUG = 'biodiversity';
export const PROTECTION_SLUG = 'protected-areas';

export const AOI_LEGEND_CATEGORIES = [
  LAND_HUMAN_PRESSURES_SLUG,
  BIODIVERSITY_SLUG
]

const SEARCH_SOURCES = {
  NATIONAL_BOUNDARIES: GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  SUBNATIONAL_BOUNDARIES: GADM_1_ADMIN_AREAS_FEATURE_LAYER,
}

export const { NATIONAL_BOUNDARIES, SUBNATIONAL_BOUNDARIES, PROTECTED_AREAS } = SEARCH_SOURCES;

export const DEFAULT_SOURCE = NATIONAL_BOUNDARIES;

export const PRECALCULATED_AOI_OPTIONS = [
  {title: NATIONAL_BOUNDARIES, slug: NATIONAL_BOUNDARIES, label: 'National boundaries'},
  {title: SUBNATIONAL_BOUNDARIES, slug: SUBNATIONAL_BOUNDARIES, label: 'Subnational boundaries'},
]

export const AOIS_HISTORIC = process.env.NODE_ENV === "development" ? AOIS_HISTORIC_DEVELOPMENT : AOIS_HISTORIC_PRODUCTION;

const capPercentage = (percentage) => percentage > 100 ? 100 : percentage;

export const SIDEBAR_CARDS_CONFIG = {
  [BIODIVERSITY_SLUG]: {
    title: 'What is the biodiversity pattern in this area?',
    description: () => 'Species range maps are summarised in biodiversity richness which informs rarity driving __Half-Earth Project’s__ prioritisation exercise.',
    warning: 'Biodiversity patterns not available for areas under __1,000 km2__.'
  },
  [PROTECTION_SLUG]: {
    title: 'What is already protected in this area?',
    description: ({protectionPercentage}) => `Of the current area, __${percentageFormat(capPercentage(protectionPercentage))}% of land is under formal protection__.`,
    warning: null
  },
  [LAND_HUMAN_PRESSURES_SLUG]: {
    title: 'How are humans affecting this area?',
    description: ({pressures}) => `Of the current area, __${getTotalPressures(capPercentage(pressures))}% is under human pressure__,
    the majority of which are pressures from ${getMainPressure(pressures)}.`,
    warning: null
    
  },
} 

export const SPECIES_FILTERS = [
  {slug: 'all', label: 'vertebrates'},
  {slug: BIRDS, label: 'birds'},
  {slug: MAMMALS, label: 'mammals'},
  {slug: REPTILES, label: 'reptiles'},
  {slug: AMPHIBIANS, label: 'amphibians'},
  {slug: 'endangered', label: 'endangered species'},
  {slug: 'flagship', label: 'flagship species'},
]

export const DEFAULT_SPECIES_FILTER = {slug: 'all', label: 'vertebrates'};

export const IUCN_CATEGORIES = {
  EX: 'Extinct',
  EW: 'Extinct in the wild',
  CR: 'Critically endangered',
  EN: 'Endangered',
  VU: 'Vulnerable',
  NT: 'Near threatened',
  LC: 'Least concern',
  DD: 'Data deficient',
  NE: 'Not evaluated',
}

export const PRECALCULATED_LAYERS_CONFIG = {
  [GADM_0_ADMIN_AREAS_FEATURE_LAYER] : {
    name: 'NAME_0',
  },
  [GADM_1_ADMIN_AREAS_FEATURE_LAYER] : {
    name: 'NAME_1',
    subtitle: 'GID_0'
  }
}

export const HIGHER_AREA_SIZE_LIMIT = 35000;

export const WARNING_MESSAGES = {
  area: {
    title: 'Area size too big',
    description: (size) => `The maximum size for an on the fly area analysis is ${localeFormatting(HIGHER_AREA_SIZE_LIMIT)}km2.
    The area that you'er trying to analyze has ${localeFormatting(size)} km2. Please provide an smaller area to trigger the analysis.` 
  },
  400: {
    title: 'File too big',
    description: () => 'File exceeds the max size allowed of 10MB. Please provide a smaller file to trigger the analysis.'
  },
  500: {
    title: 'Server error',
    description: () => 'An error ocurred during the file upload. Please try again'
  }
}