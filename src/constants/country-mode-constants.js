export const INDICATOR_LABELS = {
  'N_SPECIES': 'Number of vertebrate species',
  'total_endemic': 'Number of endemic vertebrate species',
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
  filter_neigh: 'with similar geographic location',
  filter_steward: 'with shared stewardship',
  filter_continent: 'from the same continent'
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

export const RANKING_COLORS = {
  non_endemic: '#F87200',
  endemic: '#F8D300',
  high_human: '#731CFF',
  some_human: '#B284FD',
  non_human: '#A0AFB8',
  protected: '#008604',
  needed: '#B3E74B',
  non_needed: '#AFB8A0',
}

export const RANKING_LEGEND = {
  species : [
    {slug: 'non_endemic', label: 'non endemic species'},
    {slug: 'endemic', label: 'endemic species'},

  ],
  human : [
    {slug: 'high_human', label: 'very high human modification'},
    {slug: 'some_human', label: 'some human modification'},
    {slug: 'non_human', label: 'non-human modification'},


  ],
  protection : [
    {slug: 'protected', label: 'protected areas'},
    {slug: 'needed', label: 'protection needed'},
    {slug: 'non_needed', label: 'protection non-needed'},
  ],
}