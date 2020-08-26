export const INDICATOR_LABELS = {
  'N_SPECIES': 'Number of vertebrate species',
  'total_endemic': 'Number of endemic vertebrate species',
  'prop_hm_very_high': 'Proportion of very high human modification',
  'Population2016': 'Population (2016)',
  'GNI_PPP': 'Gross National Income (GNI)',
};

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
  all: 'All countries',
  filter_Area: 'Area',
  filter_Population2016: 'Population',
  filter_prop_protected: 'Proportion of protection',
  filter_prop_hm_very_high: 'Proportion of very high human encroachment',
  filter_protection_needed: 'Proportion of protection needed',
  filter_GNI_PPP: 'Gross National Income',
  filter_total_endemic: 'Number of endemic species',
  filter_N_SPECIES: 'Number of vertebrate species',
  filter_SPI: 'Species Protection Index',
  filter_neigh: 'Neighbouring countries',
  filter_steward: 'Species stewardship'
}

export const CHALLENGES_RELATED_FILTERS_OPTIONS = [
  {slug: 'all', name: FILTERS_DICTIONARY.all},
  {slug: 'filter_Area', name: FILTERS_DICTIONARY.filter_Area},
  {slug: 'filter_Population2016', name: FILTERS_DICTIONARY.filter_Population2016},
  {slug: 'filter_prop_protected', name: FILTERS_DICTIONARY.filter_prop_protected},
  {slug: 'filter_prop_hm_very_high', name: FILTERS_DICTIONARY.filter_prop_hm_very_high},
  {slug: 'filter_protection_needed', name: FILTERS_DICTIONARY.filter_protection_needed},
  {slug: 'filter_GNI_PPP', name: FILTERS_DICTIONARY.filter_GNI_PPP},
  {slug: 'filter_total_endemic', name: FILTERS_DICTIONARY.filter_total_endemic},
  {slug: 'filter_N_SPECIES', name: FILTERS_DICTIONARY.filter_N_SPECIES},
  {slug: 'filter_SPI', name: FILTERS_DICTIONARY.filter_SPI},
  {slug: 'filter_neigh', name: FILTERS_DICTIONARY.filter_neigh},
  {slug: 'filter_steward', name: FILTERS_DICTIONARY.filter_steward},
]
