import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';
import { t } from '@transifex/native';

export const INDICATOR_LABELS = {
  [COUNTRY_ATTRIBUTES.nspecies_ter]: t('Number of vertebrate species'),
  [COUNTRY_ATTRIBUTES.total_endemic_ter]: t('Number of endemic vertebrate species'),
  [COUNTRY_ATTRIBUTES.prop_protected_ter]: t('Proportion of land protected'),
  [COUNTRY_ATTRIBUTES.protection_needed_ter]: t('Additional land protection needed'),
  [COUNTRY_ATTRIBUTES.hm_vh_ter]: t('Proportion of very high human modification'),
  [COUNTRY_ATTRIBUTES.Pop2020]: `${t('Population ')}(${COUNTRY_ATTRIBUTES['2020']})`,
  'GNI_PPP': t('Gross National Income (GNI)'),
};

export const CONTINENTS = [
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North america',
  'South america',
  'Oceania',
];

export const CONTINENT_COLORS = {
  'Africa': '#34BD92',
  'Antarctica': '#92EB57',
  'Asia': '#3AA8EE',
  'Europe': '#FFDE00',
  'North America': '#8B62E9',
  'Oceania': '#E87926',
  'Australia': '#E87926',
  'South America': '#EB588F'
}

export const FILTERS_DICTIONARY = {
  filter_continent: t('by continent'),
  filter_neigh: t('by proximity'),
  [`filter_${COUNTRY_ATTRIBUTES.Area_Country}`]: t('with similar area'),
  [`filter_${COUNTRY_ATTRIBUTES.Pop2020}`]: t('with similar population size'),
  [`filter_${COUNTRY_ATTRIBUTES.prop_protected_ter}`]: t('with similar proportion of protection'),
  filter_prop_protected_mar: t('with similar proportion of protection'),
  [`filter_${COUNTRY_ATTRIBUTES.hm_vh_ter}`]: t('with similar proportion of very high human encroachment'),
  filter_hm_vh_mar: t('with similar proportion of very high human encroachment'),
  [`filter_${COUNTRY_ATTRIBUTES.protection_needed_ter}`]: t('with similar proportion of protection needed'),
  filter_protection_needed_mar: t('with similar proportion of protection needed'),
  filter_GNI_PPP: t('with similar Gross National Income'),
  [`filter_${COUNTRY_ATTRIBUTES.total_endemic_ter}`]: t('with similar number of endemic species'),
  filter_total_endemic_mar: t('with similar number of endemic species'),
  [`filter_${COUNTRY_ATTRIBUTES.nspecies_ter}`]: t('with similar number of vertebrate species'),
  filter_nspecies_mar: t('with similar number of vertebrate species'),
  [`filter_${COUNTRY_ATTRIBUTES.SPI_ter}`]: t('with similar species Protection Index'),
  filter_SPI_mar: t('with similar species Protection Index'),
  filter_steward: t('with shared stewardship')
};

export const LAND_MARINE_COUNTRY_ATTRIBUTES = {
  land: {
    hm_vh: COUNTRY_ATTRIBUTES.hm_vh_ter,
    hm: COUNTRY_ATTRIBUTES.hm_ter,
    prop_protected: COUNTRY_ATTRIBUTES.prop_protected_ter,
    prop_hm_0: COUNTRY_ATTRIBUTES.prop_hm_0_ter,
    prop_hm_very_high: COUNTRY_ATTRIBUTES.prop_hm_very_high_ter,
    protection_needed: COUNTRY_ATTRIBUTES.protection_needed_ter,
    total_endemic: COUNTRY_ATTRIBUTES.total_endemic_ter,
    nspecies: COUNTRY_ATTRIBUTES.nspecies_ter,
    SPI: COUNTRY_ATTRIBUTES.SPI_ter,
    similar: COUNTRY_ATTRIBUTES.similar_ter,
    nspecies_richness: COUNTRY_ATTRIBUTES.nspecies_richness_ter,
    hm_no: COUNTRY_ATTRIBUTES.hm_no_ter
  },
  marine: {
    hm_vh: 'hm_vh_mar',
    hm: 'hm_mar',
    prop_protected: 'prop_protected_mar',
    prop_hm_very_high: 'prop_hm_very_high_mar',
    prop_hm_0: 'prop_hm_0_mar',
    protection_needed: 'protection_needed_mar',
    total_endemic: 'total_endemic_mar',
    nspecies: 'nspecies_mar',
    SPI: 'SPI_mar',
    similar: 'similar_mar',
    nspecies_richness: 'nspecies_mar',
    hm_no: 'hm_no_mar'
  }
};

