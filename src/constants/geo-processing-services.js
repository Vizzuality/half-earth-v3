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
  PROTECTED_AREAS_INSIDE_AOI: 'WDPA_OECM',
  HUMAN_PRESSURES: 'land_encroachment'
}

export const CRF_DATA_CATEGORIES = {
  CONTEXT: 'context',
  BIODIVERSITY: 'biodiversity'
}

export const { BIRDS, AMPHIBIANS, MAMMALS, REPTILES, ECOLOGICAL_LAND_UNITS, POPULATION, PROTECTED_AREA_PERCENTAGE, HUMAN_PRESSURES, PROTECTED_AREAS_INSIDE_AOI } = CRF_NAMES;


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

export const BIODIVERSITY_CRFS_CONFIG = {
  ...CRFS_CONFIG,
  uniqueFieldID: 'unique_id_field',
}

export const HEPORTAL_SERVICES_HOST = 'https://heportal.esri.com/server/rest/services/';
export const HEPPORTAL_SERVICES_HOST = 'https://hepportal.arcgis.com/server/rest/services/';

export const GEOPROCESSING_SERVICES_URLS = {
  [BIRDS]: `${HEPORTAL_SERVICES_HOST}SampleBirdsProd/GPServer/SampleBirds`,
  [REPTILES]: `${HEPORTAL_SERVICES_HOST}SampleReptProd/GPServer/SampleRept`,
  [MAMMALS]: `${HEPORTAL_SERVICES_HOST}SampleMamProd/GPServer/SampleMam`,
  [AMPHIBIANS]: `${HEPORTAL_SERVICES_HOST}SampleAmphProd/GPServer/SampleAmphProd`,
  [HUMAN_PRESSURES]: `${HEPPORTAL_SERVICES_HOST}LandEncroachmentPercentage/GPServer/LandEncroachmentPercentage`,
  [PROTECTED_AREA_PERCENTAGE]: `${HEPPORTAL_SERVICES_HOST}ZsatMean/GPServer/ZsatMean`,
  [PROTECTED_AREAS_INSIDE_AOI]: `${HEPPORTAL_SERVICES_HOST}clipSelect/GPServer/clipSelect`,
  [ECOLOGICAL_LAND_UNITS]: `${HEPPORTAL_SERVICES_HOST}ZsatMajority/GPServer/ZsatMajority`,
  [POPULATION]: `${HEPPORTAL_SERVICES_HOST}ZsatSum/GPServer/ZsatSum`
}
