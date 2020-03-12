import {
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  VIBRANT_BASEMAP_LAYER,
  PRIORITY_PLACES_POLYGONS,
  PROTECTED_AREAS_FEATURE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_FEATURE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  RAISIG_AREAS_FEATURE_LAYER,
  RAISIG_AREAS_VECTOR_TILE_LAYER,
  GRID_CELLS_PROTECTED_AREAS_PERCENTAGE,
  GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER,
  FEATURED_PLACES_LAYER,
  LAND_HUMAN_PRESSURES_IMAGE_LAYER,
  SA_AMPHIB_RARITY,
  SA_AMPHIB_RICHNESS,
  SA_DRAGONFLIES_RARITY,
  SA_DRAGONFLIES_RICHNESS,
  SA_MAMMALS_RARITY,
  SA_MAMMALS_RICHNESS,
  SA_BIRDS_RARITY,
  SA_BIRDS_RICHNESS,
  SA_RESTIO_RARITY,
  SA_RESTIO_RICHNESS,
  SA_PROTEA_RARITY,
  SA_PROTEA_RICHNESS,
  SA_REPTILES_RARITY,
  SA_REPTILES_RICHNESS,
  AMPHIB_RARITY,
  AMPHIB_RICHNESS,
  FISHES_RARITY,
  FISHES_RICHNESS,
  MAMMALS_RARITY,
  MAMMALS_RICHNESS,
  BIRDS_RARITY,
  BIRDS_RICHNESS,
  ALL_TAXA_RARITY,
  ALL_TAXA_RICHNESS,
  TURTLES_RARITY,
  TURTLES_RICHNESS,
  CACTI_RARITY,
  CACTI_RICHNESS,
  CONIFERS_RARITY,
  CONIFERS_RICHNESS,
  HUMMINGBIRDS_RARITY,
  HUMMINGBIRDS_RICHNESS
} from 'constants/layers-slugs'


import { LAYERS_URLS } from 'constants/layers-urls';

const LAYER_TYPES = {
  FEATURE_LAYER: 'FeatureLayer',
  TILE_LAYER: 'TileLayer',
  VECTOR_TILE_LAYER: 'VectorTileLayer',
  IMAGERY_LAYER: 'ImageryLayer'
}

export const DEFAULT_OPACITY = 0.6;
export const LAYERS_CATEGORIES = {
  BIODIVERSITY: 'Biodiversity',
  PROTECTION: 'Existing protection',
  LAND_PRESSURES: 'Human pressures'
}

