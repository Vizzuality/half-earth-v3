import {
  AMPHIB_RARITY_1KM,
  AMPHIB_RICHNESS_1KM,
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
  REPTILES_RARITY_1KM,
  REPTILES_RICHNESS_1KM,
  AMPHIB_PRIORITY,
  AMPHIB_RARITY,
  AMPHIB_RICHNESS,
  FISHES_PRIORITY,
  FISHES_RARITY,
  FISHES_RICHNESS,
  MARINE_MAMMALS_PRIORITY,
  MARINE_MAMMALS_RICHNESS,
  MARINE_MAMMALS_RARITY,
  MAMMALS_PRIORITY,
  MAMMALS_RARITY,
  MAMMALS_RICHNESS,
  BIRDS_PRIORITY,
  BIRDS_RARITY,
  BIRDS_RICHNESS,
  ANTS_RICHNESS,
  BUTTERFLIES_RICHNESS,
  BUTTERFLIES_RICHNESS_1KM,
  BUTTERFLIES_RARITY_1KM,
  ODONATES_RICHNESS,
  SAPINDALES_RICHNESS,
  ALL_TAXA_RARITY,
  ALL_TAXA_RICHNESS,
  ALL_TAXA_PRIORITY,
  ALL_MARINE_VERTEBRATES_PRIORITY,
  ALL_MARINE_VERTEBRATES_RICHNESS,
  ALL_MARINE_VERTEBRATES_RARITY,
  REPTILES_PRIORITY,
  REPTILES_RARITY,
  REPTILES_RICHNESS,
  CACTI_RARITY,
  CACTI_RICHNESS,
  CONIFERS_RARITY,
  CONIFERS_RICHNESS,
  HUMMINGBIRDS_RARITY,
  HUMMINGBIRDS_RICHNESS,
} from 'constants/layers-slugs'

export const LAYER_VARIANTS = {
  PRIORITY: 'priority',
  RICHNESS: 'richness',
  RARITY: 'rarity'
};

const {PRIORITY, RICHNESS, RARITY} = LAYER_VARIANTS;

const TAXA_DISTRIBUTION = {
  TERRESTRIAL: 'terrestrial',
  MARINE: 'marine'
}

export const { TERRESTRIAL, MARINE } = TAXA_DISTRIBUTION

export const RESOLUTIONS = {
  LOWEST: {label: '~55km2 resolution', slug: 'LOWEST'},
  LOW: {label: '~27km2 resolution', slug: 'LOW'},
  HIGH: {label: '~1km2 resolution', slug: 'HIGH'},
  COUNTRY: {label: 'Country resolution', slug: 'COUNTRY'},
}


export const LAYERS_RESOLUTION = {
  [PRIORITY]: {
    [TERRESTRIAL]: [RESOLUTIONS.LOW],
    [MARINE]: [RESOLUTIONS.LOWEST]
  },
  [RICHNESS]: {
    [TERRESTRIAL]: [RESOLUTIONS.LOW, RESOLUTIONS.HIGH, RESOLUTIONS.COUNTRY],
    [MARINE]: [RESOLUTIONS.LOWEST]
  },
  [RARITY]: {
    [TERRESTRIAL]: [RESOLUTIONS.LOW, RESOLUTIONS.HIGH],
    [MARINE]: [RESOLUTIONS.LOWEST]
  },
}

export const DEFAULT_RESOLUTION = {[TERRESTRIAL]: 'LOW', [MARINE]: 'LOWEST'};

