import {
  BIRDS_LOOKUP,
  MAMMALS_LOOKUP,
  REPTILES_LOOKUP,
  AMPHIBIAN_LOOKUP,
  PRECALCULATED_BIRDS_LOOKUP,
  PRECALCULATED_MAMMALS_LOOKUP,
  PRECALCULATED_REPTILES_LOOKUP,
  PRECALCULATED_AMPHIBIAN_LOOKUP,
} from 'constants/layers-slugs';

export const CRF_NAMES = {
  BIRDS: 'birds',
  REPTILES: 'reptiles',
  // AMPHIBIANS: 'amphibians',
  AMPHIBIANS: 'amphibians_equal_area_20211003',
  // MAMMALS: 'mammals_equal_area_20211003',
  MAMMALS: 'mammals_for_greta',
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
  [AMPHIBIANS]: PRECALCULATED_AMPHIBIAN_LOOKUP,
}

export const PRECALCULATED_LOOKUP_TABLES = {
  [BIRDS]: PRECALCULATED_BIRDS_LOOKUP,
  [MAMMALS]: PRECALCULATED_MAMMALS_LOOKUP,
  [REPTILES]: PRECALCULATED_REPTILES_LOOKUP,
  [AMPHIBIANS]: PRECALCULATED_AMPHIBIAN_LOOKUP,
}

export const CRFS_CONFIG = {
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_vwkuvgmvcfqewwft'
  // basePath: '/cloudStores/HECloudstore_ds_fuwwtcoj9blciafm'
}

export const BIODIVERSITY_CRFS_CONFIG = {
  ...CRFS_CONFIG,
  uniqueFieldID: 'unique_id_field',
}

export const GEOPROCESSING_SERVICES_URLS = {
  [BIRDS]: 'https://hepportal.arcgis.com/server/rest/services/SampleBirds/GPServer/SampleBirds', // completion error
  [REPTILES]: 'https://hepportal.arcgis.com/server/rest/services/SampleRept/GPServer/SampleRept', // submission error
  // [MAMMALS]: ' https://heportal.esri.com/server/rest/services/SampleMammals/GPServer/sampleUniqueSelectCalculate',
  [MAMMALS]: 'https://hepportal.arcgis.com/server/rest/services/sampleUniqueSelectCalculate/GPServer/sampleUniqueSelectCalculate', // submission error
  [AMPHIBIANS]: 'https://heportal.esri.com/server/rest/services/SampleAmph8/GPServer/SampleAmph', // completion error
  // [AMPHIBIANS]: 'https://hepportal.arcgis.com/server/rest/services/SampleAmph/GPServer/SampleAmph',
  [HUMAN_PRESSURES]: 'https://hepportal.arcgis.com/server/rest/services/LandEncroachmentPercentage/GPServer/LandEncroachmentPercentage', // completion error
  [PROTECTED_AREA_PERCENTAGE]: 'https://hepportal.arcgis.com/server/rest/services/ZsatMean/GPServer/ZsatMean', // submission error
  [PROTECTED_AREAS_INSIDE_AOI]: 'https://hepportal.arcgis.com/server/rest/services/clipSelect/GPServer/clipSelect',// submission error
  [ECOLOGICAL_LAND_UNITS]: 'https://hepportal.arcgis.com/server/rest/services/ZsatMajority/GPServer/ZsatMajority', // completion error
  [POPULATION]: 'https://hepportal.arcgis.com/server/rest/services/ZsatSum/GPServer/ZsatSum' // completion error
}



// ERROR stack trace for SampleAmph on https://heportal.esri.com/server/rest/services/SampleAmph8/GPServer/SampleAmph:
// - ERROR 160314: Split point results in a zero length polyline.
// - Failed to execute (Sample).
// - Failed at Wednesday, October 27, 2021 10:10:14 PM (Elapsed Time: 0.86 seconds)
// - Failed to execute (SampleAmph).
// - Failed at Wednesday, October 27, 2021 10:10:15 PM (Elapsed Time: 2.03 seconds)

// ERROR stack trace for services pointing to hepportal.arcgis.com: (completion error)
// - java.lang.Exception: AutomationException: 0x80004005 - Error: (-8001) You are not licensed for workflowsvr.

// ERROR stack trace for services pointing to hepportal.arcgis.com: (submission error)
// - Error performing submit job operation. error code 500
