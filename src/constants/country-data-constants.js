

const { REACT_APP_FEATURE_MARINE } = process.env;

export const COUNTRY_ATTRIBUTES = REACT_APP_FEATURE_MARINE ?
{
  nspecies_richness_ter: 'nspecies_ter',
  nspecies_ter: 'nspecies_ter',
  total_endemic_ter: 'total_endemic_ter',
  prop_protected_ter: 'prop_protected_ter',
  protection_needed_ter: 'protection_needed_ter',
  hm_vh_ter: 'hm_vh_ter',
  hm_ter: 'hm_ter',
  hm_no_ter: 'hm_no_ter',
  Pop2020: 'Pop2020',
  2020: '2020',
  Area_Country: 'Area_Country',
  SPI_ter: 'SPI_ter',
  Global_SPI_ter: 'Global_SPI_ter',
  Pop2020_SUM: 'Pop2020',
  GID_0: 'GID_0',
  similar_ter: 'similar_ter',
} : {
  nspecies_richness_ter: 'nspecies', // For species-modal-selectors and ranking-chart-selectors
  nspecies_ter: 'N_SPECIES',
  total_endemic_ter: 'total_endemic',
  prop_protected_ter: 'prop_protected',
  protection_needed_ter: 'protection_needed',
  hm_vh_ter: 'prop_hm_very_high',
  hm_ter: null,
  hm_no_ter: 'prop_hm_0',
  Pop2020: 'Population2016',
  2020: '2016',
  Area_Country: 'Area',
  SPI_ter: 'SPI',
  GID_0: 'GID',
  Global_SPI_ter: '',
  Pop2020_SUM: 'SUM',
  similar_ter: 'similar',
};
