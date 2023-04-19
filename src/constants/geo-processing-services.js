import {
  BIRDS_LOOKUP,
  MAMMALS_LOOKUP,
  REPTILES_LOOKUP,
  AMPHIBIAN_LOOKUP,
} from 'constants/layers-slugs';

const { REACT_APP_FEATURE_AOI_CHANGES } = process.env;

export const CRF_NAMES = {
  BIRDS: 'birds_equal_area_20211003',
  REPTILES: 'reptiles_equal_area_20211003',
  AMPHIBIANS: 'amphibians_equal_area_20211003',
  MAMMALS: 'mammals_equal_area_20211003',
  POPULATION: 'population2020',
  ECOLOGICAL_LAND_UNITS: 'ELU',
  PROTECTED_AREA_PERCENTAGE: 'WDPA_Terrestrial_CEA_June2021',
  HUMAN_PRESSURES: 'land_encroachment',
  // Human pressures group
  EXTRACTION: 'Extraction_TimeSeries_V2_Reclassify',
  AGRICULTURE: 'Agriculture_TimeSeries_Reclassify',
  TRANSPORTATION: 'Transportation_TimeSeries_V2_Reclassify',
  INTRUSION: 'HumanIntrusion_TimeSeries_V3_Reclassify',
  BUILTUP: 'Builtup_TimeSeries_Reclassify',
};

export const CONTEXTUAL_DATA = 'contextual_data';
export const WDPA_LIST = 'wdpa_list';
export const WDPA_PERCENTAGE = 'wdpa_percentage';

export const CRF_DATA_CATEGORIES = {
  CONTEXT: 'context',
  BIODIVERSITY: 'biodiversity',
};

export const {
  BIRDS,
  AMPHIBIANS,
  MAMMALS,
  REPTILES,
  ECOLOGICAL_LAND_UNITS,
  POPULATION,
  PROTECTED_AREA_PERCENTAGE,
  HUMAN_PRESSURES,
  EXTRACTION,
  AGRICULTURE,
  TRANSPORTATION,
  INTRUSION,
  BUILTUP,
} = CRF_NAMES;

export const CONTEXTUAL_DATA_TABLES = {
  [WDPA_LIST]: 'output_table_wdpa',
  [WDPA_PERCENTAGE]: 'output_table_wdpa_percentage',
  [POPULATION]: 'output_table_population',
  [ECOLOGICAL_LAND_UNITS]: 'output_table_elu_majority',
  [HUMAN_PRESSURES]: 'output_table_encroachment',
  // Human pressures group
  [EXTRACTION]: 'output_table_extraction',
  [AGRICULTURE]: 'output_table_agriculture',
  [TRANSPORTATION]: 'output_table_transportation',
  [INTRUSION]: 'output_table_intrusion',
  [BUILTUP]: 'output_table_builtup',
};

export const LOOKUP_TABLES = {
  [BIRDS]: BIRDS_LOOKUP,
  [MAMMALS]: MAMMALS_LOOKUP,
  [REPTILES]: REPTILES_LOOKUP,
  [AMPHIBIANS]: AMPHIBIAN_LOOKUP,
};

const LAND_PRESSURES_LABELS = REACT_APP_FEATURE_AOI_CHANGES
  ? {
      extraction: 'extraction',
      transportation: 'transportation',
      builtup: 'builtup',
      agriculture: 'agriculture',
      intrusion: 'intrusion',
    }
  : {
      irrigated: 'irrigated agriculture',
      rainfed: 'rainfed agriculture',
      rangelands: 'rangelands',
      urban: 'urban activities',
    };

export const getLandPressuresTranslatedLabels = (t) =>
  REACT_APP_FEATURE_AOI_CHANGES
    ? {
        energy: t('energy and extractive resources'),
        transportation: t('transportation'),
        builtup: t('urban and built up'),
        agriculture: t('agriculture pressures'),
        intrusion: t('human intrusion'),
      }
    : {
        irrigated: t('irrigated agriculture'),
        rainfed: t('rainfed agriculture'),
        rangelands: t('rangelands'),
        urban: t('urban activities'),
      };

export const LAND_PRESSURES_LABELS_SLUGS = REACT_APP_FEATURE_AOI_CHANGES
  ? {
      [LAND_PRESSURES_LABELS.extraction]: 'extraction',
      [LAND_PRESSURES_LABELS.intrusion]: 'intrusion',
      [LAND_PRESSURES_LABELS.transportation]: 'transportation',
      [LAND_PRESSURES_LABELS.builtup]: 'builtup',
      [LAND_PRESSURES_LABELS.agriculture]: 'agriculture',
    }
  : {
      [LAND_PRESSURES_LABELS.irrigated]: 'percent_irrigated',
      [LAND_PRESSURES_LABELS.rainfed]: 'percent_rainfed',
      [LAND_PRESSURES_LABELS.rangelands]: 'percent_rangeland',
      [LAND_PRESSURES_LABELS.urban]: 'percent_urban',
    };

