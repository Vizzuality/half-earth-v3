import {
  LAND_HUMAN_PRESSURES,
  MARINE_HUMAN_PRESSURES,
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


import {
  getLegendGradient
} from 'utils/legend-utils';

export const LAND_HUMAN_PRESSURES_COLOR_RAMP = [
  "rgba(0, 77, 168, 0.1)",
  "rgba(0, 77, 168, 0.1)",
  "rgba(166, 0, 212, 0.2)",
  "rgba(166, 0, 212, 0.2)",
  "rgba(166, 0, 212, 0.2)",
  "rgba(255, 0, 0, 0.5)",
  "rgba(255, 0, 0, 0.5)",
  "rgba(255, 0, 0, 0.5)",
  "rgb(255, 191, 0)",
  "rgb(255, 191, 0)",
]

export const MARINE_HUMAN_PRESSURES_COLOR_RAMP = [
  "rgba(86, 0, 115, 0.15)",
  "rgba(86, 0, 115, 0.15)",
  "rgba(86, 0, 115, 0.15)",
  "rgba(86, 0, 115, 0.15)",
  "rgba(86, 0, 115, 0.15)",
  "rgba(0, 14, 224, 0.25)",
  "rgba(0, 14, 224, 0.25)",
  "rgba(0, 14, 224, 0.25)",
  "rgb(0, 197, 255)",
  "rgb(0, 255, 230)",
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

// export const legendConfigs = {
//   [MARINE_AND_LAND_HUMAN_PRESSURES]: {
//     groupedLayer: true,
//     type: "gradient",
//     items: [
//       {
//         color: LAND_HUMAN_PRESSURES_COLOR_RAMP[0],
//         value: "low"
//       },
//       {
//         color: LAND_HUMAN_PRESSURES_COLOR_RAMP[1],
//         value: ""
//       },
//       {
//         color: LAND_HUMAN_PRESSURES_COLOR_RAMP[2],
//         value: ""
//       },
//       {
//         color: LAND_HUMAN_PRESSURES_COLOR_RAMP[3],
//         value: ""
//       },
//       {
//         color: LAND_HUMAN_PRESSURES_COLOR_RAMP[4],
//         value: ""
//       },
//       {
//         color: LAND_HUMAN_PRESSURES_COLOR_RAMP[5],
//         value: ""
//       },
//       {
//         color: LAND_HUMAN_PRESSURES_COLOR_RAMP[6],
//         value: ""
//       },
//       {
//         color: LAND_HUMAN_PRESSURES_COLOR_RAMP[7],
//         value: ""
//       },
//       {
//         color: LAND_HUMAN_PRESSURES_COLOR_RAMP[8],
//         value: ""
//       },
//       {
//         color: LAND_HUMAN_PRESSURES_COLOR_RAMP[9],
//         value: "high"
//       }
//     ]
//   }
// }

export const legendConfigs = {
  [MARINE_HUMAN_PRESSURES]: {
    groupedLayer: true,
    group: MARINE_HUMAN_PRESSURES,
    type: "gradient",
    items: getLegendGradient(MARINE_HUMAN_PRESSURES_COLOR_RAMP, 'low', 'high')
  },
  [LAND_HUMAN_PRESSURES]: {
    groupedLayer: true,
    group: LAND_HUMAN_PRESSURES,
    type: "gradient",
    items: getLegendGradient(LAND_HUMAN_PRESSURES_COLOR_RAMP, 'low', 'high')
  },
}
