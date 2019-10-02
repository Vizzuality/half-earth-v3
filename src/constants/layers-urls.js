import {
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  VIBRANT_BASEMAP_LAYER,
  PRIORITY_PLACES_POLYGONS,
  PROTECTED_AREAS_FEATURE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_FEATURE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER
} from 'constants/layers-slugs'

export const BIODIVERSITY_FACETS_SERVICE_URL = "https://utility.arcgis.com/usrsvcs/servers/e6c05ee3ee7b45af9577904bf9238529/rest/services/Biodiversity_Facets_Dissolved/FeatureServer/0";
export const PLEDGES_LAYER_URL = "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/PledgeLocationsURL/FeatureServer";

export const LAYERS_URLS = {
  [LANDSCAPE_FEATURES_LABELS_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/LandscapeUniqueRivers/FeatureServer',
  [CITIES_LABELS_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/CityLabels/FeatureServer',
  [VIBRANT_BASEMAP_LAYER]: 'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/Vibrant/MapServer',
  [PRIORITY_PLACES_POLYGONS]: 'https://utility.arcgis.com/usrsvcs/servers/685d69cda038469f93dcfd96355abefc/rest/services/PriorPolygons/FeatureServer',
  [PROTECTED_AREAS_FEATURE_LAYER]: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA3_view/FeatureServer',
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA_pro_vectortile/VectorTileServer',
  [COMMUNITY_AREAS_FEATURE_LAYER]: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA3_view2/FeatureServer',
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA_pro_vectortile2/VectorTileServer',
}