export const getChallengesRelatedFilterOptions = (landMarineSelection) => {
  const attributes = LAND_MARINE_COUNTRY_ATTRIBUTES[landMarineSelection];
  return [
    {slug: 'filter_continent', label: FILTERS_DICTIONARY.filter_continent},
    {slug: 'filter_neigh', label: FILTERS_DICTIONARY.filter_neigh},
    {slug: `filter_${COUNTRY_ATTRIBUTES.Area_Country}`, label: FILTERS_DICTIONARY[`filter_${COUNTRY_ATTRIBUTES.Area_Country}`]},
    {slug: `filter_${COUNTRY_ATTRIBUTES.Pop2020}`, label: FILTERS_DICTIONARY[`filter_${COUNTRY_ATTRIBUTES.Pop2020}`]},
    {slug: `filter_${attributes.prop_protected}`, label: FILTERS_DICTIONARY[`filter_${attributes.prop_protected}`]},
    {slug: `filter_${attributes.hm_vh}`, label: FILTERS_DICTIONARY[`filter_${attributes.hm_vh}`]},
    {slug: `filter_${attributes.protection_needed}`, label: FILTERS_DICTIONARY[`filter_${attributes.protection_needed}`]},
    {slug: 'filter_GNI_PPP', label: FILTERS_DICTIONARY.filter_GNI_PPP},
    {slug: `filter_${attributes.total_endemic}`, label: FILTERS_DICTIONARY[`filter_${attributes.total_endemic}`]},
    {slug: `filter_${attributes.nspecies}`, label: FILTERS_DICTIONARY[`filter_${attributes.nspecies}`]},
    {slug: `filter_${attributes.SPI}`, label: FILTERS_DICTIONARY[`filter_${attributes.SPI}`]},
    {slug: 'filter_steward', label: FILTERS_DICTIONARY.filter_steward}
  ];
};

export const RANKING_INDICATORS = {
  spi: 'spi',
  speciesRichness: 'speciesRichness',
  nonEndemic: 'nonEndemic',
  endemic: 'endemic',
  veryHigh: 'veryHigh',
  totalMinusVeryHigh: 'totalMinusVeryHigh',
  noModification: 'noModification',
  protected: 'protected',
  protectionNeeded: 'protectionNeeded',
  protectionNotNeeded: 'protectionNotNeeded',
};

export const RANKING_COLORS = {
  [RANKING_INDICATORS.nonEndemic]: '#F87200',
  [RANKING_INDICATORS.endemic]: '#F8D300',
  [RANKING_INDICATORS.veryHigh]: '#731CFF',
  [RANKING_INDICATORS.totalMinusVeryHigh]: '#B284FD',
  [RANKING_INDICATORS.noModification]: '#A0AFB8',
  [RANKING_INDICATORS.protected]: '#008604',
  [RANKING_INDICATORS.protectionNeeded]: '#B3E74B',
  [RANKING_INDICATORS.protectionNotNeeded]: '#AFB8A0',
}

export const RANKING_GROUPS_SLUGS = {
  species: 'species',
  humanModification: 'humanModification',
  protection: 'protection'
};

