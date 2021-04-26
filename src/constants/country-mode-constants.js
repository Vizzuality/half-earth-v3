export const INDICATOR_LABELS = {
  'N_SPECIES': 'Number of vertebrate species',
  'total_endemic': 'Number of endemic vertebrate species',
  'prop_protected': 'Proportion of land protected',
  'protection_needed': 'Additional land protection needed',
  'prop_hm_very_high': 'Proportion of very high human modification',
  'Population2016': 'Population (2016)',
  'GNI_PPP': 'Gross National Income (GNI)',
};

export const CONTINENTS = [
  'Africa',
  'Antarctica',
  'Asia',
  'Europe',
  'North america',
  'Oceania',
  'South america'
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
  filter_Area: 'with similar area',
  filter_Population2016: 'with similar population size',
  filter_prop_protected: 'with similar proportion of protection',
  filter_prop_hm_very_high: 'with similar proportion of very high human encroachment',
  filter_protection_needed: 'with similar proportion of protection needed',
  filter_GNI_PPP: 'with similar Gross National Income',
  filter_total_endemic: 'with similar number of endemic species',
  filter_N_SPECIES: 'with similar number of vertebrate species',
  filter_SPI: 'with similar species Protection Index',
  filter_neigh: 'by proximity',
  filter_steward: 'with shared stewardship',
  filter_continent: 'by continent'
};

export const CHALLENGES_RELATED_FILTERS_OPTIONS = [
  {slug: 'filter_Area', label: FILTERS_DICTIONARY.filter_Area},
  {slug: 'filter_Population2016', label: FILTERS_DICTIONARY.filter_Population2016},
  {slug: 'filter_prop_protected', label: FILTERS_DICTIONARY.filter_prop_protected},
  {slug: 'filter_prop_hm_very_high', label: FILTERS_DICTIONARY.filter_prop_hm_very_high},
  {slug: 'filter_protection_needed', label: FILTERS_DICTIONARY.filter_protection_needed},
  {slug: 'filter_GNI_PPP', label: FILTERS_DICTIONARY.filter_GNI_PPP},
  {slug: 'filter_total_endemic', label: FILTERS_DICTIONARY.filter_total_endemic},
  {slug: 'filter_N_SPECIES', label: FILTERS_DICTIONARY.filter_N_SPECIES},
  {slug: 'filter_SPI', label: FILTERS_DICTIONARY.filter_SPI},
  {slug: 'filter_neigh', label: FILTERS_DICTIONARY.filter_neigh},
  {slug: 'filter_steward', label: FILTERS_DICTIONARY.filter_steward},
  {slug: 'filter_continent', label: FILTERS_DICTIONARY.filter_continent}
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
