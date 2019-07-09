import {
  LAND_HUMAN_PRESSURES_IMAGE_LAYER
} from 'constants/layers-slugs';

export const humanPressuresLandUse = [
  { name: 'Rainfed agriculture', value: 'rainfed', slug: 'human-pressures-rainfed' },
  { name: 'Irrigated agriculture', value: 'agriculture', slug: 'human-pressures-agriculture' },
  { name: 'Urban pressures', value: 'urban', slug: 'human-pressures-urban' }
];

export const humanPressuresLandscapeWidget = [
  { name: 'Rainfed agriculture', value: 'rainfed', slug: 'human-pressures-rainfed' },
  { name: 'Irrigated agriculture', value: 'agriculture', slug: 'human-pressures-agriculture' },
  { name: 'Urban pressures', value: 'urban', slug: 'human-pressures-urban' },
  { name: 'Pressure free', value: 'pressureFree', slug: 'human-pressures-free' }
];

export const legendConfigs = {
  [LAND_HUMAN_PRESSURES_IMAGE_LAYER]: {
    type: "gradient",
    items: [
      {
        color: "#f3e0f7",
        value: "0"
      },
      {
        color: "#d1afe8",
        value: ""
      },
      {
        color: "#b998dd",
        value: ""
      },
      {
        color: "#9f82ce",
        value: ""
      },
      {
        color: "#826dba",
        value: ""
      },
      {
        color: "#63589f",
        value: ""
      },
      {
        color: "#52478d",
        value: ""
      },
      {
        color: "#3f3576",
        value: ""
      },
      {
        color: "#282052",
        value: "100% use"
      }
    ]
  }
}

export const legendSingleRasterTitles = {
  rainfed: 'Rainfed agriculture',
  agriculture: 'Irrigated agriculture',
  urban: 'Urban pressures'
}