import {
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  MERGED_WDPA_VECTOR_TILE_LAYER,
  HALF_EARTH_FUTURE_VECTOR_TILE_LAYER
} from 'constants/layers-slugs';

export const PROTECTED_AREAS_COLOR = '#008604';
export const FUTURE_PLACES_COLOR = '#FF9C32';
export const NOT_UNDER_CONSERVATION_COLOR = '#6C828F';
export const WDPALayers = [
  {
    name: 'Protected areas',
    value: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    id: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    title: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    metadataTitle: 'Protected areas'
  },
  {
    name: 'Community based',
    value: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    id: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    title: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    slug: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    groupedLayer: true,
    metadataTitle: 'Community-based protected areas'

  }
];

export const conserveNextLayers = [
  {
    name: 'Places for Half-Earth future',
    value: HALF_EARTH_FUTURE_VECTOR_TILE_LAYER,
    id: HALF_EARTH_FUTURE_VECTOR_TILE_LAYER,
    title: HALF_EARTH_FUTURE_VECTOR_TILE_LAYER,
    slug: HALF_EARTH_FUTURE_VECTOR_TILE_LAYER,
    metadataTitle: 'Protected areas'
  }
];

export const legendConfigs = {
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: "Community-based",
        color: PROTECTED_AREAS_COLOR
      }
    ],
    title: "Community-based protected areas",
    slug: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    groupedLayer: true
  },
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: "Protected Areas",
        color: PROTECTED_AREAS_COLOR
      }
    ],
    title: "Protected areas",
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER
  },
  [HALF_EARTH_FUTURE_VECTOR_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: "Places for Half-Earth Future",
        color: FUTURE_PLACES_COLOR
      }
    ],
    title: "Places for Half-Earth Future",
    slug: HALF_EARTH_FUTURE_VECTOR_TILE_LAYER
  },
  [MERGED_WDPA_VECTOR_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: "",
        color: PROTECTED_AREAS_COLOR
      }
    ],
    title: "Protected Areas",
    slug: MERGED_WDPA_VECTOR_TILE_LAYER
  }
}


export const TEXTS = {
  categoryTitle: 'Existing protection',
  layersTitle: 'Conservation areas',
  description: 'Global protections clasified according to their management objectives.'
}