export const biodiversityCategories = [
  {
    name: 'TERRESTRIAL SPECIES',
    description: 'Global, ~110 km cell size mapping of terrestrial species. ',
    subcategories: false,
    taxa: [
      {
        value: 'all groups',
        name: 'all groups',
        layers: { rarity: 'all-taxa-rarity', richness: 'all-taxa-richness' }
      },
      {
        value: 'amphibians',
        name: 'amphibians',
        layers: { rarity: 'amphib-rarity', richness: 'amphib-rich' }
      },
      {
        value: 'birds',
        name: 'birds',
        layers: { rarity: 'birds-rarity', richness: 'birds-rich' }
      },
      {
        value: 'cacti',
        name: 'cacti',
        layers: { rarity: 'cacti-rarity', richness: 'cacti-richness' }
      },
      {
        value: 'conifers',
        name: 'conifers',
        layers: { rarity: 'conifers-rarity', richness: 'conifers-rich' }
      },
      {
        value: 'mammals',
        name: 'mammals',
        layers: { rarity: 'mammals-rare', richness: 'mammals-rich' }
      },
      {
        value: 'turtles',
        name: 'turtles',
        layers: { rarity: 'turtles-rare', richness: 'turtles-rich' }
      }
    ] 
  },
  {
    name: 'MARINE SPECIES',
    description: 'Global, ~50 km cell size mapping of marine species. ',
    subcategories: false,
    taxa: [
      {
        value: 'fishes',
        name: 'fishes',
        layers: { rarity: 'fishes-rarity', richness: 'fishes-rich' }
      }
    ]
  },
  {
    name: 'FINE SCALE DATA',
    description: 'Maps with 1km cell size for select species.',
    subcategories: [
      {
        name: 'hummingbirds',
        taxa: [
          {
            value: 'hummingbirds',
            name: 'hummingbirds',
            layers: { rarity: 'hummingbirds-rare', richness: 'hummingbirds-rich' }
          }
        ]
      },
      {
        name: 'south africa',
        taxa: [
          {
            value: 'sa_amphibians',
            name: 'amphibians',
            layers: { rarity: 'amphib-rarity-sa', richness: 'amphib-rich-sa' }
          },
          {
            value: 'sa_dragonflies',
            name: 'dragonflies',
            layers: { rarity: 'dragonflies-rare-sa', richness: 'dragonflies-rich-sa' }
          },
          {
            value: 'sa_mammals',
            name: 'mammals',
            layers: { rarity: 'mammals-rare-sa', richness: 'mammals-rich-sa' }
          },
          {
            value: 'sa_birds',
            name: 'birds',
            layers: { rarity: 'birds-rare-sa', richness: 'birds-rich-sa' }
          },
          {
            value: 'sa_restio',
            name: 'restio',
            layers: { rarity: 'restio-rare-sa', richness: 'restio-rich-sa' }
          },
          {
            value: 'sa_protea',
            name: 'protea',
            layers: { rarity: 'protea-rare-sa', richness: 'protea-rich-sa' }
          },
          {
            value: 'sa_reptiles',
            name: 'reptiles',
            layers: { rarity: 'reptiles-rare-sa', richness: 'reptiles-rich-sa' }
          },
          
        ]
      }
    ]
  }
]