export const RANKING_INDICATOR_GROUPS = {
  [RANKING_INDICATORS.nonEndemic]: RANKING_GROUPS_SLUGS.species,
  [RANKING_INDICATORS.endemic]: RANKING_GROUPS_SLUGS.species,
  [RANKING_INDICATORS.veryHigh]: RANKING_GROUPS_SLUGS.humanModification,
  [RANKING_INDICATORS.totalMinusVeryHigh]: RANKING_GROUPS_SLUGS.humanModification,
  [RANKING_INDICATORS.noModification]: RANKING_GROUPS_SLUGS.humanModification,
  [RANKING_INDICATORS.protected]: RANKING_GROUPS_SLUGS.protection,
  [RANKING_INDICATORS.protectionNeeded]: RANKING_GROUPS_SLUGS.protection,
  [RANKING_INDICATORS.protectionNotNeeded]: RANKING_GROUPS_SLUGS.protection
};

export const RANKING_LEGEND = {
  [RANKING_GROUPS_SLUGS.species]: {
    [RANKING_INDICATORS.nonEndemic]: t('Non endemic species'),
    [RANKING_INDICATORS.endemic]: t('Endemic species'),
  },
  [RANKING_GROUPS_SLUGS.humanModification]: {
    [RANKING_INDICATORS.veryHigh]: t('Very high human modification'),
    [RANKING_INDICATORS.totalMinusVeryHigh]: t('Human modification'),
    [RANKING_INDICATORS.noModification]: t('No human modification'),
  },
  [RANKING_GROUPS_SLUGS.protection]: {
    [RANKING_INDICATORS.protected]: t('Current protection'),
    [RANKING_INDICATORS.protectionNeeded]: t('Additional protection needed'),
    [RANKING_INDICATORS.protectionNotNeeded]: t('No formal protection needed'),
  },
};

export const SORT_GROUPS_SLUGS = { spi: 'spi', ...RANKING_GROUPS_SLUGS };
export const SORT_GROUPS = [SORT_GROUPS_SLUGS.species, SORT_GROUPS_SLUGS.humanModification, SORT_GROUPS_SLUGS.protection, SORT_GROUPS_SLUGS.spi];

export const RANKING_HEADER_LABELS = {
  [SORT_GROUPS_SLUGS.species]: t('species'),
  [SORT_GROUPS_SLUGS.humanModification]: t('human modification'),
  [SORT_GROUPS_SLUGS.protection]: t('protection'),
  [SORT_GROUPS_SLUGS.spi]: t('spi'),
}
export const SORT_OPTIONS = [
  { label: t('species protection index'), slug: RANKING_INDICATORS.spi, group: SORT_GROUPS_SLUGS.spi },
  { label: t('species richness'), slug: RANKING_INDICATORS.speciesRichness, group: SORT_GROUPS_SLUGS.species },
  { label: t('proportion of endemic species'), slug: RANKING_INDICATORS.endemic, group: SORT_GROUPS_SLUGS.species },
  {
    label: t('proportion of very high human modification'),
    slug: RANKING_INDICATORS.veryHigh,
    group: SORT_GROUPS_SLUGS.humanModification,
  },
  {
    label: t('proportion of human modification'),
    slug: RANKING_INDICATORS.totalMinusVeryHigh,
    group: SORT_GROUPS_SLUGS.humanModification,
  },
  {
    label: t('proportion of non human modification'),
    slug: RANKING_INDICATORS.noModification,
    group: SORT_GROUPS_SLUGS.humanModification,
  },
  {
    label: t('proportion of protection'),
    slug: RANKING_INDICATORS.protected,
    group: SORT_GROUPS_SLUGS.protection,
  },
  {
    label: t('proportion of additional protection needed'),
    slug: RANKING_INDICATORS.protectionNeeded,
    group: SORT_GROUPS_SLUGS.protection,
  },
  {
    label: t('proportion of No formal protection needed'),
    slug: RANKING_INDICATORS.protectionNotNeeded,
    group: SORT_GROUPS_SLUGS.protection,
  },
];

export const LAND_MARINE = {
  land: 'land',
  marine: 'marine',
};

export const LAND_MARINE_OPTIONS = [
  {
    label: t('LAND SPI'),
    slug: LAND_MARINE.land,
  },
  {
    label: t('MARINE SPI'),
    slug: LAND_MARINE.marine,
  },
];
