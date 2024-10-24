export const SPECIES_SELECTED_COOKIE = 'species_selected';

export const NAVIGATION = {
  HOME: 1,
  REGION: 2,
  SPECIES: 3,
  DATA_LAYER: 4,
  BIO_IND: 5,
  REGION_ANALYSIS: 6,
  TRENDS: 7,
  EXPLORE_SPECIES: 8,
}

export const LAYER_OPTIONS = {
  PROTECTED_AREAS: 'PROTECTED_AREAS',
  PROTECTED_AREAS_VECTOR: 'PROTECTED_AREAS_VECTOR',
  PROPOSED_PROTECTED_AREAS: 'PROPOSED_PROTECTED_AREAS',
  PROVINCES: 'PROVINCES',
  PROVINCES_VECTOR: 'PROVINCES_VECTOR',
  PROVINCES_REGION_VECTOR: 'PROVINCES_REGION_VECTOR',
  PRIORITY_AREAS: 'PRIORITY_AREAS',
  COMMUNITY_FORESTS: 'COMMUNITY_FORESTS',
  HABITAT: 'HABITAT',
}

// DRC LAYERS
export const PROVINCE_FEATURE_LAYER_URL = `https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/drc_provinces_spi_join/FeatureServer`;
export const PROVINCE_VECTOR_URL = 'https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/drc_provinces_spi_join/VectorTileServer';
export const PROVINCE_REGIONS_VECTOR_URL = 'https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm_drc_provinces_boundary_only/VectorTileServer';
export const PROTECTED_AREA_FEATURE_URL = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/DRC_WDPA_all/FeatureServer';
export const PROTECTED_AREA_VECTOR_URL = 'https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/DRC_WDPA_all_2_view_vector_tile_layer/VectorTileServer';
export const EXPERT_RANGE_MAP_URL = 'https://next-api-dot-map-of-life.appspot.com/2.x/species/drc_rangemap';
export const TREND_MAP_URL = 'https://next-api-dot-map-of-life.appspot.com/2.x/species/drc_trend'

// LIBERIA LAYERS
export const PROVINCE_LIB_FEATURE_URL = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/liberia_provinces_spi_join/FeatureServer';
export const PROVINCE_LIB_VECTOR_URL = 'https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Liberia__Province_SPI/VectorTileServer';
export const PROVINCE_LIB_REGIONS_VECTOR_URL = 'https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Liberia_Provine_Borders/VectorTileServer';
export const PROTECTED_AREA_LIB_FEATURE_URL = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/liberia_wdpa_all/FeatureServer';
export const PROTECTED_AREA_LIB_VECTOR_URL ='https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/liberia_wdpa_all/VectorTileServer';

export const LAYER_TITLE_TYPES = {
  EXPERT_RANGE_MAPS: 'EXPERT RANGE MAPS',
  POINT_OBSERVATIONS: 'POINT OBSERVATIONS',
  REGIONAL_CHECKLISTS: 'REGIONAL CHECKLISTS',
  TREND: 'TREND',
}

export const INITIAL_LAYERS = [
  'INITIAL_COUNTRY_LAYER',
  'INITIAL_GROUP_LAYER',
  'cities_labels_layer',
  'regions_labels_layer',
  'countries_labels_layer',
  'landscape_features_labels_layer',
  'admin_areas_feature_layer',
];

export const REGION_OPTIONS = {
  PROVINCES: 'PROVINCES',
  PROTECTED_AREAS: 'PROTECTED_AREAS'
}
