import {
  URBAN_HUMAN_PRESSURES_TILE_LAYER,
  IRRIGATED_HUMAN_PRESSURES_TILE_LAYER,
  RAINFED_HUMAN_PRESSURES_TILE_LAYER,
  RANGELAND_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
  ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
} from 'constants/layers-slugs';

import { t } from '@transifex/native';

export const PRESSURES_SLUGS = {
  urban: URBAN_HUMAN_PRESSURES_TILE_LAYER,
  rainfed: RAINFED_HUMAN_PRESSURES_TILE_LAYER,
  irrigated: IRRIGATED_HUMAN_PRESSURES_TILE_LAYER,
  rangeland: RANGELAND_HUMAN_PRESSURES_TILE_LAYER,
  land: MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  ocean: MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  commercial: COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
  artisanal:   ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
}

export const getHumanPressuresLandUse = () => {
  const RAINFED = t('Rainfed agriculture');
  const IRRIGATED = t('Irrigated agriculture');
  const URBAN = t('Urban pressures');
  const RANGELAND = t('Rangeland');

  return [
    { name: URBAN, value: PRESSURES_SLUGS.urban, slug: PRESSURES_SLUGS.urban },
    { name: RAINFED, value: PRESSURES_SLUGS.rainfed, slug: PRESSURES_SLUGS.rainfed },
    { name: IRRIGATED, value: PRESSURES_SLUGS.irrigated, slug: PRESSURES_SLUGS.irrigated },
    { name: RANGELAND, value: PRESSURES_SLUGS.rangeland, slug: PRESSURES_SLUGS.rangeland }
  ];
};

export const getHumanPressuresMarine = () => {
  const LAND_DRIVERS = t('Land-based drivers');
  const OCEAN_DRIVERS = t('Ocean-based drivers');
  const COMMERCIAL_FISHING = t('Commercial fishing');
  const ARTISANAL_FISHING = t('Artisanal fishing');

  return [
    { name: LAND_DRIVERS,
      value: PRESSURES_SLUGS.land,
      slug: PRESSURES_SLUGS.land
    },
    { name: OCEAN_DRIVERS, value: PRESSURES_SLUGS.ocean, slug: PRESSURES_SLUGS.ocean },
    { name: COMMERCIAL_FISHING, value: PRESSURES_SLUGS.commercial, slug: PRESSURES_SLUGS.commercial },
    { name: ARTISANAL_FISHING, value: PRESSURES_SLUGS.artisanal, slug: PRESSURES_SLUGS.artisanal },
  ]
}
