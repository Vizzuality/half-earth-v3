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

export const getSidebarTabs = () => [
  { slug: 'map-layers', title: t('Map Layers') },
  { slug: 'analyze-areas', title: t('Analyze Areas') },
];
