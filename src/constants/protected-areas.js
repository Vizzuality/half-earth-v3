import {
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER
} from 'constants/layers-slugs';

export const PROTECTED_AREAS_COLOR = '#FF6C47';
export const COMMUNITY_AREAS_COLOR = '#FCC44A';
export const WDPALayers = [
  { 
    name: 'Protected areas',
    value: 'Protected areas',
    id: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    title: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    theme: 'overrideCheckbox-protected-areas',
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER
  },
  {
    name: 'Community-based',
    value: 'Community areas',
    id: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    title: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    theme: 'overrideCheckbox-community-areas',
    slug: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    groupedLayer: true
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
    title: "All protected areas",
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER
  }
}