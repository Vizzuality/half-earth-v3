import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';

export const INDICATOR_LABELS = {
  [COUNTRY_ATTRIBUTES.nspecies_ter]: 'Number of vertebrate species',
  [COUNTRY_ATTRIBUTES.total_endemic_ter]: 'Number of endemic vertebrate species',
  [COUNTRY_ATTRIBUTES.prop_protected_ter]: 'Proportion of land protected',
  [COUNTRY_ATTRIBUTES.protection_needed_ter]: 'Additional land protection needed',
  [COUNTRY_ATTRIBUTES.hm_vh_ter]: 'Proportion of very high human modification',
  [COUNTRY_ATTRIBUTES.Pop2020]: `Population (${COUNTRY_ATTRIBUTES['2020']})`,
  'GNI_PPP': 'Gross National Income (GNI)',
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
  filter_continent: 'by continent',
  filter_neigh: 'by proximity',
  [`filter_${COUNTRY_ATTRIBUTES.Area_Country}`]: 'with similar area',
  [`filter_${COUNTRY_ATTRIBUTES.Pop2020}`]: 'with similar population size',
  [`filter_${COUNTRY_ATTRIBUTES.prop_protected_ter}`]: 'with similar proportion of protection',
  [`filter_${COUNTRY_ATTRIBUTES.hm_vh_ter}`]: 'with similar proportion of very high human encroachment',
  [`filter_${COUNTRY_ATTRIBUTES.protection_needed_ter}`]: 'with similar proportion of protection needed',
  filter_GNI_PPP: 'with similar Gross National Income',
  [`filter_${COUNTRY_ATTRIBUTES.total_endemic_ter}`]: 'with similar number of endemic species',
  [`filter_${COUNTRY_ATTRIBUTES.nspecies_ter}`]: 'with similar number of vertebrate species',
  [`filter_${COUNTRY_ATTRIBUTES.SPI_ter}`]: 'with similar species Protection Index',
  filter_steward: 'with shared stewardship'
};

export const CHALLENGES_RELATED_FILTERS_OPTIONS = [
  {slug: 'filter_continent', label: FILTERS_DICTIONARY.filter_continent},
  {slug: 'filter_neigh', label: FILTERS_DICTIONARY.filter_neigh},
  {slug: `filter_${COUNTRY_ATTRIBUTES.Area_Country}`, label: FILTERS_DICTIONARY[`filter_${COUNTRY_ATTRIBUTES.Area_Country}`]},
  {slug: `filter_${COUNTRY_ATTRIBUTES.Pop2020}`, label: FILTERS_DICTIONARY[`filter_${COUNTRY_ATTRIBUTES.Pop2020}`]},
  {slug: `filter_${COUNTRY_ATTRIBUTES.prop_protected_ter}`, label: FILTERS_DICTIONARY[`filter_${COUNTRY_ATTRIBUTES.prop_protected_ter}`]},
  {slug: `filter_${COUNTRY_ATTRIBUTES.hm_vh_ter}`, label: FILTERS_DICTIONARY[`filter_${COUNTRY_ATTRIBUTES.hm_vh_ter}`]},
  {slug: `filter_${COUNTRY_ATTRIBUTES.protection_needed_ter}`, label: FILTERS_DICTIONARY[`filter_${COUNTRY_ATTRIBUTES.protection_needed_ter}`]},
  {slug: 'filter_GNI_PPP', label: FILTERS_DICTIONARY.filter_GNI_PPP},
  {slug: `filter_${COUNTRY_ATTRIBUTES.total_endemic_ter}`, label: FILTERS_DICTIONARY[`filter_${COUNTRY_ATTRIBUTES.total_endemic_ter}`]},
  {slug: `filter_${COUNTRY_ATTRIBUTES.nspecies_ter}`, label: FILTERS_DICTIONARY[`filter_${COUNTRY_ATTRIBUTES.nspecies_ter}`]},
  {slug: `filter_${COUNTRY_ATTRIBUTES.SPI_ter}`, label: FILTERS_DICTIONARY[`filter_${COUNTRY_ATTRIBUTES.SPI_ter}`]},
  {slug: 'filter_steward', label: FILTERS_DICTIONARY.filter_steward}
]

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
    [RANKING_INDICATORS.nonEndemic]: 'Non endemic species',
    [RANKING_INDICATORS.endemic]: 'Endemic species',
  },
  [RANKING_GROUPS_SLUGS.humanModification]: {
    [RANKING_INDICATORS.veryHigh]: 'Very high human modification',
    [RANKING_INDICATORS.totalMinusVeryHigh]: 'Human modification',
    [RANKING_INDICATORS.noModification]: 'No human modification',
  },
  [RANKING_GROUPS_SLUGS.protection]: {
    [RANKING_INDICATORS.protected]: 'Current protection',
    [RANKING_INDICATORS.protectionNeeded]: 'Additional protection needed',
    [RANKING_INDICATORS.protectionNotNeeded]: 'No formal protection needed',
  },
};

export const SORT_GROUPS_SLUGS = { spi: 'spi', ...RANKING_GROUPS_SLUGS };
export const SORT_GROUPS = [SORT_GROUPS_SLUGS.species, SORT_GROUPS_SLUGS.humanModification, SORT_GROUPS_SLUGS.protection, SORT_GROUPS_SLUGS.spi];

export const RANKING_HEADER_LABELS = {
  [SORT_GROUPS_SLUGS.species]: 'species',
  [SORT_GROUPS_SLUGS.humanModification]: 'human modification',
  [SORT_GROUPS_SLUGS.protection]: 'protection',
  [SORT_GROUPS_SLUGS.spi]: 'spi',
}
export const SORT_OPTIONS = [
  { label: 'species protection index', slug: RANKING_INDICATORS.spi, group: SORT_GROUPS_SLUGS.spi },
  { label: 'species richness', slug: RANKING_INDICATORS.speciesRichness, group: SORT_GROUPS_SLUGS.species },
  { label: 'proportion of endemic species', slug: RANKING_INDICATORS.endemic, group: SORT_GROUPS_SLUGS.species },
  {
    label: 'proportion of very high human modification',
    slug: RANKING_INDICATORS.veryHigh,
    group: SORT_GROUPS_SLUGS.humanModification,
  },
  {
    label: 'proportion of human modification',
    slug: RANKING_INDICATORS.totalMinusVeryHigh,
    group: SORT_GROUPS_SLUGS.humanModification,
  },
  {
    label: 'proportion of non human modification',
    slug: RANKING_INDICATORS.noModification,
    group: SORT_GROUPS_SLUGS.humanModification,
  },
  {
    label: 'proportion of protection',
    slug: RANKING_INDICATORS.protected,
    group: SORT_GROUPS_SLUGS.protection,
  },
  {
    label: 'proportion of additional protection needed',
    slug: RANKING_INDICATORS.protectionNeeded,
    group: SORT_GROUPS_SLUGS.protection,
  },
  {
    label: 'proportion of No formal protection needed',
    slug: RANKING_INDICATORS.protectionNotNeeded,
    group: SORT_GROUPS_SLUGS.protection,
  },
];
