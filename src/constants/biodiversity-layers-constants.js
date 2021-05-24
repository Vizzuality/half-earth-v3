import {
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
  AMPHIB_PRIORITY,
  AMPHIB_RARITY,
  AMPHIB_RICHNESS,
  FISHES_RARITY,
  FISHES_RICHNESS,
  FISHES_PRIORITY,
  MARINE_MAMMALS_RICHNESS,
  MARINE_MAMMALS_RARITY,
  MARINE_MAMMALS_PRIORITY,
  ALL_MARINE_VERTEBRATES_RICHNESS,
  ALL_MARINE_VERTEBRATES_RARITY,
  ALL_MARINE_VERTEBRATES_PRIORITY,
  MAMMALS_PRIORITY,
  MAMMALS_RARITY,
  MAMMALS_RICHNESS,
  BIRDS_PRIORITY,
  BIRDS_RARITY,
  BIRDS_RICHNESS,
  ALL_TAXA_RARITY,
  ALL_TAXA_RICHNESS,
  ALL_TAXA_PRIORITY,
  REPTILES_PRIORITY,
  REPTILES_RARITY,
  REPTILES_RICHNESS,
  CACTI_RARITY,
  CACTI_RICHNESS,
  CONIFERS_RARITY,
  CONIFERS_RICHNESS,
  HUMMINGBIRDS_RARITY,
  HUMMINGBIRDS_RICHNESS,
  COUNTRY_PRIORITY_LAYER
} from 'constants/layers-slugs'

export const LAYER_VARIANTS = {
  PRIORITY: 'priority',
  RICHNESS: 'richness',
  RARITY: 'rarity'
};

