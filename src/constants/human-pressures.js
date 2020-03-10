import {
  MERGED_LAND_HUMAN_PRESSURES,
  URBAN_HUMAN_PRESSURES_TILE_LAYER,
  IRRIGATED_HUMAN_PRESSURES_TILE_LAYER,
  RAINFED_HUMAN_PRESSURES_TILE_LAYER,
  RANGELAND_HUMAN_PRESSURES_TILE_LAYER
} from 'constants/layers-slugs';

export const HUMAN_PRESSURES_COLOR_RAMP = [
  "#ffffcc",
  "#C7E9B4",
  "#7FCDBB",
  "#41B6C4",
  "#1D91C0",
  "#225EA8",
  "#0C2C84"
]

const RAINFED = 'Rainfed agriculture';
const IRRIGATED = 'Irrigated agriculture';
const URBAN = 'Urban pressures';
const RANGELAND = 'Rangeland';

export const PRESSURES_SLUGS = {
  urban: URBAN_HUMAN_PRESSURES_TILE_LAYER,
  rainfed: RAINFED_HUMAN_PRESSURES_TILE_LAYER,
  irrigated: IRRIGATED_HUMAN_PRESSURES_TILE_LAYER,
  rangeland: RANGELAND_HUMAN_PRESSURES_TILE_LAYER
}

export const humanPressuresLandUse = [
  { name: URBAN, value: PRESSURES_SLUGS.urban, slug: PRESSURES_SLUGS.urban },
  { name: RAINFED, value: PRESSURES_SLUGS.rainfed, slug: PRESSURES_SLUGS.rainfed },
  { name: IRRIGATED, value: PRESSURES_SLUGS.irrigated, slug: PRESSURES_SLUGS.irrigated },
  { name: RANGELAND, value: PRESSURES_SLUGS.rangeland, slug: PRESSURES_SLUGS.rangeland }
];

export const humanPressuresLandscapeWidget = [
  ...humanPressuresLandUse,
  { name: 'Pressure free', value: 'pressureFree', slug: 'human-pressures-free' }
];

export const legendSingleRasterTitles = {
  [RAINFED_HUMAN_PRESSURES_TILE_LAYER]: RAINFED,
  [IRRIGATED_HUMAN_PRESSURES_TILE_LAYER]: IRRIGATED,
  [URBAN_HUMAN_PRESSURES_TILE_LAYER]: URBAN,
  [RANGELAND_HUMAN_PRESSURES_TILE_LAYER]: RANGELAND
}

export const legendConfigs = {
  [MERGED_LAND_HUMAN_PRESSURES]: {
    groupedLayer: true,
    type: "gradient",
    items: [
      {
        color: HUMAN_PRESSURES_COLOR_RAMP[0],
        value: "0"
      },
      {
        color: HUMAN_PRESSURES_COLOR_RAMP[1],
        value: ""
      },
      {
        color: HUMAN_PRESSURES_COLOR_RAMP[2],
        value: ""
      },
      {
        color: HUMAN_PRESSURES_COLOR_RAMP[3],
        value: ""
      },
      {
        color: HUMAN_PRESSURES_COLOR_RAMP[4],
        value: ""
      },
      {
        color: HUMAN_PRESSURES_COLOR_RAMP[5],
        value: ""
      },
      {
        color: HUMAN_PRESSURES_COLOR_RAMP[6],
        value: "100% use"
      }
    ]
  }
}