export const LAYERS_TOGGLE_CONFIG = {
  [PRIORITY]: {
    [TERRESTRIAL]: {
      'LOW': [
        {
          value: ALL_TAXA_PRIORITY,
          name: 'All terrestrial vertebrates',
          layer: ALL_TAXA_PRIORITY
        },
        {
          value: AMPHIB_PRIORITY,
          name: 'amphibians',
          layer: AMPHIB_PRIORITY
        },
        {
          value: BIRDS_PRIORITY,
          name: 'birds',
          layer: BIRDS_PRIORITY
        },
        {
          value: MAMMALS_PRIORITY,
          name: 'mammals',
          layer: MAMMALS_PRIORITY
        },
        {
          value: REPTILES_PRIORITY,
          name: 'reptiles',
          layer:  REPTILES_PRIORITY
        }
      ]
    },
    [MARINE]: {
      'LOWEST': [
        {
          value: ALL_MARINE_VERTEBRATES_PRIORITY,
          name: 'All marine vertebrates',
          layer: ALL_MARINE_VERTEBRATES_PRIORITY
        },
        {
          value: FISHES_PRIORITY,
          name: 'fishes',
          layer: FISHES_PRIORITY
        },
        {
          value: MARINE_MAMMALS_PRIORITY,
          name: 'mammals',
          layer: MARINE_MAMMALS_PRIORITY
        },
      ]
    }
  },
  [RICHNESS]: {
    [TERRESTRIAL]: {
      'LOW': [
        {
          value: ALL_TAXA_RICHNESS,
          name: 'all groups',
          layer: ALL_TAXA_RICHNESS
        },
        {
          value: AMPHIB_RICHNESS,
          name: 'amphibians',
          layer: AMPHIB_RICHNESS
        },
        {
          value: BIRDS_RICHNESS,
          name: 'birds',
          layer: BIRDS_RICHNESS
        },
        {
          value: CACTI_RICHNESS,
          name: 'cacti',
          layer: CACTI_RICHNESS
        },
        {
          value: CONIFERS_RICHNESS,
          name: 'conifers',
          layer: CONIFERS_RICHNESS
        },
        {
          value: MAMMALS_RICHNESS,
          name: 'mammals',
          layer: MAMMALS_RICHNESS
        },
        {
          value: REPTILES_RICHNESS,
          name: 'reptiles',
          layer: REPTILES_RICHNESS
        }
      ],
      'HIGH': [
        {
          value: AMPHIB_RICHNESS_1KM,
          name: 'amphibians',
          layer: AMPHIB_RICHNESS_1KM
        },
        {
          value: SA_BIRDS_RICHNESS,
          name: 'birds',
          layer: SA_BIRDS_RICHNESS
        },
        {
          value: BUTTERFLIES_RICHNESS_1KM,
          name: 'butterflies',
          layer: BUTTERFLIES_RICHNESS_1KM
        },
        {
          value: SA_DRAGONFLIES_RICHNESS,
          name: 'dragonflies',
          layer: SA_DRAGONFLIES_RICHNESS
        },
        {
          value: HUMMINGBIRDS_RICHNESS,
          name: 'hummingbirds',
          layer: HUMMINGBIRDS_RICHNESS
        },
        {
          value: SA_MAMMALS_RICHNESS,
          name: 'mammals',
          layer: SA_MAMMALS_RICHNESS
        },
        {
          value: SA_PROTEA_RICHNESS,
          name: 'protea',
          layer: SA_PROTEA_RICHNESS
        },
        {
          value: REPTILES_RICHNESS_1KM,
          name: 'reptiles',
          layer: REPTILES_RICHNESS_1KM
        },
        {
          value: SA_RESTIO_RICHNESS,
          name: 'restio',
          layer: SA_RESTIO_RICHNESS
        },
      ],
      'COUNTRY': [
        {
          value: ANTS_RICHNESS,
          name: 'ants',
          layer: ANTS_RICHNESS
        },
        {
          value: BUTTERFLIES_RICHNESS,
          name: 'butterflies',
          layer: BUTTERFLIES_RICHNESS
        },
        {
          value: ODONATES_RICHNESS,
          name: 'odonates',
          layer: ODONATES_RICHNESS
        },
        {
          value: SAPINDALES_RICHNESS,
          name: 'sapindales',
          layer: SAPINDALES_RICHNESS
        },
      ]
    },
    [MARINE]: {
      'LOWEST': [
        {
          value: ALL_MARINE_VERTEBRATES_RICHNESS,
          name: 'all marine vertebrates',
          layer: ALL_MARINE_VERTEBRATES_RICHNESS
        },
        {
          value: FISHES_RICHNESS,
          name: 'fishes',
          layer: FISHES_RICHNESS
        },
        {
          value: MARINE_MAMMALS_RICHNESS,
          name: 'mammals',
          layer: MARINE_MAMMALS_RICHNESS
        }
      ]
    }
  },
  [RARITY]: {
    [TERRESTRIAL]: {
      'LOW': [
        {
          value: ALL_TAXA_RARITY,
          name: 'all groups',
          layer: ALL_TAXA_RARITY
        },
        {
          value: AMPHIB_RARITY,
          name: 'amphibians',
          layer: AMPHIB_RARITY
        },
        {
          value: BIRDS_RARITY,
          name: 'birds',
          layer: BIRDS_RARITY
        },
        {
          value: CACTI_RARITY,
          name: 'cacti',
          layer: CACTI_RARITY
        },
        {
          value: CONIFERS_RARITY,
          name: 'conifers',
          layer: CONIFERS_RARITY
        },
        {
          value: MAMMALS_RARITY,
          name: 'mammals',
          layer: MAMMALS_RARITY
        },
        {
          value: REPTILES_RARITY,
          name: 'reptiles',
          layer: REPTILES_RARITY
        }
      ],
      'HIGH': [
        {
          value: AMPHIB_RARITY_1KM,
          name: 'amphibians',
          layer: AMPHIB_RARITY_1KM
        },
        {
          value: SA_BIRDS_RARITY,
          name: 'birds',
          layer: SA_BIRDS_RARITY
        },
        {
          value: BUTTERFLIES_RARITY_1KM,
          name: 'butterflies',
          layer: BUTTERFLIES_RARITY_1KM
        },
        {
          value: SA_DRAGONFLIES_RARITY,
          name: 'dragonflies',
          layer: SA_DRAGONFLIES_RARITY
        },
        {
          value: HUMMINGBIRDS_RARITY,
          name: 'hummingbirds',
          layer: HUMMINGBIRDS_RARITY
        },
        {
          value: SA_MAMMALS_RARITY,
          name: 'mammals',
          layer: SA_MAMMALS_RARITY
        },
        {
          value: SA_PROTEA_RARITY,
          name: 'protea',
          layer: SA_PROTEA_RARITY
        },
        {
          value: REPTILES_RARITY_1KM,
          name: 'reptiles',
          layer: REPTILES_RARITY_1KM
        },
        {
          value: SA_RESTIO_RARITY,
          name: 'restio',
          layer: SA_RESTIO_RARITY
        },
      ]
    },
    [MARINE]: {
      'LOWEST': [
        {
          value: ALL_MARINE_VERTEBRATES_RARITY,
          name: 'all marine vertebrates',
          layer: ALL_MARINE_VERTEBRATES_RARITY
        },
        {
          value: FISHES_RARITY,
          name: 'fishes',
          layer: FISHES_RARITY
        },
        {
          value: MARINE_MAMMALS_RARITY,
          name: 'mammals',
          layer: MARINE_MAMMALS_RARITY
        }
      ]
    }
  }
}

export const AOI_BIODIVERSITY_TOGGLES = [
  {
    name: 'All groups richness',
    value: ALL_TAXA_RICHNESS,
    id: ALL_TAXA_RICHNESS,
    title: ALL_TAXA_RICHNESS,
    slug: ALL_TAXA_RICHNESS,
    metadataTitle: 'Protected areas'
  },
  {
    name: 'All groups rarity',
    value: ALL_TAXA_RARITY,
    id: ALL_TAXA_RARITY,
    title: ALL_TAXA_RARITY,
    slug: ALL_TAXA_RARITY,
    metadataTitle: 'Protected areas'
  },
  {
    name: 'All groups priority',
    value: ALL_TAXA_PRIORITY,
    id: ALL_TAXA_PRIORITY,
    title: ALL_TAXA_PRIORITY,
    slug: ALL_TAXA_PRIORITY,
    metadataTitle: 'Protected areas'
  }
]
