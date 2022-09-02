import React from 'react';
import {
  ADMIN_AREAS_FEATURE_LAYER,
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  AOIS_HISTORIC_PRODUCTION,
  AOIS_HISTORIC_DEVELOPMENT,
  WDPA_OECM_FEATURE_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
} from 'constants/layers-slugs';
import { t } from '@transifex/native';

import {
  BIRDS, AMPHIBIANS, MAMMALS, REPTILES,
} from 'constants/geo-processing-services';

import { getTotalPressures, getMainPressure, roundUpPercentage } from 'utils/analyze-areas-utils';
import { percentageFormat } from 'utils/data-formatting-utils';

const {
  REACT_APP_FEATURE_SPECIFIC_REGIONS_AOI,
  REACT_APP_FEATURE_MERGE_NATIONAL_SUBNATIONAL: FEATURE_MERGE_NATIONAL_SUBNATIONAL
} = process.env;

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
  BIODIVERSITY_SLUG,
];

const SEARCH_SOURCES = {
  ADMINISTRATIVE_BOUNDARIES: ADMIN_AREAS_FEATURE_LAYER,
  NATIONAL_BOUNDARIES: GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  SUBNATIONAL_BOUNDARIES: GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  PROTECTED_AREAS: WDPA_OECM_FEATURE_LAYER,
  FUTURE_PLACES: HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS: SPECIFIC_REGIONS_TILE_LAYER,
};

export const {
  ADMINISTRATIVE_BOUNDARIES, NATIONAL_BOUNDARIES, SUBNATIONAL_BOUNDARIES, PROTECTED_AREAS, FUTURE_PLACES,
} = SEARCH_SOURCES;

export const DEFAULT_SOURCE = FEATURE_MERGE_NATIONAL_SUBNATIONAL ? ADMINISTRATIVE_BOUNDARIES : NATIONAL_BOUNDARIES;


export const getPrecalculatedAOIOptions = () => FEATURE_MERGE_NATIONAL_SUBNATIONAL ? [
  { title: ADMINISTRATIVE_BOUNDARIES, slug: ADMINISTRATIVE_BOUNDARIES, label: t('Administrative boundaries') },
  { title: PROTECTED_AREAS, slug: WDPA_OECM_FEATURE_LAYER, label: t('Protected areas') },
  ...(REACT_APP_FEATURE_SPECIFIC_REGIONS_AOI === 'true') ? [{ title: SPECIFIC_REGIONS_TILE_LAYER, slug: SPECIFIC_REGIONS_TILE_LAYER, label: t('Specific regions') }] : [],
  { title: FUTURE_PLACES, slug: FUTURE_PLACES, label: t('Places for a Half-Earth Future') },
] : [
  { title: NATIONAL_BOUNDARIES, slug: NATIONAL_BOUNDARIES, label: t('National boundaries') },
  { title: SUBNATIONAL_BOUNDARIES, slug: SUBNATIONAL_BOUNDARIES, label: t('Subnational boundaries') },
  { title: PROTECTED_AREAS, slug: WDPA_OECM_FEATURE_LAYER, label: t('Protected areas') },
  ...(REACT_APP_FEATURE_SPECIFIC_REGIONS_AOI === 'true') ? [{ title: SPECIFIC_REGIONS_TILE_LAYER, slug: SPECIFIC_REGIONS_TILE_LAYER, label: t('Specific regions') }] : [],
  { title: FUTURE_PLACES, slug: FUTURE_PLACES, label: t('Places for a Half-Earth Future') },
];

export const AOIS_HISTORIC = process.env.NODE_ENV === 'development' ? AOIS_HISTORIC_DEVELOPMENT : AOIS_HISTORIC_PRODUCTION;

const capPercentage = (percentage) => (percentage > 100 ? 100 : percentage);

// Custom AOIs on the PROTECTION_SLUG rely on percentage instead of protectionPercentage
export const getSidebarCardsConfig = () => ({
  [SPECIES_SLUG]: {
    title: (speciesCount) => (
      <span>
        {t('This area has')}
        <br />
        {t('up to')}
        {' '}
        {speciesCount}
      </span>
    ),
    hint: t('Global high-resolution data is presently available for terrestrial vertebrates. The Half-Earth Project is actively engaged in expanding our taxonomic coverage to other species groups such as ants, bees, butterflies, dragonflies, vascular plants, marine and freshwater fishes, and marine crustaceans.'),
    warning: <span>
      {t('Species summaries are less reliable for areas under 1,000 km')}
      <sup>2</sup>
      {t('; only a portion of these species will be found here.')}
             </span>,
  },
  [BIODIVERSITY_SLUG]: {
    title: t('What is the biodiversity pattern in this area?'),
    description: () => t('Species range maps are summarised in biodiversity richness which informs rarity driving __Half-Earth Project’s__ prioritisation exercise.'),
    warning: t('Biodiversity patterns not available for areas under __1,000 km2__.'),
  },
  [PROTECTION_SLUG]: {
    title: t('What is already protected in this area?'),
    description: ({ protectionPercentage, percentage }) => `${t('Of the current area,')} __${(protectionPercentage || percentage) ? roundUpPercentage(percentageFormat(capPercentage(protectionPercentage || percentage))) : '0'}${t('% of land is under formal protection__.')}`,
    warning: null,
  },
  [LAND_HUMAN_PRESSURES_SLUG]: {
    title: t('How much do humans affect this area?'),
    description: ({ pressures }) => (pressures ? `${t('Of the current area, ')}__${roundUpPercentage(getTotalPressures(pressures))}${t('% is under human pressure__')},
    ${t('the majority of which are pressures from ')}${getMainPressure(pressures)}.` : ''),
    warning: null,
  },
});

export const getSpeciesFilters = () => [
  { slug: 'all', label: t('all terrestrial vertebrates') },
  { slug: BIRDS, label: t('birds') },
  { slug: MAMMALS, label: t('mammals') },
  { slug: REPTILES, label: t('reptiles') },
  { slug: AMPHIBIANS, label: t('amphibians') },
];

export const PRECALCULATED_LAYERS_CONFIG = {
  [ADMIN_AREAS_FEATURE_LAYER]: {
    name: 'NAME_1',
    subtitle: 'GID_0',
  },
  [GADM_0_ADMIN_AREAS_FEATURE_LAYER]: {
    name: 'NAME_0',
  },
  [GADM_1_ADMIN_AREAS_FEATURE_LAYER]: {
    name: 'NAME_1',
    subtitle: 'GID_0',
  },
  [WDPA_OECM_FEATURE_LAYER]: {
    name: 'NAME',
  },
};

export const HIGHER_AREA_SIZE_LIMIT = 35000;
