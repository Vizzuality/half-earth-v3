import React from 'react';
import {
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  AOIS_HISTORIC_PRODUCTION,
  AOIS_HISTORIC_DEVELOPMENT,
  WDPA_OECM_FEATURE_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER
} from 'constants/layers-slugs';

import { BIRDS, AMPHIBIANS, MAMMALS, REPTILES } from 'constants/geo-processing-services';

import { getTotalPressures, getMainPressure, roundUpPercentage } from 'utils/analyze-areas-utils';
import { percentageFormat, localeFormatting } from 'utils/data-formatting-utils';

export const LAND_HUMAN_PRESSURES_SLUG = 'land-human-pressures';
export const MARINE_HUMAN_PRESSURES_SLUG = 'marine-human-pressures';
export const BIODIVERSITY_SLUG = 'biodiversity';
export const PROTECTION_SLUG = 'protected-areas';
export const SPECIES_SLUG = 'species';
export const FUTURE_PLACES_SLUG = 'future-places';
export const SPECIFIC_REGIONS = 'specific-regions';

export const ADDITIONAL_PROTECTION_SLUG = 'additional-protection';

export const AOI_LEGEND_CATEGORIES = [
  LAND_HUMAN_PRESSURES_SLUG,
  BIODIVERSITY_SLUG
]

const SEARCH_SOURCES = {
  NATIONAL_BOUNDARIES: GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  SUBNATIONAL_BOUNDARIES: GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  PROTECTED_AREAS: WDPA_OECM_FEATURE_LAYER,
  FUTURE_PLACES: HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS: SPECIFIC_REGIONS_TILE_LAYER
}

export const { NATIONAL_BOUNDARIES, SUBNATIONAL_BOUNDARIES, PROTECTED_AREAS, FUTURE_PLACES } = SEARCH_SOURCES;

export const DEFAULT_SOURCE = NATIONAL_BOUNDARIES;

const { REACT_APP_FEATURE_PA_AOI, REACT_APP_FEATURE_SPECIFIC_REGIONS_AOI } = process.env;

export const PRECALCULATED_AOI_OPTIONS = [
  { title: NATIONAL_BOUNDARIES, slug: NATIONAL_BOUNDARIES, label: 'National boundaries' },
  { title: SUBNATIONAL_BOUNDARIES, slug: SUBNATIONAL_BOUNDARIES, label: 'Subnational boundaries' },
  ...(REACT_APP_FEATURE_PA_AOI === 'true') ? [{ title: PROTECTED_AREAS, slug: WDPA_OECM_FEATURE_LAYER, label: 'Protected areas' }] : [],
  ...(REACT_APP_FEATURE_SPECIFIC_REGIONS_AOI === 'true') ? [{ title: SPECIFIC_REGIONS_TILE_LAYER, slug: SPECIFIC_REGIONS_TILE_LAYER, label: 'Specific regions' }] : [],
  { title: FUTURE_PLACES, slug: FUTURE_PLACES, label: 'Places for a Half-Earth Future' }
]

export const AOIS_HISTORIC = process.env.NODE_ENV === "development" ? AOIS_HISTORIC_DEVELOPMENT : AOIS_HISTORIC_PRODUCTION;

const capPercentage = (percentage) => percentage > 100 ? 100 : percentage;

// Custom AOIs on the PROTECTION_SLUG rely on percentage instead of protectionPercentage
export const SIDEBAR_CARDS_CONFIG = {
  [SPECIES_SLUG]: {
    title: (speciesCount) => <span>This area has<br />up to {speciesCount}</span>,
    hint: 'Global high-resolution data is presently available for terrestrial vertebrates. The Half-Earth Project is actively engaged in expanding our taxonomic coverage to other species groups such as ants, bees, butterflies, dragonflies, vascular plants, marine and freshwater fishes, and marine crustaceans.',
    warning: <span>Species summaries are less reliable for areas under 1,000 km<sup>2</sup>; only a portion of these species will be found here.</span>
  },
  [BIODIVERSITY_SLUG]: {
    title: 'What is the biodiversity pattern in this area?',
    description: () => 'Species range maps are summarised in biodiversity richness which informs rarity driving __Half-Earth Project’s__ prioritisation exercise.',
    warning: 'Biodiversity patterns not available for areas under __1,000 km2__.'
  },
  [PROTECTION_SLUG]: {
    title: 'What is already protected in this area?',
    description: ({ protectionPercentage, percentage }) => `Of the current area, __${(protectionPercentage || percentage) ? roundUpPercentage(percentageFormat(capPercentage(protectionPercentage || percentage))) : '0'}% of land is under formal protection__.`,
    warning: null
  },
  [LAND_HUMAN_PRESSURES_SLUG]: {
    title: 'How much do humans affect this area?',
    description: ({ pressures }) => pressures ? `Of the current area, __${roundUpPercentage(getTotalPressures(pressures))}% is under human pressure__,
    the majority of which are pressures from ${getMainPressure(pressures)}.` : '',
    warning: null
  },
}

export const SPECIES_FILTERS = [
  { slug: 'all', label: 'all terrestrial vertebrates' },
  { slug: BIRDS, label: 'birds' },
  { slug: MAMMALS, label: 'mammals' },
  { slug: REPTILES, label: 'reptiles' },
  { slug: AMPHIBIANS, label: 'amphibians' },
]

export const DEFAULT_SPECIES_FILTER = { slug: 'all', label: 'all terrestrial vertebrates' };

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
  [GADM_0_ADMIN_AREAS_FEATURE_LAYER]: {
    name: 'NAME_0',
  },
  [GADM_1_ADMIN_AREAS_FEATURE_LAYER]: {
    name: 'NAME_1',
    subtitle: 'GID_0'
  },
  [WDPA_OECM_FEATURE_LAYER]: {
    name: 'NAME',
  },
}

export const HIGHER_AREA_SIZE_LIMIT = 35000;

export const WARNING_MESSAGES = {
  area: {
    title: 'Area size too big',
    description: (size) => (<span>The maximum size for on the fly area analysis is {localeFormatting(HIGHER_AREA_SIZE_LIMIT)} km<sup>2</sup>.
      The area that you are trying to analyze has {localeFormatting(size)} km<sup>2</sup>. Please select a smaller area to trigger the analysis.</span>)
  },
  file: {
    title: 'Something went wrong with your upload',
    description: () => 'Please verify that the .zip file contains at least the .shp, .shx, .dbf, and .prj files components and that the file as a maximum of 2MB.'
  },
  400: {
    title: 'File too big',
    description: () => 'File exceeds the max size allowed of 2MB. Please provide a smaller file to trigger the analysis.'
  },
  500: {
    title: 'Server error',
    description: () => 'An error ocurred during the file upload. Please try again'
  }
}
