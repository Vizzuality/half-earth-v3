import {
  LAND_HUMAN_PRESSURES_IMAGE_LAYER
} from 'constants/layers-slugs';

export const HUMAN_PRESSURES_COLOR_RAMP = [
  "#f3e0f7",
  "#d1afe8",
  "#b998dd",
  "#9f82ce",
  "#826dba",
  "#3f3576",
  "#282052"
]

const RAINFED = 'Rainfed agriculture';
const IRRIGATED = 'Irrigated agriculture';
const URBAN = 'Urban pressures';

export const humanPressuresLandUse = [
  { name: RAINFED, value: 'rainfed', slug: 'human-pressures-rainfed' },
  { name: IRRIGATED, value: 'agriculture', slug: 'human-pressures-agriculture' },
  { name: URBAN, value: 'urban', slug: 'human-pressures-urban' }
];

export const humanPressuresLandscapeWidget = [
  ...humanPressuresLandUse,
  { name: 'Pressure free', value: 'pressureFree', slug: 'human-pressures-free' }
];

export const legendSingleRasterTitles = {
  rainfed: RAINFED,
  agriculture: IRRIGATED,
  urban: URBAN
}

export const legendConfigs = {
  [LAND_HUMAN_PRESSURES_IMAGE_LAYER]: {
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
