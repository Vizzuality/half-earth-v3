import {
  LABELS_LAYER_GROUP,
  PLEDGES_LAYER,
  EDUCATOR_AMBASSADORS_LAYER,
  SIGNED_PLEDGE_GRAPHIC_LAYER,
  BIODIVERSITY_FACETS_LAYER,
  FIREFLY_BASEMAP_LAYER,
  GRAPHIC_LAYER,
  VIBRANT_BASEMAP_LAYER,
  FEATURED_PLACES_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  PRIORITY_POLYGONS_GRAPHIC_LAYER,
  URBAN_HUMAN_PRESSURES_TILE_LAYER,
  IRRIGATED_HUMAN_PRESSURES_TILE_LAYER,
  RAISIG_AREAS_VECTOR_TILE_LAYER,
  RAINFED_HUMAN_PRESSURES_TILE_LAYER,
  RANGELAND_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
  ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
  LAND_HUMAN_PRESSURES,
  MARINE_HUMAN_PRESSURES,
  COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER
} from 'constants/layers-slugs';


export const CONSTANT_CONTACT_LAYERS = [
  PLEDGES_LAYER,
  EDUCATOR_AMBASSADORS_LAYER
]

export const LEGEND_FREE_LAYERS = [
  LABELS_LAYER_GROUP,
  BIODIVERSITY_FACETS_LAYER,
  FIREFLY_BASEMAP_LAYER,
  GRAPHIC_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  VIBRANT_BASEMAP_LAYER,
  FEATURED_PLACES_LAYER,
  PRIORITY_POLYGONS_GRAPHIC_LAYER,
  SIGNED_PLEDGE_GRAPHIC_LAYER,
  PLEDGES_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER,
  ...CONSTANT_CONTACT_LAYERS
];

export const LAND_HUMAN_PRESURES_LAYERS = [
  URBAN_HUMAN_PRESSURES_TILE_LAYER,
  IRRIGATED_HUMAN_PRESSURES_TILE_LAYER,
  RAINFED_HUMAN_PRESSURES_TILE_LAYER,
  RANGELAND_HUMAN_PRESSURES_TILE_LAYER
]

export const MARINE_HUMAN_PRESURES_LAYERS = [
  MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
  ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
]

export const COMMUNITY_PROTECTED_AREAS_LAYER_GROUP = [
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  RAISIG_AREAS_VECTOR_TILE_LAYER
]

export const LANDSCAPE_LABELS_LAYERS = [
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER
];

export const LABELS_LAYERS = [
  COUNTRIES_LABELS_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER
];

export const BOUNDARIES_LAYERS = [COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER];

export const FEATURED_GLOBE_LANDSCAPE_ONLY_LAYERS = [
  URBAN_HUMAN_PRESSURES_TILE_LAYER,
  IRRIGATED_HUMAN_PRESSURES_TILE_LAYER,
  RAINFED_HUMAN_PRESSURES_TILE_LAYER,
  RANGELAND_HUMAN_PRESSURES_TILE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
]

// When interacting with legend control (opacity, remove, move item)
// this layers need to act as a single one and the interactions will be batched
export const LEGEND_GROUPED_LAYERS_GROUPS = {
  [MARINE_HUMAN_PRESSURES]: MARINE_HUMAN_PRESURES_LAYERS,
  [LAND_HUMAN_PRESSURES]: LAND_HUMAN_PRESURES_LAYERS
}

export const USER_CONFIG_LAYER_GROUPS = {
  labels: LABELS_LAYERS,
  boundaries: BOUNDARIES_LAYERS
}