export const biodiversityCategories = {
  [LAYER_VARIANTS.PRIORITY]: [
    {
      name: 'TERRESTRIAL SPECIES',
      description: 'Global, ~55 km cell size mapping of terrestrial species. ',
      subcategories: false,
      taxa: [
        {
          value: 'all groups',
          name: 'All terrestrial vertebrates',
          layer: ALL_TAXA_PRIORITY
        },
        {
          value: 'amphibians',
          name: 'amphibians',
          layer: AMPHIB_PRIORITY
        },
        {
          value: 'birds',
          name: 'birds',
          layer: BIRDS_PRIORITY
        },
        {
          value: 'mammals',
          name: 'mammals',
          layer: MAMMALS_PRIORITY
        },
        {
          value: 'reptiles',
          name: 'reptiles',
          layer:  REPTILES_PRIORITY
        }
      ]
    },{
      name: 'MARINE SPECIES',
      description: 'Global, ~55 km cell size mapping of marine species. ',
      subcategories: false,
      taxa: [
        {
          value: 'marine vertebrates',
          name: 'all marine vertebrates',
          layer: ALL_MARINE_VERTEBRATES_PRIORITY
        },
        {
          value: 'fishes',
          name: 'fishes',
          layer: FISHES_PRIORITY
        },
        {
          value: 'mammals',
          name: 'mammals',
          layer: MARINE_MAMMALS_PRIORITY
        }
      ]
    },
  ],
  [LAYER_VARIANTS.RICHNESS]: [
    {
      name: 'TERRESTRIAL SPECIES',
      description: 'Global, ~55 km cell size mapping of terrestrial species. ',
      subcategories: false,
      taxa: [
        {
          value: 'all groups',
          name: 'all groups',
          layer: ALL_TAXA_RICHNESS
        },
        {
          value: 'amphibians',
          name: 'amphibians',
          layer: AMPHIB_RICHNESS
        },
        {
          value: 'birds',
          name: 'birds',
          layer: BIRDS_RICHNESS
        },
        {
          value: 'cacti',
          name: 'cacti',
          layer: CACTI_RICHNESS
        },
        {
          value: 'conifers',
          name: 'conifers',
          layer: CONIFERS_RICHNESS
        },
        {
          value: 'mammals',
          name: 'mammals',
          layer: MAMMALS_RICHNESS
        },
        {
          value: 'reptiles',
          name: 'reptiles',
          layer: REPTILES_RICHNESS
        }
      ]
    },
    {
      name: 'MARINE SPECIES',
      description: 'Global, ~55 km cell size mapping of marine species. ',
      subcategories: false,
      taxa: [
        {
          value: 'marine vertebrates',
          name: 'marine vertebrates',
          layer: ALL_MARINE_VERTEBRATES_RICHNESS
        },
        {
          value: 'fishes',
          name: 'fishes',
          layer: FISHES_RICHNESS
        },
        {
          value: 'mammals',
          name: 'mammals',
          layer: MARINE_MAMMALS_RICHNESS
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
              layer: HUMMINGBIRDS_RICHNESS
            }
          ]
        },
        {
          name: 'south africa',
          taxa: [
            {
              value: 'sa_amphibians',
              name: 'amphibians',
              layer: SA_AMPHIB_RICHNESS
            },
            {
              value: 'sa_dragonflies',
              name: 'dragonflies',
              layer: SA_DRAGONFLIES_RICHNESS
            },
            {
              value: 'sa_mammals',
              name: 'mammals',
              layer: SA_MAMMALS_RICHNESS
            },
            {
              value: 'sa_birds',
              name: 'birds',
              layer: SA_BIRDS_RICHNESS
            },
            {
              value: 'sa_restio',
              name: 'restio',
              layer: SA_RESTIO_RICHNESS
            },
            {
              value: 'sa_protea',
              name: 'protea',
              layer: SA_PROTEA_RICHNESS
            },
            {
              value: 'sa_reptiles',
              name: 'reptiles',
              layer: SA_REPTILES_RICHNESS
            },

          ]
        }
      ]
    }
  ],
  [LAYER_VARIANTS.RARITY]: [
    {
      name: 'TERRESTRIAL SPECIES',
      description: 'Global, ~55 km cell size mapping of terrestrial species. ',
      subcategories: false,
      taxa: [
        {
          value: 'all groups',
          name: 'all groups',
          layer: ALL_TAXA_RARITY
        },
        {
          value: 'amphibians',
          name: 'amphibians',
          layer: AMPHIB_RARITY
        },
        {
          value: 'birds',
          name: 'birds',
          layer: BIRDS_RARITY
        },
        {
          value: 'cacti',
          name: 'cacti',
          layer: CACTI_RARITY
        },
        {
          value: 'conifers',
          name: 'conifers',
          layer: CONIFERS_RARITY
        },
        {
          value: 'mammals',
          name: 'mammals',
          layer: MAMMALS_RARITY
        },
        {
          value: 'reptiles',
          name: 'reptiles',
          layer: REPTILES_RARITY
        }
      ]
    },
    {
      name: 'MARINE SPECIES',
      description: 'Global, ~55 km cell size mapping of marine species. ',
      subcategories: false,
      taxa: [
        {
          value: 'marine vertebrates',
          name: 'marine vertebrates',
          layer: ALL_MARINE_VERTEBRATES_RARITY
        },
        {
          value: 'fishes',
          name: 'fishes',
          layer: FISHES_RARITY
        },
        {
          value: 'mammals',
          name: 'mammals',
          layer: MARINE_MAMMALS_RARITY
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
              layer: HUMMINGBIRDS_RARITY
            }
          ]
        },
        {
          name: 'south africa',
          taxa: [
            {
              value: 'sa_amphibians',
              name: 'amphibians',
              layer: SA_AMPHIB_RARITY
            },
            {
              value: 'sa_dragonflies',
              name: 'dragonflies',
              layer: SA_DRAGONFLIES_RARITY
            },
            {
              value: 'sa_mammals',
              name: 'mammals',
              layer: SA_MAMMALS_RARITY
            },
            {
              value: 'sa_birds',
              name: 'birds',
              layer: SA_BIRDS_RARITY
            },
            {
              value: 'sa_restio',
              name: 'restio',
              layer: SA_RESTIO_RARITY
            },
            {
              value: 'sa_protea',
              name: 'protea',
              layer: SA_PROTEA_RARITY
            },
            {
              value: 'sa_reptiles',
              name: 'reptiles',
              layer: SA_REPTILES_RARITY
            }
          ]
        }
      ]
    }
  ]
};

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
export const PRIORITY_PLACES_COLOUR_RAMP = [
  '#47039F',
  '#9C179E',
  '#BD3786',
  '#D8576B',
  '#ED7953',
  '#FA9E3B',
  '#FDC926',
  '#F0F921'
]

const defaultGradientConfig = {
  type: "gradient",
  items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
}

