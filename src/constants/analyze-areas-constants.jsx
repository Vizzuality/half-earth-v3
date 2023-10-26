/* eslint-disable no-underscore-dangle */
import React from 'react';

import { t } from '@transifex/native';
import { T } from '@transifex/react';

import { roundUpPercentage } from 'utils/analyze-areas-utils';
import { percentageFormat } from 'utils/data-formatting-utils';

import {
  BIRDS,
  AMPHIBIANS,
  MAMMALS,
  REPTILES,
} from 'constants/geo-processing-services';
import {
  ADMIN_AREAS_FEATURE_LAYER,
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER,
  AOIS_HISTORIC_PRODUCTION,
  AOIS_HISTORIC_DEVELOPMENT,
  WDPA_OECM_FEATURE_LAYER,
  WDPA_OECM_FEATURE_DATA_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
  HALF_EARTH_FUTURE_WDPA_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
  SPECIFIC_REGIONS_WDPA_LAYER,
} from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';

const { REACT_APP_FEATURE_SPECIFIC_REGIONS_AOI } = process.env;

export const LAND_HUMAN_PRESSURES_SLUG = 'land-human-pressures';
export const MARINE_HUMAN_PRESSURES_SLUG = 'marine-human-pressures';
export const BIODIVERSITY_SLUG = 'biodiversity';
export const PROTECTION_SLUG = 'protected-areas';
export const SPI_SLUG = 'spi';
export const PROTECTED_ATTRIBUTES_SLUG = 'protected_attributes';
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
  ADMINISTRATIVE_BOUNDARIES,
  NATIONAL_BOUNDARIES,
  SUBNATIONAL_BOUNDARIES,
  PROTECTED_AREAS,
  FUTURE_PLACES,
} = SEARCH_SOURCES;

export const DEFAULT_SOURCE = ADMINISTRATIVE_BOUNDARIES;

export const getPrecalculatedAOIOptions = () => [
  {
    title: ADMINISTRATIVE_BOUNDARIES,
    slug: ADMINISTRATIVE_BOUNDARIES,
    label: t('Administrative boundaries'),
  },
  {
    title: PROTECTED_AREAS,
    slug: WDPA_OECM_FEATURE_LAYER,
    label: t('Protected areas'),
  },
  ...(REACT_APP_FEATURE_SPECIFIC_REGIONS_AOI === 'true'
    ? [
        {
          title: SPECIFIC_REGIONS_TILE_LAYER,
          slug: SPECIFIC_REGIONS_TILE_LAYER,
          label: t('Specific regions'),
        },
      ]
    : []),
  {
    title: FUTURE_PLACES,
    slug: FUTURE_PLACES,
    label: t('Places for a Half-Earth Future'),
  },
];

export const AOIS_HISTORIC =
  process.env.NODE_ENV === 'development'
    ? AOIS_HISTORIC_DEVELOPMENT
    : AOIS_HISTORIC_PRODUCTION;

const capPercentage = (percentage) => (percentage > 100 ? 100 : percentage);

export const getProtectedAttributesConfig = (contextualData) => {
  const protectedAttributes = [
    {
      title: t('Designation'),
      value: contextualData.DESIG_E,
      tooltipContent: t(
        'Legal/official designation given at the time a protected area is established.'
      ),
    },
    {
      title: t('Status'),
      value: contextualData.STATUS,
      tooltipContent: t(
        'Describes whether a site has been designated or is currently only proposed through legal or other effective means.'
      ),
    },
    {
      title: t('Status year'),
      value: +contextualData.STATUS_,
      tooltipContent: t(
        'Year in which the protected area or OECM was proposed, inscribed, adopted, designated or established.'
      ),
    },
    {
      title: t('IUCN category'),
      value: contextualData.IUCN_CA,
      tooltipContent: t(
        'Category in which the protected area is classified according to the system developed by the International Union for Conservation of Nature (IUCN).'
      ),
    },
    {
      title: t('Governance'),
      value: contextualData.GOV_TYP,
      tooltipContent: t(
        'Entity responsible and accountable for making decisions about how a protected area or OECM is managed.'
      ),
    },
  ];
  return protectedAttributes;
};

