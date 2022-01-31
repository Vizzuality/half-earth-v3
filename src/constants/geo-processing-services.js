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
  POPULATION: 'population2020',
  ECOLOGICAL_LAND_UNITS: 'ELU',
  HUMAN_PRESSURES: 'land_encroachment',
  PROTECTED_AREA_PERCENTAGE: 'WDPA_Terrestrial_CEA_June2021',
}

export const CONTEXTUAL_DATA = 'contextual_data';
export const WDPA_LIST = 'wdpa_list';
export const WDPA_PERCENTAGE = 'wdpa_percentage';

export const CRF_DATA_CATEGORIES = {
  CONTEXT: 'context',
  BIODIVERSITY: 'biodiversity'
}

export const { BIRDS, AMPHIBIANS, MAMMALS, REPTILES, ECOLOGICAL_LAND_UNITS, POPULATION, HUMAN_PRESSURES, PROTECTED_AREA_PERCENTAGE } = CRF_NAMES;

export const CONTEXTUAL_DATA_TABLES = {
  [WDPA_LIST]: 'output_table_wdpa',
  [WDPA_PERCENTAGE]:'output_table_wdpa_percentage',
  [POPULATION]: 'output_table_population',
  [HUMAN_PRESSURES]: 'output_table_encroachment',
  [ECOLOGICAL_LAND_UNITS]:'output_table_elu_majority',
}

export const LOOKUP_TABLES = {
  [BIRDS]: BIRDS_LOOKUP,
  [MAMMALS]: MAMMALS_LOOKUP,
  [REPTILES]: REPTILES_LOOKUP,
  [AMPHIBIANS]: AMPHIBIAN_LOOKUP,
}



const LAND_PRESSURES_LABELS =  {
  irrigated: 'irrigated agriculture',
  rainfed: 'rainfed agriculture',
  rangelands: 'rangelands',
  urban: 'urban activities'
}

export const LAND_PRESSURES_LABELS_SLUGS =  {
  [LAND_PRESSURES_LABELS.irrigated]: 'percent_irrigated',
  [LAND_PRESSURES_LABELS.rainfed]: 'percent_rainfed',
  [LAND_PRESSURES_LABELS.rangelands]: 'percent_rangeland',
  [LAND_PRESSURES_LABELS.urban]: 'percent_urban'
}

export const LAND_PRESSURES_LOOKUP = [
  LAND_PRESSURES_LABELS.irrigated,
  LAND_PRESSURES_LABELS.rainfed,
  LAND_PRESSURES_LABELS.rangelands,
  LAND_PRESSURES_LABELS.urban
]

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
    'crf_name_encroachment': `${CRFS_CONFIG.basePath}/${HUMAN_PRESSURES}.crf`,
    'crf_name_wdpa_percentage': `${CRFS_CONFIG.basePath}/${PROTECTED_AREA_PERCENTAGE}.crf`,
  },
  outputTablesKeys: [
    CONTEXTUAL_DATA_TABLES[WDPA_LIST],
    CONTEXTUAL_DATA_TABLES[WDPA_PERCENTAGE],
    CONTEXTUAL_DATA_TABLES[POPULATION],
    CONTEXTUAL_DATA_TABLES[HUMAN_PRESSURES],
    CONTEXTUAL_DATA_TABLES[ECOLOGICAL_LAND_UNITS],
  ]
}

export const BIODIVERSITY_CRFS_CONFIG = {
  ...CRFS_CONFIG,
  uniqueFieldID: 'unique_id_field',
}

export const GEOPROCESSING_SERVICES_URLS = {
  [BIRDS]: 'https://heportal.esri.com/server/rest/services/SampleBirdsProd20220131/GPServer/SampleBirdsProdRange',
  [REPTILES]: 'https://heportal.esri.com/server/rest/services/SampleReptProd20220131/GPServer/SampleReptProdRange',
  [MAMMALS]: 'https://heportal.esri.com/server/rest/services/SampleMamProd20220131/GPServer/SampleMamProdRange',
  [AMPHIBIANS]: 'https://heportal.esri.com/server/rest/services/SampleAmphProd20220131/GPServer/SampleAmphProdRange',
  [CONTEXTUAL_DATA]: 'https://heportal.esri.com/server/rest/services/ContextualLayers20220131Prod/GPServer/ContextualLayersProd',
}
