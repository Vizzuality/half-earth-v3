import { t } from '@transifex/native';

import {
  ENERGY_HUMAN_PRESSURES_TILE_LAYER,
  BUILTUP_HUMAN_PRESSURES_TILE_LAYER,
  TRANSPORTATION_HUMAN_PRESSURES_TILE_LAYER,
  AGRICULTURE_HUMAN_PRESSURES_TILE_LAYER,
  INTRUSION_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
  ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
} from 'constants/layers-slugs';

export const PRESSURES_SLUGS = {
  extraction: ENERGY_HUMAN_PRESSURES_TILE_LAYER,
  builtup: BUILTUP_HUMAN_PRESSURES_TILE_LAYER,
  transportation: TRANSPORTATION_HUMAN_PRESSURES_TILE_LAYER,
  agriculture: AGRICULTURE_HUMAN_PRESSURES_TILE_LAYER,
  intrusion: INTRUSION_HUMAN_PRESSURES_TILE_LAYER,
  land: MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  ocean: MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  commercial: COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
  artisanal: ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
};

export const getHumanPressuresLandUse = () => {
  const ENERGY = t('Energy and extractive resources');
  const TRANSPORTATION = t('Transportation');
  const BUILTUP = t('Urban and Built up');
  const AGRICULTURE = t('Agriculture pressures');
  const INTRUSION = t('Human Intrusion');

  return [
    {
      name: ENERGY,
      value: PRESSURES_SLUGS.extraction,
      slug: PRESSURES_SLUGS.extraction,
    },
    {
      name: TRANSPORTATION,
      value: PRESSURES_SLUGS.transportation,
      slug: PRESSURES_SLUGS.transportation,
    },
    {
      name: AGRICULTURE,
      value: PRESSURES_SLUGS.agriculture,
      slug: PRESSURES_SLUGS.agriculture,
    },
    {
      name: BUILTUP,
      value: PRESSURES_SLUGS.builtup,
      slug: PRESSURES_SLUGS.builtup,
    },
    {
      name: INTRUSION,
      value: PRESSURES_SLUGS.intrusion,
      slug: PRESSURES_SLUGS.intrusion,
    },
  ];
};

export const getHumanPressuresMarine = () => {
  const LAND_DRIVERS = t('Land-based drivers');
  const OCEAN_DRIVERS = t('Ocean-based drivers');
  const COMMERCIAL_FISHING = t('Commercial fishing');
  const ARTISANAL_FISHING = t('Artisanal fishing');

  return [
    {
      name: LAND_DRIVERS,
      value: PRESSURES_SLUGS.land,
      slug: PRESSURES_SLUGS.land,
    },
    {
      name: OCEAN_DRIVERS,
      value: PRESSURES_SLUGS.ocean,
      slug: PRESSURES_SLUGS.ocean,
    },
    {
      name: COMMERCIAL_FISHING,
      value: PRESSURES_SLUGS.commercial,
      slug: PRESSURES_SLUGS.commercial,
    },
    {
      name: ARTISANAL_FISHING,
      value: PRESSURES_SLUGS.artisanal,
      slug: PRESSURES_SLUGS.artisanal,
    },
  ];
};