export const legendConfigs = {
  // South Africa
  [SA_AMPHIB_RARITY]: {
    ...defaultGradientConfig,
    title: "Amphibian regional rarity"
  },
  [SA_AMPHIB_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Amphibian regional richness"
  },
  [SA_DRAGONFLIES_RARITY]: {
    ...defaultGradientConfig,
    title: "Dragonflies rarity"
  },
  [SA_DRAGONFLIES_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Dragonflies richness"
  },
  [SA_MAMMALS_RARITY]: {
    ...defaultGradientConfig,
    title: "Mammals regional rarity"
  },
  [SA_MAMMALS_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Mammals regional richness"
  },
  [SA_BIRDS_RARITY]: {
    ...defaultGradientConfig,
    title: "Birds regional rarity"
  },
  [SA_BIRDS_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Birds regional richness"
  },
  [SA_RESTIO_RARITY]: {
    ...defaultGradientConfig,
    title: "Restio regional rarity"
  },
  [SA_RESTIO_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Restio regional richness"
  },
  [SA_PROTEA_RARITY]: {
    ...defaultGradientConfig,
    title: "Protea regional rarity"
  },
  [SA_PROTEA_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Protea regional richness"
  },
  [SA_REPTILES_RARITY]: {
    ...defaultGradientConfig,
    title: "Reptiles regional rarity"
  },
  [SA_REPTILES_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Reptiles regional richness"
  },
  // Hummingbirds
  [HUMMINGBIRDS_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Hummingbirds richness"
  },
  [HUMMINGBIRDS_RARITY]: {
    ...defaultGradientConfig,
    title: "Hummingbirds rarity"
  },
  // Global data
  [MAMMALS_PRIORITY]: {
    ...defaultGradientConfig,
    title: "Global Terrestrial Mammals priority"
  },
  [MAMMALS_RARITY]: {
    ...defaultGradientConfig,
    title: "Terrestrial Mammals rarity"
  },
  [MAMMALS_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Terrestrial Mammals richness"
  },
  [FISHES_RARITY]: {
    ...defaultGradientConfig,
    title: "Fishes rarity"
  },
  [FISHES_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Fishes richness"
  },
  [FISHES_PRIORITY]: {
    ...defaultGradientConfig,
    title: "Global fishes priority"
  },
  [MARINE_MAMMALS_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Marine mammals richness"
  },
  [MARINE_MAMMALS_RARITY]: {
    ...defaultGradientConfig,
    title: "Marine mammals rarity"
  },
  [MARINE_MAMMALS_PRIORITY]: {
    ...defaultGradientConfig,
    title: "Global marine mammals priority"
  },
  [ALL_MARINE_VERTEBRATES_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Marine vertebrates richness"
  },
  [ALL_MARINE_VERTEBRATES_RARITY]: {
    ...defaultGradientConfig,
    title: "Marine vertebrates rarity"
  },
  [ALL_MARINE_VERTEBRATES_PRIORITY]: {
    ...defaultGradientConfig,
    title: "Global marine vertebrates priority"
  },
  [CONIFERS_RARITY]: {
    ...defaultGradientConfig,
    title: "Conifers rarity"
  },
  [CONIFERS_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Conifers richness"
  },
  [CACTI_RARITY]: {
    ...defaultGradientConfig,
    title: "Cacti rarity"
  },
  [CACTI_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Cacti richness"
  },
  [AMPHIB_PRIORITY]: {
    ...defaultGradientConfig,
    title: "Global Amphibian priority"
  },
  [AMPHIB_RARITY]: {
    ...defaultGradientConfig,
    title: "Amphibian rarity"
  },
  [AMPHIB_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Amphibian richness"
  },
  [REPTILES_PRIORITY]: {
    ...defaultGradientConfig,
    title: "Global Reptile priority"
  },
  [REPTILES_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Reptile richness"
  },
  [REPTILES_RARITY]: {
    ...defaultGradientConfig,
    title: "Reptile rarity"
  },
  [BIRDS_PRIORITY]: {
    ...defaultGradientConfig,
    title: "Global Birds priority"
  },
  [BIRDS_RARITY]: {
    ...defaultGradientConfig,
    title: "Birds rarity"
  },
  [BIRDS_RICHNESS]: {
    ...defaultGradientConfig,
    title: "Birds richness"
  },
  [ALL_TAXA_PRIORITY]: {
    ...defaultGradientConfig,
    title: "Global terrestrial vertebrate priority"
  },
  [ALL_TAXA_RARITY]: {
    ...defaultGradientConfig,
    title: "All terrestrial groups rarity"
  },
  [ALL_TAXA_RICHNESS]: {
    ...defaultGradientConfig,
    title: "All terrestrial groups richness"
  },
  [COUNTRY_PRIORITY_LAYER]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low priority', 'high priority'),
    title: "Protection needed"
  }
}
