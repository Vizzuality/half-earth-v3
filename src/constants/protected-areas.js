import {
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER,
  TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  MERGED_WDPA_VECTOR_TILE_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
  HALF_EARTH_FUTURE_METADATA_SLUG
} from 'constants/layers-slugs';
import { t } from '@transifex/native';

export const PROTECTED_AREAS_COLOR = '#008604';
export const FUTURE_PLACES_COLOR = '#FF9C32';
export const COMMUNITY_AREAS_COLOR = '#FCC44A';
export const NOT_UNDER_CONSERVATION_COLOR = '#6C828F';
export const WDPALayers = [
  {
    name: t('Protected areas'),
    value: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    id: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    title: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    metadataTitle: t('Protected areas')
  },
  {
    name: t('Community based'),
    value: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    id: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    title: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    slug: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    groupedLayer: true,
    metadataTitle: t('Community-based protected areas')

  }
];

export const conserveNextLayers = [
  {
    name: t('Places for a Half-Earth Future'),
    value: HALF_EARTH_FUTURE_TILE_LAYER,
    id: HALF_EARTH_FUTURE_TILE_LAYER,
    title: HALF_EARTH_FUTURE_TILE_LAYER,
    slug: HALF_EARTH_FUTURE_METADATA_SLUG,
    metadataTitle: t('Places for a Half-Earth Future')
  }
];

export const legendConfigs = {
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: t("Community-based"),
        color: PROTECTED_AREAS_COLOR
      }
    ],
    title: t("Community-based protected areas"),
    slug: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    groupedLayer: true
  },
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: t("Protected Areas"),
        color: PROTECTED_AREAS_COLOR
      }
    ],
    title: t("Protected areas"),
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER
  },
  [TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: t("Land protected Areas"),
        color: PROTECTED_AREAS_COLOR
      }
    ],
    title: t("Land protected areas"),
    slug: TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER
  },
  [MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: t("Marine protected areas"),
        color: PROTECTED_AREAS_COLOR
      }
    ],
    title: t("Marine protected areas"),
    slug: MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER
  },
  [HALF_EARTH_FUTURE_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: t("Places for a Half-Earth Future"),
        color: FUTURE_PLACES_COLOR
      }
    ],
    title: t("Places for a Half-Earth Future"),
    slug: HALF_EARTH_FUTURE_TILE_LAYER
  },
  [MERGED_WDPA_VECTOR_TILE_LAYER]: {
    type: "basic",
    items: [
      {
        name: "",
        color: PROTECTED_AREAS_COLOR
      }
    ],
    title: t("Protected Areas"),
    slug: MERGED_WDPA_VECTOR_TILE_LAYER
  }
}


export const TEXTS = {
  categoryTitle: t('Protection'),
  layersTitle: t('Conservation areas'),
  description: t('Global protections clasified according to their management objectives.')
}