export const LAND_PRESSURES_LOOKUP = REACT_APP_FEATURE_AOI_CHANGES
  ? [
      LAND_PRESSURES_LABELS.extraction,
      LAND_PRESSURES_LABELS.intrusion,
      LAND_PRESSURES_LABELS.transportation,
      LAND_PRESSURES_LABELS.builtup,
      LAND_PRESSURES_LABELS.agriculture,
    ]
  : [
      LAND_PRESSURES_LABELS.irrigated,
      LAND_PRESSURES_LABELS.rainfed,
      LAND_PRESSURES_LABELS.rangelands,
      LAND_PRESSURES_LABELS.urban,
    ];

export const CRFS_CONFIG = {
  inputRasterKey: 'crf_name',
  inputGeometryKey: 'geometry',
  inputFeatureServiceNameKey: 'esri_out_feature_service_name',
  outputParamKey: 'output_table',
  basePath: '/cloudStores/HECloudstore_ds_vwkuvgmvcfqewwft',
};

export const CONTEXTUAL_DATA_SERVICE_CONFIG = {
  inputGeometryKey: 'geometry',
  inputRasterKeyPairs: {
    crf_name_population: `${CRFS_CONFIG.basePath}/${POPULATION}.crf`,
    crf_name_elu: `${CRFS_CONFIG.basePath}/${ECOLOGICAL_LAND_UNITS}.crf`,
    [REACT_APP_FEATURE_AOI_CHANGES
      ? 'crf_name_wdpa'
      : 'crf_name_wdpa_percentage']: `${CRFS_CONFIG.basePath}/${PROTECTED_AREA_PERCENTAGE}.crf`,
    crf_name_extraction: `${CRFS_CONFIG.basePath}/${EXTRACTION}.crf`,
    crf_name_agriculture: `${CRFS_CONFIG.basePath}/${AGRICULTURE}.crf`,
    crf_name_transportation: `${CRFS_CONFIG.basePath}/${TRANSPORTATION}.crf`,
    crf_name_intrusion: `${CRFS_CONFIG.basePath}/${INTRUSION}.crf`,
    crf_name_builtup: `${CRFS_CONFIG.basePath}/${BUILTUP}.crf`,
  },
  outputTablesKeys: [
    CONTEXTUAL_DATA_TABLES[POPULATION],
    CONTEXTUAL_DATA_TABLES[WDPA_LIST],
    CONTEXTUAL_DATA_TABLES[WDPA_PERCENTAGE],
    CONTEXTUAL_DATA_TABLES[ECOLOGICAL_LAND_UNITS],
    CONTEXTUAL_DATA_TABLES[EXTRACTION],
    CONTEXTUAL_DATA_TABLES[AGRICULTURE],
    CONTEXTUAL_DATA_TABLES[TRANSPORTATION],
    CONTEXTUAL_DATA_TABLES[INTRUSION],
    CONTEXTUAL_DATA_TABLES[BUILTUP],
  ],
};

export const BIODIVERSITY_CRFS_CONFIG = {
  ...CRFS_CONFIG,
  uniqueFieldID: 'unique_id_field',
};

export const GEOPROCESSING_SERVICES_URLS = {
  [BIRDS]: REACT_APP_FEATURE_AOI_CHANGES
    ? 'https://heportal.esri.com/server/rest/services/BirdsProd_SPS/GPServer/BirdsProd_SPS'
    : 'https://heportal.esri.com/server/rest/services/SampleBirdsProd20220131/GPServer/SampleBirdsProdRange',
  [REPTILES]: REACT_APP_FEATURE_AOI_CHANGES
    ? 'https://heportal.esri.com/server/rest/services/ReptilesProd_SPS/GPServer/ReptilesProd_SPS'
    : 'https://heportal.esri.com/server/rest/services/SampleReptProd20220131/GPServer/SampleReptProdRange',
  [MAMMALS]: REACT_APP_FEATURE_AOI_CHANGES
    ? 'https://heportal.esri.com/server/rest/services/MammalsProd_SPS/GPServer/MammalsProd_SPS'
    : 'https://heportal.esri.com/server/rest/services/SampleMamProd20220131/GPServer/SampleMamProdRange',
  [AMPHIBIANS]: REACT_APP_FEATURE_AOI_CHANGES
    ? 'https://heportal.esri.com/server/rest/services/AmphibiansProd_SPS/GPServer/AmphibiansProd_SPS'
    : 'https://heportal.esri.com/server/rest/services/SampleAmphProd20220131/GPServer/SampleAmphProdRange',
  [CONTEXTUAL_DATA]: REACT_APP_FEATURE_AOI_CHANGES
    ? 'https://heportal.esri.com/server/rest/services/Contextual_Prod3/GPServer/Contextual_Prod3'
    : 'https://heportal.esri.com/server/rest/services/ContextualLayersProd20220131/GPServer/ContextualLayersProd',
};
