export const ZONAL_STATISTICS_AS_TABLE_CONFIG = {
  url: 'https://hepportal.arcgis.com/server/rest/services/Simple_Zonal_Stats_boolean/GPServer/ZonalStats',
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputMultidimensionKey: 'is_multidimensional',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm/'
}

export const CRF_NAMES = {
  HUMMINGBIRDS: 'hummingbirds_binary',
  MAMMALS: 'mammals_for_greta',
  ECOLOGICAL_LAND_UNITS: 'ELU',
  POPULATION: 'population2020'
}