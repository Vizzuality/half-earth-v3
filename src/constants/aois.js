import { t } from '@transifex/native';

export const STRINGIFIED_ATTRIBUTES = ['elu', 'pressures', 'protectedAreasList'];

export const AREA_TYPES = {
  custom: 'custom_aoi',
  futurePlaces: 'future_places',
  protected: 'protected_areas',
  administrative: 'administrative_boundaries',
  national: 'national_boundaries',
  subnational: 'subnational_boundaries',
  specificRegions: 'specific_regions',
};

export const BASE_LAYERS = [
  { title: 'graphic_layer' },
  { title: 'cities_labels_layer' },
  { title: 'countries_labels_layer' },
  { title: 'landscape_features_labels_layer' },
  { title: 'gadm-0-admin-areas-feature-layer' },
  { title: 'mask-layer' },
  { title: 'specific-regions-tile' },
  { title: 'admin_areas_feature_layer' },
];

export const getSidebarTabs = () => [
  { slug: 'map-layers', title: t('Map Layers') },
  { slug: 'analyze-areas', title: t('Analyze Areas') },
];
