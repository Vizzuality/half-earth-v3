export const CRF_NAMES = {
  BIRDS: 'birds',
  REPTILES: 'reptiles',
  AMPHIBIANS: 'amphibians',
  MAMMALS: 'mammals_for_greta',
  ECOLOGICAL_LAND_UNITS: 'ELU',
  POPULATION: 'population2020',
  PROTECTED_AREAS: 'clean_wdpa_april',
  HUMAN_PRESSURES: 'land_encroachment'
}

export const CRF_DATA_CATEGORIES = {
  CONTEXT: 'context',
  BIODIVERSITY: 'biodiversity'
}

export const { BIRDS, AMPHIBIANS, MAMMALS, ECOLOGICAL_LAND_UNITS, POPULATION, PROTECTED_AREAS, HUMAN_PRESSURES, REPTILES } = CRF_NAMES;

export const CRFS_CONFIG = {
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
}

export const BIODIVERSITY_CRFS_CONFIG = {
  ...CRFS_CONFIG,
  uniqueFieldID: 'unique_id_field',
}

export const GEOPROCESSING_SERVICES_URLS = {
  [BIRDS]: 'https://hepportal.arcgis.com/server/rest/services/SampleBirds/GPServer/SampleBirds',
  [REPTILES]: 'https://hepportal.arcgis.com/server/rest/services/SampleRept/GPServer/SampleRept',
  [MAMMALS]: 'https://hepportal.arcgis.com/server/rest/services/sampleUniqueSelectCalculate/GPServer/sampleUniqueSelectCalculate',
  [AMPHIBIANS]: 'https://hepportal.arcgis.com/server/rest/services/SampleAmph/GPServer/SampleAmph',
  [HUMAN_PRESSURES]: 'https://hepportal.arcgis.com/server/rest/services/LandEncroachmentPercentage/GPServer/LandEncroachmentPercentage',
  [PROTECTED_AREAS]: 'https://hepportal.arcgis.com/server/rest/services/paPercentage/GPServer/paPercentage',
  [ECOLOGICAL_LAND_UNITS]: 'https://hepportal.arcgis.com/server/rest/services/ZsatMajority/GPServer/ZsatMajority',
  [POPULATION]: 'https://hepportal.arcgis.com/server/rest/services/ZsatSum/GPServer/ZsatSum'
}



