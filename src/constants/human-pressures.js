import {
  MARINE_AND_LAND_HUMAN_PRESSURES,
  URBAN_HUMAN_PRESSURES_TILE_LAYER,
  IRRIGATED_HUMAN_PRESSURES_TILE_LAYER,
  RAINFED_HUMAN_PRESSURES_TILE_LAYER,
  RANGELAND_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
  ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
} from 'constants/layers-slugs';

export const HUMAN_PRESSURES_COLOR_RAMP = [
  "rgba(0, 77, 168, 0.1)",
  "rgba(166, 0, 212, 0.2)",
  "rgba(255, 0, 0, 0.5)",
  "rgb(255, 191, 0)",
]

const RAINFED = 'Rainfed agriculture';
const IRRIGATED = 'Irrigated agriculture';
const URBAN = 'Urban pressures';
const RANGELAND = 'Rangeland';
const LAND_DRIVERS = 'Land-based drivers';
const OCEAN_DRIVERS = 'Ocean-based drivers';
const COMMERCIAL_FISHING = 'Commercial fishing';
const ARTISANAL_FISHING = 'Artisanal fishing';

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

export const humanPressuresLandUse = [
  { name: URBAN, value: PRESSURES_SLUGS.urban, slug: PRESSURES_SLUGS.urban },
  { name: RAINFED, value: PRESSURES_SLUGS.rainfed, slug: PRESSURES_SLUGS.rainfed },
  { name: IRRIGATED, value: PRESSURES_SLUGS.irrigated, slug: PRESSURES_SLUGS.irrigated },
  { name: RANGELAND, value: PRESSURES_SLUGS.rangeland, slug: PRESSURES_SLUGS.rangeland }
];

export const humanPressuresMarine = [
  { name: LAND_DRIVERS, value: PRESSURES_SLUGS.land, slug: PRESSURES_SLUGS.land },
  { name: OCEAN_DRIVERS, value: PRESSURES_SLUGS.ocean, slug: PRESSURES_SLUGS.ocean },
  { name: COMMERCIAL_FISHING, value: PRESSURES_SLUGS.commercial, slug: PRESSURES_SLUGS.commercial },
  { name: ARTISANAL_FISHING, value: PRESSURES_SLUGS.artisanal, slug: PRESSURES_SLUGS.artisanal },
]

export const humanPressuresLandscapeWidget = [
  ...humanPressuresLandUse,
  { name: 'Pressure free', value: 'pressureFree', slug: 'human-pressures-free' },
];

export const legendSingleRasterTitles = {
  [RAINFED_HUMAN_PRESSURES_TILE_LAYER]: RAINFED,
  [IRRIGATED_HUMAN_PRESSURES_TILE_LAYER]: IRRIGATED,
  [URBAN_HUMAN_PRESSURES_TILE_LAYER]: URBAN,
  [RANGELAND_HUMAN_PRESSURES_TILE_LAYER]: RANGELAND,
  [MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER]: LAND_DRIVERS,
  [MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER]: OCEAN_DRIVERS,
  [COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER]: COMMERCIAL_FISHING,
  [ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER]: ARTISANAL_FISHING,
}
const getLegendGradient = (gradientSteps, lowValue, highValue) => {
  const stepsLength = gradientSteps.length;
  return gradientSteps.map((color, stepIndex) => ({
    color,
    value: getStepValue(stepsLength, stepIndex, lowValue, highValue)
  }))
}

const getStepValue = (stepsLength, stepIndex, lowValue, highValue) => {
  if (stepIndex === 0) {
    return lowValue;
  } else if (stepIndex === stepsLength -1) {
    return highValue;
  } else {
    return '';
  }
}
export const legendConfigs = {
  [MARINE_AND_LAND_HUMAN_PRESSURES]: {
    groupedLayer: true,
    type: "gradient",
    items: getLegendGradient(HUMAN_PRESSURES_COLOR_RAMP, 'low', 'high')
  }
}