export const layersConfig = {
  [LANDSCAPE_FEATURES_LABELS_LAYER]: {
    title: LANDSCAPE_FEATURES_LABELS_LAYER,
    slug: LANDSCAPE_FEATURES_LABELS_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[LANDSCAPE_FEATURES_LABELS_LAYER],
    bbox: null
  },
  [CITIES_LABELS_LAYER]: {
    title: CITIES_LABELS_LAYER,
    slug: CITIES_LABELS_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[CITIES_LABELS_LAYER],
    bbox: null
  },
  [VIBRANT_BASEMAP_LAYER]: {
    title: VIBRANT_BASEMAP_LAYER,
    slug: VIBRANT_BASEMAP_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[VIBRANT_BASEMAP_LAYER],
    bbox: null
  },
  [PRIORITY_PLACES_POLYGONS]: {
    title: PRIORITY_PLACES_POLYGONS,
    slug: PRIORITY_PLACES_POLYGONS,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[PRIORITY_PLACES_POLYGONS],
    bbox: null
  },
  [FEATURED_PLACES_LAYER]: {
    title: FEATURED_PLACES_LAYER,
    slug: FEATURED_PLACES_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[FEATURED_PLACES_LAYER],
    bbox: null
  },
  [PROTECTED_AREAS_FEATURE_LAYER]: {
    title: PROTECTED_AREAS_FEATURE_LAYER,
    slug: PROTECTED_AREAS_FEATURE_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[PROTECTED_AREAS_FEATURE_LAYER],
    bbox: null
  },
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
    title: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    type: LAYER_TYPES.VECTOR_TILE_LAYER,
    url: LAYERS_URLS[PROTECTED_AREAS_VECTOR_TILE_LAYER],
    bbox: null
  },
  [COMMUNITY_AREAS_FEATURE_LAYER]: {
    title: COMMUNITY_AREAS_FEATURE_LAYER,
    slug: COMMUNITY_AREAS_FEATURE_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[COMMUNITY_AREAS_FEATURE_LAYER],
    bbox: null
  },
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]: {
    title: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    slug: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    type: LAYER_TYPES.VECTOR_TILE_LAYER,
    url: LAYERS_URLS[COMMUNITY_AREAS_VECTOR_TILE_LAYER],
    bbox: null
  },
  [RAISIG_AREAS_FEATURE_LAYER]: {
    title: RAISIG_AREAS_FEATURE_LAYER,
    slug: RAISIG_AREAS_FEATURE_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[RAISIG_AREAS_FEATURE_LAYER],
    bbox: null
  },
  [RAISIG_AREAS_VECTOR_TILE_LAYER]: {
    title: RAISIG_AREAS_VECTOR_TILE_LAYER,
    slug: RAISIG_AREAS_VECTOR_TILE_LAYER,
    type: LAYER_TYPES.VECTOR_TILE_LAYER,
    url: LAYERS_URLS[RAISIG_AREAS_VECTOR_TILE_LAYER],
    bbox: null
  },
  [GRID_CELLS_PROTECTED_AREAS_PERCENTAGE]: {
    title: GRID_CELLS_PROTECTED_AREAS_PERCENTAGE,
    slug: GRID_CELLS_PROTECTED_AREAS_PERCENTAGE,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[GRID_CELLS_PROTECTED_AREAS_PERCENTAGE],
    bbox: null
  },
  [GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER]: {
    title: GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER,
    slug: GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER],
    bbox: null
  },
  [LAND_HUMAN_PRESSURES_IMAGE_LAYER]: {
    title: LAND_HUMAN_PRESSURES_IMAGE_LAYER,
    slug: LAND_HUMAN_PRESSURES_IMAGE_LAYER,
    type: LAYER_TYPES.IMAGERY_LAYER,
    url: LAYERS_URLS[LAND_HUMAN_PRESSURES_IMAGE_LAYER],
    bbox: null
  },
  [SA_AMPHIB_RARITY]: {
    title: SA_AMPHIB_RARITY,
    slug: SA_AMPHIB_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_AMPHIB_RARITY],
    bbox: [13,-37,34,-27.7]
  },
  [SA_AMPHIB_RICHNESS]: {
    title: SA_AMPHIB_RICHNESS,
    slug: SA_AMPHIB_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_AMPHIB_RICHNESS],
    bbox: [13,-37,34,-27.7]
  },
  [SA_DRAGONFLIES_RARITY]: {
    title: SA_DRAGONFLIES_RARITY,
    slug: SA_DRAGONFLIES_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_DRAGONFLIES_RARITY],
    bbox: [13,-37,34,-27.7]
  },
  [SA_DRAGONFLIES_RICHNESS]: {
    title: SA_DRAGONFLIES_RICHNESS,
    slug: SA_DRAGONFLIES_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_DRAGONFLIES_RICHNESS],
    bbox: [13,-37,34,-27.7]
  },
  [SA_MAMMALS_RARITY]: {
    title: SA_MAMMALS_RARITY,
    slug: SA_MAMMALS_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_MAMMALS_RARITY],
    bbox: [13,-37,34,-27.7]
  },
  [SA_MAMMALS_RICHNESS]: {
    title: SA_MAMMALS_RICHNESS,
    slug: SA_MAMMALS_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_MAMMALS_RICHNESS],
    bbox: [13,-37,34,-27.7]
  },
  [SA_BIRDS_RARITY]: {
    title: SA_BIRDS_RARITY,
    slug: SA_BIRDS_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_BIRDS_RARITY],
    bbox: [13,-37,34,-27.7]
  },
  [SA_BIRDS_RICHNESS]: {
    title: SA_BIRDS_RICHNESS,
    slug: SA_BIRDS_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_BIRDS_RICHNESS],
    bbox: [13,-37,34,-27.7]
  },
  [SA_RESTIO_RARITY]: {
    title: SA_RESTIO_RARITY,
    slug: SA_RESTIO_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_RESTIO_RARITY],
    bbox: [13,-37,34,-27.7]
  },
  [SA_RESTIO_RICHNESS]: {
    title: SA_RESTIO_RICHNESS,
    slug: SA_RESTIO_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_RESTIO_RICHNESS],
    bbox: [13,-37,34,-27.7]
  },
  [SA_PROTEA_RARITY]: {
    title: SA_PROTEA_RARITY,
    slug: SA_PROTEA_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_PROTEA_RARITY],
    bbox: [13,-37,34,-27.7]
  },
  [SA_PROTEA_RICHNESS]: {
    title: SA_PROTEA_RICHNESS,
    slug: SA_PROTEA_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_PROTEA_RICHNESS],
    bbox: [13,-37,34,-27.7]
  },
  [SA_REPTILES_RARITY]: {
    title: SA_REPTILES_RARITY,
    slug: SA_REPTILES_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_REPTILES_RARITY],
    bbox: [13,-37,34,-27.7]
  },
  [SA_REPTILES_RICHNESS]: {
    title: SA_REPTILES_RICHNESS,
    slug: SA_REPTILES_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SA_REPTILES_RICHNESS],
    bbox: [13,-37,34,-27.7]
  },
  [HUMMINGBIRDS_RARITY]: {
    title: HUMMINGBIRDS_RARITY,
    slug: HUMMINGBIRDS_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[HUMMINGBIRDS_RARITY],
    bbox: [-164,-40,-35,56]
  },
  [HUMMINGBIRDS_RICHNESS]: {
    title: HUMMINGBIRDS_RICHNESS,
    slug: HUMMINGBIRDS_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[HUMMINGBIRDS_RICHNESS],
    bbox: [-164,-40,-35,56]
  },
  [FISHES_RARITY]: {
    title: FISHES_RARITY,
    slug: FISHES_RARITY,
    type: null,
    url: LAYERS_URLS[FISHES_RARITY],
    bbox: null
  },
  [FISHES_RICHNESS]: {
    title: FISHES_RICHNESS,
    slug: FISHES_RICHNESS,
    type: null,
    url: LAYERS_URLS[FISHES_RICHNESS],
    bbox: null
  },
  [AMPHIB_RARITY]: {
    title: AMPHIB_RARITY,
    slug: AMPHIB_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[AMPHIB_RARITY],
    bbox: null
  },
  [AMPHIB_RICHNESS]: {
    title: AMPHIB_RICHNESS,
    slug: AMPHIB_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[AMPHIB_RICHNESS],
    bbox: null
  },
  [MAMMALS_RARITY]: {
    title: MAMMALS_RARITY,
    slug: MAMMALS_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[MAMMALS_RARITY],
    bbox: null
  },
  [MAMMALS_RICHNESS]: {
    title: MAMMALS_RICHNESS,
    slug: MAMMALS_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[MAMMALS_RICHNESS],
    bbox: null
  },
  [BIRDS_RARITY]: {
    title: BIRDS_RARITY,
    slug: BIRDS_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[BIRDS_RARITY],
    bbox: null
  },
  [BIRDS_RICHNESS]: {
    title: BIRDS_RICHNESS,
    slug: BIRDS_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[BIRDS_RICHNESS],
    bbox: null
  },
  [ALL_TAXA_RARITY]: {
    title: ALL_TAXA_RARITY,
    slug: ALL_TAXA_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[ALL_TAXA_RARITY],
    bbox: null
  },
  [ALL_TAXA_RICHNESS]: {
    title: ALL_TAXA_RICHNESS,
    slug: ALL_TAXA_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[ALL_TAXA_RICHNESS],
    bbox: null
  },
  [TURTLES_RARITY]: {
    title: TURTLES_RARITY,
    slug: TURTLES_RARITY,
    type: null,
    url: LAYERS_URLS[TURTLES_RARITY],
    bbox: null
  },
  [TURTLES_RICHNESS]: {
    title: TURTLES_RICHNESS,
    slug: TURTLES_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[TURTLES_RICHNESS],
    bbox: null
  },
  [CACTI_RARITY]: {
    title: CACTI_RARITY,
    slug: CACTI_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[CACTI_RARITY],
    bbox: null
  },
  [CACTI_RICHNESS]: {
    title: CACTI_RICHNESS,
    slug: CACTI_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[CACTI_RICHNESS],
    bbox: null
  },
  [CONIFERS_RARITY]: {
    title: CONIFERS_RARITY,
    slug: CONIFERS_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[CONIFERS_RARITY],
    bbox: null
  },
  [CONIFERS_RICHNESS]: {
    title: CONIFERS_RICHNESS,
    slug: CONIFERS_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[CONIFERS_RICHNESS],
    bbox: null
  },
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

