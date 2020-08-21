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

export const CHALLENGES_RELATED_FILTERS = [
  {slug: 'filter_Area', name: 'Area'},
  {slug: 'filter_Population2016', name: 'Population'},
  {slug: 'filter_prop_protected', name: 'Proportion of protection'},
  {slug: 'filter_prop_hm_very_high', name: 'Proportion of very high human encroachment'},
  {slug: 'filter_protection_needed', name: 'Proportion of protection needed'},
  {slug: 'filter_GNI_PPP', name: 'Gross National Incomme'},
  {slug: 'filter_total_endemic', name: 'Number of endemic species'},
  {slug: 'filter_N_SPECIES', name: 'Number of vertebrate species'},
  {slug: 'filter_SPI', name: 'Species Protection Index'},
  {slug: 'filter_neigh', name: 'Neighbouring countries'},
  {slug: 'filter_steward', name: 'Species stewardship'},
]