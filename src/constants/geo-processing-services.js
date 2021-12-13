import {
  BIRDS_LOOKUP,
  MAMMALS_LOOKUP,
  REPTILES_LOOKUP,
  AMPHIBIAN_LOOKUP,
} from 'constants/layers-slugs';

export const CRF_NAMES = {
  BIRDS: 'birds_equal_area_20211003',
  REPTILES: 'reptiles_equal_area_20211003',
  AMPHIBIANS: 'amphibians_equal_area_20211003',
  MAMMALS: 'mammals_equal_area_20211003',
  ECOLOGICAL_LAND_UNITS: 'ELU',
  POPULATION: 'population2020',
  PROTECTED_AREA_PERCENTAGE: 'wdpa_oecm_zeros',
  HUMAN_PRESSURES: 'land_encroachment'
}

export const CONTEXTUAL_DATA = 'contextual_data';

export const CRF_DATA_CATEGORIES = {
  CONTEXT: 'context',
  BIODIVERSITY: 'biodiversity'
}

export const { BIRDS, AMPHIBIANS, MAMMALS, REPTILES, ECOLOGICAL_LAND_UNITS, POPULATION, HUMAN_PRESSURES } = CRF_NAMES;


export const LOOKUP_TABLES = {
  [BIRDS]: BIRDS_LOOKUP,
  [MAMMALS]: MAMMALS_LOOKUP,
  [REPTILES]: REPTILES_LOOKUP,
  [AMPHIBIANS]: AMPHIBIAN_LOOKUP,
}

export const CRFS_CONFIG = {
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_vwkuvgmvcfqewwft'
}

export const CONTEXTUAL_DATA_SERVICE_CONFIG = {
  inputGeometryKey: 'geometry',
  inputRasterKeyPairs: {
    'crf_name_population': `${CRFS_CONFIG.basePath}/${POPULATION}.crf`,
    'crf_name_elu': `${CRFS_CONFIG.basePath}/${ECOLOGICAL_LAND_UNITS}.crf`,
    'crf_name_encroachment': `${CRFS_CONFIG.basePath}/${HUMAN_PRESSURES}.crf`
  },
  outputTablesKeys: [
    'output_table_population',
    'output_table_elu_majority',
    'output_table_encroachment',
    'output_table_wdpa'
  ]
}

export const BIODIVERSITY_CRFS_CONFIG = {
  ...CRFS_CONFIG,
  uniqueFieldID: 'unique_id_field',
}

export const GEOPROCESSING_SERVICES_URLS = {
  [BIRDS]: 'https://heportal.esri.com/server/rest/services/SampleBirdsProd/GPServer/SampleBirds',
  [REPTILES]: 'https://heportal.esri.com/server/rest/services/SampleReptProd/GPServer/SampleRept',
  [MAMMALS]: 'https://heportal.esri.com/server/rest/services/SampleMamProd/GPServer/SampleMam',
  [AMPHIBIANS]: 'https://heportal.esri.com/server/rest/services/SampleAmphProd/GPServer/SampleAmphProd', 
  [CONTEXTUAL_DATA]: 'https://heportal.esri.com/server/rest/services/ContextualLayersProd/GPServer/ContextualLayersProd',
}
