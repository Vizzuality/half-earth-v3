export const ZONAL_STATISTICS_AS_TABLE_CONFIG = {
  url: 'https://hepportal.arcgis.com/server/rest/services/Simple_Zonal_Stats_boolean/GPServer/ZonalStats',
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputMultidimensionKey: 'is_multidimensional',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
}

export const SAMPLE_SERVICE_CONFIG = {
  url: 'https://hepportal.arcgis.com/server/rest/services/sampleMammals/GPServer/sampleMammals',
  inputRasterKey: 'mammals_for_greta_crf',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
}

export const SIMPLE_SAMPLE_SERVICE_CONFIG = {
  url: 'https://hepportal.arcgis.com/server/rest/services/SimpleSample2/GPServer/SimpleSample2',
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
}

export const PROTECTED_PERCENTAGE_CONFIG = {
  url: 'https://hepportal.arcgis.com/server/rest/services/paPercentage/GPServer/paPercentage',
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
}

export const ABC_SAMPLE_CONFIG = {
  url: 'https://hepportal.arcgis.com/server/rest/services/sampleUniqueSelectCalculate/GPServer/sampleUniqueSelectCalculate',
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  uniqueFieldID: 'unique_id_field',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
} 

export const CRF_NAMES = {
  HUMMINGBIRDS: 'hummingbirds_binary',
  MAMMALS: 'mammals_for_greta',
  ECOLOGICAL_LAND_UNITS: 'ELU',
  POPULATION: 'population2020',
  PROTECTED_AREAS: 'clean_wdpa_april',
  MAMMALS_SUBSET: 'mammals_for_greta_SliceNumber_1_300',
  MAMMALS_GALICIA_SUBSET: 'mammals_for_greta_Subset_Subset_galicia_transpose.crf'
}


