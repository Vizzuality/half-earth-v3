import {
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER
} from 'constants/layers-slugs'

export const BIODIVERSITY_FACETS_SERVICE_URL = "https://utility.arcgis.com/usrsvcs/servers/e6c05ee3ee7b45af9577904bf9238529/rest/services/Biodiversity_Facets_Dissolved/FeatureServer/0";
export const PLEDGES_LAYER_URL = "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/PledgeLocationsURL/FeatureServer";

export const LAYERS_URLS = {
  [LANDSCAPE_FEATURES_LABELS_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/LandscapeUniqueRivers/FeatureServer',
  [CITIES_LABELS_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/CityLabels/FeatureServer'
}