export const BIODIVERSITY_LAYERS_COLOUR_RAMP = [
  '#0664F6',
  '#2172DB',
  '#3D80BF',
  '#588EA4',
  '#749C89',
  '#8FAB6D',
  '#ABB952',
  '#C6C737',
  '#E2D51B',
  "#FDE300"
]

export const legendConfigs = {
  // Fishing activities
  fishing_all: {
    type: "gradient",
    items: [
      {
        color: "#282052",
        value: "0"
      },
      {
        color: "#3f3576",
        value: ""
      },
      {
        color: "#52478d",
        value: ""
      },
      {
        color: "#63589f",
        value: ""
      },
      {
        color: "#826dba",
        value: ""
      },
      {
        color: "#9f82ce",
        value: ""
      },
      {
        color: "#b998dd",
        value: ""
      },
      {
        color: "#d1afe8",
        value: ""
      },
      {
        color: "#f3e0f7",
        value: "122 hours/km²"
      }
    ],
    title: "All marine fishing types"
  },
  fishing_longlines: {
    type: "gradient",
    items: [
    {
    color: "#282052",
    value: "0"
    },
    {
    color: "#3f3576",
    value: ""
    },
    {
    color: "#52478d",
    value: ""
    },
    {
    color: "#63589f",
    value: ""
    },
    {
    color: "#826dba",
    value: ""
    },
    {
    color: "#9f82ce",
    value: ""
    },
    {
    color: "#b998dd",
    value: ""
    },
    {
    color: "#d1afe8",
    value: ""
    },
    {
    color: "#f3e0f7",
    value: "8 hours/km²"
    }
    ],
    title: "Drifting longline fishing"
  },
  fishing_fixed: {
    type: "gradient",
    items: [
    {
    color: "#282052",
    value: "0"
    },
    {
    color: "#3f3576",
    value: ""
    },
    {
    color: "#52478d",
    value: ""
    },
    {
    color: "#63589f",
    value: ""
    },
    {
    color: "#826dba",
    value: ""
    },
    {
    color: "#9f82ce",
    value: ""
    },
    {
    color: "#b998dd",
    value: ""
    },
    {
    color: "#d1afe8",
    value: ""
    },
    {
    color: "#f3e0f7",
    value: "40 hours/km²"
    }
    ],
    title: "Fixed-gear fishing"
  },
  fishing_other: {
    type: "gradient",
    items: [
    {
    color: "#282052",
    value: "0"
    },
    {
    color: "#3f3576",
    value: ""
    },
    {
    color: "#52478d",
    value: ""
    },
    {
    color: "#63589f",
    value: ""
    },
    {
    color: "#826dba",
    value: ""
    },
    {
    color: "#9f82ce",
    value: ""
    },
    {
    color: "#b998dd",
    value: ""
    },
    {
    color: "#d1afe8",
    value: ""
    },
    {
    color: "#f3e0f7",
    value: "13 hours/km²"
    }
    ],
    title: "Other fishing types"
  },
  fishing_purse: {
    type: "gradient",
    items: [
    {
    color: "#282052",
    value: "0"
    },
    {
    color: "#3f3576",
    value: ""
    },
    {
    color: "#52478d",
    value: ""
    },
    {
    color: "#63589f",
    value: ""
    },
    {
    color: "#826dba",
    value: ""
    },
    {
    color: "#9f82ce",
    value: ""
    },
    {
    color: "#b998dd",
    value: ""
    },
    {
    color: "#d1afe8",
    value: ""
    },
    {
    color: "#f3e0f7",
    value: "5 hours/km²"
    }
    ],
    title: "Purse seins fishing"
  },
  fishing_trawlers: {
    type: "gradient",
    items: [
    {
    color: "#282052",
    value: "0"
    },
    {
    color: "#3f3576",
    value: ""
    },
    {
    color: "#52478d",
    value: ""
    },
    {
    color: "#63589f",
    value: ""
    },
    {
    color: "#826dba",
    value: ""
    },
    {
    color: "#9f82ce",
    value: ""
    },
    {
    color: "#b998dd",
    value: ""
    },
    {
    color: "#d1afe8",
    value: ""
    },
    {
    color: "#f3e0f7",
    value: "88 hours/km²"
    }
    ],
    title: "Fishing trawlers"
  },
  // South Africa
  'amphib-rarity-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Amphibian regional rarity"
  },
  'amphib-rich-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '1', '25 species'),
    title: "Amphibian regional richness"
  },
  'dragonflies-rare-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Dragonflies rarity"
  },
  'dragonflies-rich-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '3', '68 species'),
    title: "Dragonflies richness"
  },
  'mammals-rare-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Mammals regional rarity"
  },
  'mammals-rich-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '1', '49 species'),
    title: "Mammals regional richness"
  },
  'birds-rare-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Birds regional rarity"
  },
  'birds-rich-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '1', '375 species'),
    title: "Birds regional richness"
  },
  'restio-rare-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Restio regional rarity"
  },
  'restio-rich-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '1', '166 species'),
    title: "Restio regional richness"
  },
  'protea-rare-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "-10.9"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "-6.2"
    }
    ],
    title: "Protea regional rarity"
  },
  'protea-rich-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '1', '68 species'),
    title: "Protea regional richness"
  },
  'reptiles-rare-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Reptiles regional rarity"
  },
  'reptiles-rich-sa': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '1', '57 species'),
    title: "Reptiles regional richness"
  },
  // Hummingbirds
  'hummingbirds-rich': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '1', '92 species'),
    title: "Hummingbirds richness"
  },
  'hummingbirds-rare': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Hummingbirds rarity"
  },
  // Global data
  'mammals-rare': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Mammals rarity"
  },
  'mammals-rich': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '0', '225 species'),
    title: "Mammals richness"
  },
  'fishes-rarity': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Fishes rarity"
  },
  'fishes-rich': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "3,469 species"
    }
    ],
    title: "Fishes richness"
  },
  'conifers-rarity': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Conifers rarity"
  },
  'conifers-rich': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '0', '49 species'),
    title: "Conifers richness"
  },
  'cacti-rarity': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Cacti rarity"
  },
  'cacti-richness': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '0', '93 species'),
    title: "Cacti richness"
  },
  'amphib-rarity': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Amphibian rarity"
  },
  'amphib-rich': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '0', '180 species'),
    title: "Amphibian richness"
  },
  'turtles-rich': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '0', '22 species'),
    title: "Turtle richness"
  },
  'turtles-rare': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Turtle rarity"
  },
  'birds-rarity': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Birds rarity"
  },
  'birds-rich': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '0', '1,010 species'),
    title: "Birds richness"
  },
  'all-taxa-rarity': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "All groups rarity"
  },
  'all-taxa-richness': {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, '1', '3,469 species'),
    title: "All groups richness"
  }
}