// Custom AOIs on the PROTECTION_SLUG rely on percentage instead of protectionPercentage
export const getSidebarCardsConfig = (locale) => ({
  [SPECIES_SLUG]: {
    title: (speciesCount) =>
      !locale || locale === 'en' ? (
        <T
          _str="This area is expected {br} to have {speciesCount} {br}"
          br={<br />}
          speciesCount={speciesCount}
        />
      ) : (
        <T
          _str="This area is expected to have {speciesCount} {br}"
          br={<br />}
          speciesCount={speciesCount}
        />
      ),
    hint: t(
      'Global high-resolution data is presently available for terrestrial vertebrates. The Half-Earth Project is actively engaged in expanding our taxonomic coverage to other species groups such as ants, bees, butterflies, dragonflies, vascular plants, marine and freshwater fishes, and marine crustaceans.'
    ),
    warning: (
      <T
        _str="Species summaries are less reliable for areas under 1,000 km{sup}; only a portion of these species will be found here."
        sup={<sup>2</sup>}
      />
    ),
  },
  [BIODIVERSITY_SLUG]: {
    title: t('What is the biodiversity pattern in this area?'),
    description: () =>
      t(
        'The species range maps are summarized by biodiversity richness and rarity, providing important insights for prioritizing conservation efforts in the __Half-Earth Project__. Layers for richness, rarity, and priority can be activated in the Map Layers tab in the Biodiversity section.'
      ),
    warning: (
      <T
        _str="Biodiversity patterns not available for areas under __1,000 km{sup}__."
        sup={<sup>2</sup>}
      />
    ),
  },
  [PROTECTION_SLUG]: {
    title: t('What is already protected in this area?'),
    description: ({ protectionPercentage, percentage, DESIG }) => {
      const isProtectedArea = !!DESIG;
      if (isProtectedArea) return null;
      return (
        <T
          _str="Of the current area, __{percentage}% of land is under formal protection__."
          percentage={
            protectionPercentage || percentage
              ? roundUpPercentage(
                  percentageFormat(
                    capPercentage(protectionPercentage || percentage)
                  )
                )
              : '0'
          }
        />
      );
    },
    warning: null,
  },
  [SPI_SLUG]: {
    title: t('Species Protection Index (SPI)'),
    description: () =>
      t(
        'The SPI provides an estimation of how well each country is meeting conservation targets and is the basis for a National Report Card on every country in the world.'
      ),
    warning: null,
  },
  [PROTECTED_ATTRIBUTES_SLUG]: {
    title: t('Protected Area attributes'),
    description: () => '',
    warning: null,
  },
  [LAND_HUMAN_PRESSURES_SLUG]: {
    title: t('How much do humans affect this area?'),
    description: ({ pressures }) => {
      if (
        !pressures ||
        Object.values(pressures).every(
          (p) => !p || p.length === 0 || p.every((v) => v.value === 0)
        )
      ) {
        // em = *{highHumanPressure}* is used here for the tooltip
        return `${t('The current area is not facing {highHumanPressures}', {
          highHumanPressures: `*${t('high human pressures')}*`,
        })}`;
      }

      // em = *{highHumanPressure}* is used here for the tooltip
      return `${t(
        'The current area is facing {highHumanPressure} from the following pressures. The percentage figures refer to the latest year of the time series (2017).',
        {
          highHumanPressure: `*${t('high human pressure')}*`,
        }
      )}`;
    },
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

// Custom AOIs don't have a precalculated layer
export const PRECALCULATED_LAYERS_SLUG = {
  national: GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  subnational: GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  protectedAreas: WDPA_OECM_FEATURE_LAYER,
  futurePlaces: HALF_EARTH_FUTURE_TILE_LAYER,
  specificRegions: SPECIFIC_REGIONS_TILE_LAYER,
};

export const PRECALCULATED_LAYERS_PROTECTED_AREAS_DATA_URL = {
  [PRECALCULATED_LAYERS_SLUG.national]:
    LAYERS_URLS[GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER],
  [PRECALCULATED_LAYERS_SLUG.subnational]:
    LAYERS_URLS[GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER],
  [PRECALCULATED_LAYERS_SLUG.protectedAreas]:
    LAYERS_URLS[WDPA_OECM_FEATURE_DATA_LAYER],
  [PRECALCULATED_LAYERS_SLUG.futurePlaces]:
    LAYERS_URLS[HALF_EARTH_FUTURE_WDPA_LAYER],
  [PRECALCULATED_LAYERS_SLUG.specificRegions]:
    LAYERS_URLS[SPECIFIC_REGIONS_WDPA_LAYER],
};

export const HIGHER_AREA_SIZE_LIMIT = 35000;
