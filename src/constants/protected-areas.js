import {
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
  HALF_EARTH_FUTURE_METADATA_SLUG,
} from 'constants/layers-slugs';
import { t } from '@transifex/native';

export const PROTECTED_AREAS_COLOR = '#008604';
export const FUTURE_PLACES_COLOR = '#FF9C32';
export const COMMUNITY_AREAS_COLOR = '#FCC44A';
export const NOT_UNDER_CONSERVATION_COLOR = '#6C828F';
export const getWDPALayers = () => [
  {
    name: t('Protected areas'),
    value: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    id: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    title: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    metadataTitle: t('Protected areas'),
  },
  {
    name: t('Community based'),
    value: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    id: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    title: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    slug: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    groupedLayer: true,
    metadataTitle: t('Community-based protected areas'),

  },
];

export const getConserveNextLayers = () => [
  {
    name: t('Places for a Half-Earth Future'),
    value: HALF_EARTH_FUTURE_TILE_LAYER,
    id: HALF_EARTH_FUTURE_TILE_LAYER,
    title: HALF_EARTH_FUTURE_TILE_LAYER,
    slug: HALF_EARTH_FUTURE_METADATA_SLUG,
    metadataTitle: t('Places for a Half-Earth Future'),
  },
];
