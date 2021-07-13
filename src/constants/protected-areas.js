import {
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  MERGED_WDPA_VECTOR_TILE_LAYER
} from 'constants/layers-slugs';

export const PROTECTED_AREAS_COLOR = '#FF6C47';
export const COMMUNITY_AREAS_COLOR = '#FCC44A';
export const MERGED_WDPA_COLOR = "#008604";
export const NOT_UNDER_CONSERVATION_COLOR = '#6C828F';
export const WDPALayers = [
  { 
    name: 'Protected areas',
    value: 'Protected areas',
    id: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    title: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    metadataTitle: 'Protected areas'
  },
  {
    name: 'Community-based',
    value: 'Community areas',
    id: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    title: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    slug: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    groupedLayer: true,
    metadataTitle: 'Community-based protected areas'

  }
]

export const legendConfigs = {
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: "Community-based",
        color: COMMUNITY_AREAS_COLOR
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
  [MERGED_WDPA_VECTOR_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: "",
        color: MERGED_WDPA_COLOR
      }
    ],
    title: "Protected Areas",
    slug: MERGED_WDPA_VECTOR_TILE_LAYER
  }
}