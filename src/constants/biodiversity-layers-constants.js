import { t } from '@transifex/native';

import {
  AMPHIB_RARITY_1KM,
  AMPHIB_RICHNESS_1KM,
  DRAGONFLIES_RARITY_1KM,
  DRAGONFLIES_RICHNESS_1KM,
  BIRDS_RARITY_1KM,
  BIRDS_RICHNESS_1KM,
  RESTIO_RARITY_1KM,
  RESTIO_RICHNESS_1KM,
  PROTEA_RARITY_1KM,
  PROTEA_RICHNESS_1KM,
  REPTILES_RARITY_1KM,
  REPTILES_RICHNESS_1KM,
  MAMMALS_RICHNESS_1KM,
  SUMMER_BIRDS_RICHNESS_1KM,
  WINTER_BIRDS_RICHNESS_1KM,
  MAMMALS_RARITY_1KM,
  SUMMER_BIRDS_RARITY_1KM,
  WINTER_BIRDS_RARITY_1KM,
  RESIDENT_BIRDS_RICHNESS_1KM,
  RESIDENT_BIRDS_RARITY_1KM,
  ANTS_RARITY_GLOBAL,
  ANTS_RICHNESS_GLOBAL,
  ANTS_RARITY_1KM,
  ANTS_RICHNESS_1KM,
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
  ALL_VERTEBRATES_PRIORITY,
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
  TREES_PRIORITY,
  TREES_RARITY,
  TREES_RICHNESS,
  HUMMINGBIRDS_RARITY,
  HUMMINGBIRDS_RICHNESS,
  BIRDS_SACA_RARITY_TOTAL,
  BIRDS_SACA_RICHNESS_TOTAL,
  MAMMALS_SACA_RARITY_TOTAL,
  MAMMALS_SACA_RICHNESS_TOTAL,
} from 'constants/layers-slugs';

export const LAYER_VARIANTS = {
  PRIORITY: 'priority',
  RICHNESS: 'richness',
  RARITY: 'rarity',
};

export const ALL_TAXA_LAYER_VARIANTS = {
  [ALL_TAXA_PRIORITY]: LAYER_VARIANTS.PRIORITY,
  [ALL_TAXA_RICHNESS]: LAYER_VARIANTS.RICHNESS,
  [ALL_TAXA_RARITY]: LAYER_VARIANTS.RARITY,
};

const { PRIORITY, RICHNESS, RARITY } = LAYER_VARIANTS;

const TAXA_DISTRIBUTION = {
  TERRESTRIAL_GLOBAL: 'terrestrial-global',
  TERRESTRIAL_REGIONAL: 'terrestrial-regional',
  MARINE: 'marine',
};

export const { TERRESTRIAL_GLOBAL, TERRESTRIAL_REGIONAL, MARINE } =
  TAXA_DISTRIBUTION;

export const getResolutionOptions = () => ({
  LOWEST: { label: `${t('~55km')}<sup>2</sup>`, slug: 'LOWEST' },
  LOW: { label: `${t('~27km')}<sup>2</sup>`, slug: 'LOW' },
  HIGH: { label: `${t('~1km')}<sup>2</sup>`, slug: 'HIGH' },
  COUNTRY: { label: t('country'), slug: 'COUNTRY' },
});

export const getLayersResolution = () => {
  const resolutions = getResolutionOptions();
  return {
    [PRIORITY]: {
      [TERRESTRIAL_GLOBAL]: [resolutions.LOW],
      [MARINE]: [resolutions.LOWEST],
    },
    [RICHNESS]: {
      [TERRESTRIAL_GLOBAL]: [resolutions.LOW, resolutions.COUNTRY],
      [TERRESTRIAL_REGIONAL]: [resolutions.HIGH],
      [MARINE]: [resolutions.LOWEST],
    },
    [RARITY]: {
      [TERRESTRIAL_GLOBAL]: [resolutions.LOW],
      [TERRESTRIAL_REGIONAL]: [resolutions.HIGH],
      [MARINE]: [resolutions.LOWEST],
    },
  };
};

export const DEFAULT_RESOLUTIONS = {
  [TERRESTRIAL_GLOBAL]: 'LOW',
  [TERRESTRIAL_REGIONAL]: 'HIGH',
  [MARINE]: 'LOWEST',
};

export const getLayersToggleConfig = () => ({
  [PRIORITY]: {
    [TERRESTRIAL_GLOBAL]: {
      LOW: [
        {
          value: ALL_TAXA_PRIORITY,
          name: t('all taxa'),
          title: t('all taxa'),
          layer: ALL_TAXA_PRIORITY,
          group: ALL_TAXA_PRIORITY,
        },
        {
          value: ALL_VERTEBRATES_PRIORITY,
          name: t('All vertebrates'),
          title: t('All vertebrates'),
          layer: ALL_VERTEBRATES_PRIORITY,
          group: ALL_VERTEBRATES_PRIORITY,
        },
        {
          value: AMPHIB_PRIORITY,
          name: t('amphibians'),
          title: t('amphibians'),
          layer: AMPHIB_PRIORITY,
          group: t('amphibians'),
        },
        {
          value: BIRDS_PRIORITY,
          name: t('birds'),
          title: t('birds'),
          layer: BIRDS_PRIORITY,
          group: t('birds'),
        },
        {
          value: MAMMALS_PRIORITY,
          name: t('mammals'),
          title: t('mammals'),
          layer: MAMMALS_PRIORITY,
          group: t('mammals'),
        },
        {
          value: REPTILES_PRIORITY,
          name: t('reptiles'),
          title: t('reptiles'),
          layer: REPTILES_PRIORITY,
          group: t('reptiles'),
        },
        {
          value: TREES_PRIORITY,
          name: t('trees'),
          title: t('trees'),
          layer: TREES_PRIORITY,
          group: t('trees'),
        },
      ],
    },
    [MARINE]: {
      LOWEST: [
        {
          value: ALL_MARINE_VERTEBRATES_PRIORITY,
          name: t('All vertebrates'),
          title: t('All vertebrates'),
          layer: ALL_MARINE_VERTEBRATES_PRIORITY,
          group: ALL_MARINE_VERTEBRATES_PRIORITY,
        },
        {
          value: FISHES_PRIORITY,
          name: t('fishes'),
          title: t('fishes'),
          layer: FISHES_PRIORITY,
          group: t('fishes'),
        },
        {
          value: MARINE_MAMMALS_PRIORITY,
          name: t('mammals'),
          title: t('mammals'),
          layer: MARINE_MAMMALS_PRIORITY,
          group: t('mammals'),
        },
      ],
    },
  },
  [RICHNESS]: {
    [TERRESTRIAL_GLOBAL]: {
      LOW: [
        {
          value: ALL_TAXA_RICHNESS,
          name: t('all taxa'),
          title: t('all taxa'),
          layer: ALL_TAXA_RICHNESS,
          group: ALL_TAXA_RICHNESS,
        },
        {
          value: AMPHIB_RICHNESS,
          name: t('amphibians'),
          title: t('amphibians'),
          layer: AMPHIB_RICHNESS,
          group: t('amphibians'),
        },
        {
          value: BIRDS_RICHNESS,
          name: t('birds'),
          title: t('birds'),
          layer: BIRDS_RICHNESS,
          group: t('birds'),
        },
        {
          value: CACTI_RICHNESS,
          name: t('cacti'),
          title: t('cacti'),
          layer: CACTI_RICHNESS,
          group: t('plants'),
        },
        {
          value: CONIFERS_RICHNESS,
          name: t('conifers'),
          title: t('conifers'),
          layer: CONIFERS_RICHNESS,
          group: t('plants'),
        },
        {
          value: TREES_RICHNESS,
          name: t('trees'),
          title: t('trees'),
          layer: TREES_RICHNESS,
          group: t('plants'),
        },
        {
          value: MAMMALS_RICHNESS,
          name: t('mammals'),
          title: t('mammals'),
          layer: MAMMALS_RICHNESS,
          group: t('mammals'),
        },
        {
          value: REPTILES_RICHNESS,
          name: t('reptiles'),
          title: t('reptiles'),
          layer: REPTILES_RICHNESS,
          group: t('reptiles'),
        },
        {
          value: ANTS_RICHNESS_GLOBAL,
          name: t('ants'),
          title: t('ants'),
          layer: ANTS_RICHNESS_GLOBAL,
          group: t('invertebrates'),
        },
      ],
      COUNTRY: [
        {
          value: ANTS_RICHNESS,
          name: t('ants'),
          title: t('ants'),
          layer: ANTS_RICHNESS,
          group: t('invertebrates'),
        },
        {
          value: BUTTERFLIES_RICHNESS,
          name: t('butterflies'),
          title: t('butterflies'),
          layer: BUTTERFLIES_RICHNESS,
          group: t('invertebrates'),
        },
        {
          value: ODONATES_RICHNESS,
          name: t('odonates'),
          title: t('odonates'),
          layer: ODONATES_RICHNESS,
          group: t('invertebrates'),
        },
        {
          value: SAPINDALES_RICHNESS,
          name: t('sapindales'),
          title: t('sapindales'),
          layer: SAPINDALES_RICHNESS,
          group: t('plants'),
        },
      ],
    },
    [TERRESTRIAL_REGIONAL]: {
      HIGH: [
        {
          value: ANTS_RICHNESS_1KM,
          name: t('ants'),
          title: t('ants'),
          layer: ANTS_RICHNESS_1KM,
          group: t('invertebrates'),
        },
        {
          value: AMPHIB_RICHNESS_1KM,
          name: t('amphibians'),
          title: t('amphibians'),
          layer: AMPHIB_RICHNESS_1KM,
          group: t('amphibians'),
        },
        {
          value: BIRDS_RICHNESS_1KM,
          name: t('birds'),
          title: t('birds'),
          layer: BIRDS_RICHNESS_1KM,
          group: t('birds'),
        },
        {
          value: BUTTERFLIES_RICHNESS_1KM,
          name: t('butterflies'),
          title: t('butterflies'),
          layer: BUTTERFLIES_RICHNESS_1KM,
          group: t('invertebrates'),
        },
        {
          value: DRAGONFLIES_RICHNESS_1KM,
          name: t('Dragonflies and Damselflies'),
          title: t('Dragonflies and Damselflies'),
          layer: DRAGONFLIES_RICHNESS_1KM,
          group: t('invertebrates'),
        },
        {
          value: BIRDS_SACA_RICHNESS_TOTAL,
          name: t('birds - Central & South America'),
          title: t('birds - Central & South America'),
          layer: BIRDS_SACA_RICHNESS_TOTAL,
          group: t('birds'),
        },
        {
          value: MAMMALS_SACA_RICHNESS_TOTAL,
          name: t('mammals - Central & South America'),
          title: t('mammals - Central & South America'),
          layer: MAMMALS_SACA_RICHNESS_TOTAL,
          group: t('mammals'),
        },
        {
          value: HUMMINGBIRDS_RICHNESS,
          name: t('hummingbirds'),
          title: t('hummingbirds'),
          layer: HUMMINGBIRDS_RICHNESS,
          group: t('birds'),
        },
        {
          value: PROTEA_RICHNESS_1KM,
          name: t('sugarbushes'),
          title: t('sugarbushes'),
          layer: PROTEA_RICHNESS_1KM,
          group: t('plants'),
        },
        {
          value: REPTILES_RICHNESS_1KM,
          name: t('reptiles'),
          title: t('reptiles'),
          layer: REPTILES_RICHNESS_1KM,
          group: t('reptiles'),
        },
        {
          value: RESTIO_RICHNESS_1KM,
          name: t('restio'),
          title: t('restio'),
          layer: RESTIO_RICHNESS_1KM,
          group: t('plants'),
        },
        {
          value: MAMMALS_RICHNESS_1KM,
          name: t('mammals'),
          title: t('mammals'),
          layer: MAMMALS_RICHNESS_1KM,
          group: t('mammals'),
        },
        {
          value: RESIDENT_BIRDS_RICHNESS_1KM,
          name: t('resident birds'),
          title: t('resident birds'),
          layer: RESIDENT_BIRDS_RICHNESS_1KM,
          group: t('birds'),
        },
        {
          value: SUMMER_BIRDS_RICHNESS_1KM,
          name: t('summer birds'),
          title: t('summer birds'),
          layer: SUMMER_BIRDS_RICHNESS_1KM,
          group: t('birds'),
        },
        {
          value: WINTER_BIRDS_RICHNESS_1KM,
          name: t('winter birds'),
          title: t('winter birds'),
          layer: WINTER_BIRDS_RICHNESS_1KM,
          group: t('birds'),
        },
      ],
    },
    [MARINE]: {
      LOWEST: [
        {
          value: ALL_MARINE_VERTEBRATES_RICHNESS,
          name: t('all vertebrates'),
          title: t('all vertebrates'),
          layer: ALL_MARINE_VERTEBRATES_RICHNESS,
          group: ALL_MARINE_VERTEBRATES_RICHNESS,
        },
        {
          value: FISHES_RICHNESS,
          name: t('fishes'),
          title: t('fishes'),
          layer: FISHES_RICHNESS,
          group: t('fishes'),
        },
        {
          value: MARINE_MAMMALS_RICHNESS,
          name: t('mammals'),
          title: t('mammals'),
          layer: MARINE_MAMMALS_RICHNESS,
          group: t('mammals'),
        },
      ],
    },
  },
  [RARITY]: {
    [TERRESTRIAL_GLOBAL]: {
      LOW: [
        {
          value: ALL_TAXA_RARITY,
          name: t('all taxa'),
          title: t('all taxa'),
          layer: ALL_TAXA_RARITY,
          group: ALL_TAXA_RARITY,
        },
        {
          value: AMPHIB_RARITY,
          name: t('amphibians'),
          title: t('amphibians'),
          layer: AMPHIB_RARITY,
          group: t('amphibians'),
        },
        {
          value: BIRDS_RARITY,
          name: t('birds'),
          title: t('birds'),
          layer: BIRDS_RARITY,
          group: t('birds'),
        },
        {
          value: CACTI_RARITY,
          name: t('cacti'),
          title: t('cacti'),
          layer: CACTI_RARITY,
          group: t('plants'),
        },
        {
          value: CONIFERS_RARITY,
          name: t('conifers'),
          title: t('conifers'),
          layer: CONIFERS_RARITY,
          group: t('plants'),
        },
        {
          value: TREES_RARITY,
          name: t('trees'),
          title: t('trees'),
          layer: TREES_RARITY,
          group: t('plants'),
        },
        {
          value: MAMMALS_RARITY,
          name: t('mammals'),
          title: t('mammals'),
          layer: MAMMALS_RARITY,
          group: t('mammals'),
        },
        {
          value: REPTILES_RARITY,
          name: t('reptiles'),
          title: t('reptiles'),
          layer: REPTILES_RARITY,
          group: t('reptiles'),
        },
        {
          value: ANTS_RARITY_GLOBAL,
          name: t('ants'),
          title: t('ants'),
          layer: ANTS_RARITY_GLOBAL,
          group: t('invertebrates'),
        },
      ],
    },
    [TERRESTRIAL_REGIONAL]: {
      HIGH: [
        {
          value: ANTS_RARITY_1KM,
          name: t('ants'),
          title: t('ants'),
          layer: ANTS_RARITY_1KM,
          group: t('invertebrates'),
        },
        {
          value: AMPHIB_RARITY_1KM,
          name: t('amphibians'),
          title: t('amphibians'),
          layer: AMPHIB_RARITY_1KM,
          group: t('amphibians'),
        },
        {
          value: BIRDS_RARITY_1KM,
          name: t('birds'),
          title: t('birds'),
          layer: BIRDS_RARITY_1KM,
          group: t('birds'),
        },
        {
          value: BUTTERFLIES_RARITY_1KM,
          name: t('butterflies'),
          title: t('butterflies'),
          layer: BUTTERFLIES_RARITY_1KM,
          group: t('invertebrates'),
        },
        {
          value: DRAGONFLIES_RARITY_1KM,
          name: t('Dragonflies and Damselflies'),
          title: t('Dragonflies and Damselflies'),
          layer: DRAGONFLIES_RARITY_1KM,
          group: t('invertebrates'),
        },
        {
          value: HUMMINGBIRDS_RARITY,
          name: t('hummingbirds'),
          title: t('hummingbirds'),
          layer: HUMMINGBIRDS_RARITY,
          group: t('birds'),
        },
        {
          value: PROTEA_RARITY_1KM,
          name: t('sugarbushes'),
          title: t('sugarbushes'),
          layer: PROTEA_RARITY_1KM,
          group: t('plants'),
        },
        {
          value: REPTILES_RARITY_1KM,
          name: t('reptiles'),
          title: t('reptiles'),
          layer: REPTILES_RARITY_1KM,
          group: t('reptiles'),
        },
        {
          value: RESTIO_RARITY_1KM,
          name: t('restio'),
          title: t('restio'),
          layer: RESTIO_RARITY_1KM,
          group: t('plants'),
        },
        {
          value: MAMMALS_RARITY_1KM,
          name: t('mammals'),
          title: t('mammals'),
          layer: MAMMALS_RARITY_1KM,
          group: t('mammals'),
        },
        {
          value: RESIDENT_BIRDS_RARITY_1KM,
          name: t('resident birds'),
          title: t('resident birds'),
          layer: RESIDENT_BIRDS_RARITY_1KM,
          group: t('birds'),
        },
        {
          value: BIRDS_SACA_RARITY_TOTAL,
          name: t('birds - Central & South America'),
          title: t('birds - Central & South America'),
          layer: BIRDS_SACA_RARITY_TOTAL,
          group: t('birds'),
        },
        {
          value: MAMMALS_SACA_RARITY_TOTAL,
          name: t('mammals - Central & South America'),
          title: t('mammals - Central & South America'),
          layer: MAMMALS_SACA_RARITY_TOTAL,
          group: t('mammals'),
        },
        {
          value: SUMMER_BIRDS_RARITY_1KM,
          name: t('summer birds'),
          title: t('summer birds'),
          layer: SUMMER_BIRDS_RARITY_1KM,
          group: t('birds'),
        },
        {
          value: WINTER_BIRDS_RARITY_1KM,
          name: t('winter birds'),
          title: t('winter birds'),
          layer: WINTER_BIRDS_RARITY_1KM,
          group: t('birds'),
        },
      ],
    },
    [MARINE]: {
      LOWEST: [
        {
          value: ALL_MARINE_VERTEBRATES_RARITY,
          name: t('all vertebrates'),
          title: t('all vertebrates'),
          layer: ALL_MARINE_VERTEBRATES_RARITY,
          group: ALL_MARINE_VERTEBRATES_RARITY,
        },
        {
          value: FISHES_RARITY,
          name: t('fishes'),
          title: t('fishes'),
          layer: FISHES_RARITY,
          group: t('fishes'),
        },
        {
          value: MARINE_MAMMALS_RARITY,
          name: t('mammals'),
          title: t('mammals'),
          layer: MARINE_MAMMALS_RARITY,
          group: t('mammals'),
        },
      ],
    },
  },
});

export const getAOIBiodiversityToggles = () => [
  {
    name: t('All groups richness'),
    title: t('All groups richness'),
    value: ALL_TAXA_RICHNESS,
    id: ALL_TAXA_RICHNESS,
    slug: ALL_TAXA_RICHNESS,
    metadataTitle: t('Protected areas'),
  },
  {
    name: t('All groups rarity'),
    title: t('All groups rarity'),
    value: ALL_TAXA_RARITY,
    id: ALL_TAXA_RARITY,
    slug: ALL_TAXA_RARITY,
    metadataTitle: t('Protected areas'),
  },
  {
    name: t('All groups priority'),
    value: ALL_TAXA_PRIORITY,
    id: ALL_TAXA_PRIORITY,
    title: ALL_TAXA_PRIORITY,
    slug: ALL_TAXA_PRIORITY,
    metadataTitle: t('Protected areas'),
  },
];

const parseGroupLayers = (group, layers) => {
  return layers
    .filter((layer) => layer.group === group)
    .map((layer) => {
      return {
        ...layer,
        label: layer.title,
      };
    });
};

const parseAllGroupLayers = (group, allLayers, label) => {
  return allLayers
    .filter((layer) => layer.group === group)
    .map((layer) => {
      return {
        ...layer,
        label: label || t('All vertebrates'),
      };
    });
};

export const GROUPED_OPTIONS = (layers) => [
  {
    label: t('All taxa'),
    options: parseAllGroupLayers(ALL_TAXA_PRIORITY, layers, t('All taxa')),
  },
  {
    label: t('All vertebrates'),
    options: parseAllGroupLayers(ALL_VERTEBRATES_PRIORITY, layers),
  },
  {
    label: t('All vertebrates'),
    options: parseAllGroupLayers(ALL_MARINE_VERTEBRATES_PRIORITY, layers),
  },
  {
    label: t('All taxa'),
    options: parseAllGroupLayers(ALL_TAXA_RICHNESS, layers, t('All taxa')),
  },
  {
    label: t('All vertebrates'),
    options: parseAllGroupLayers(ALL_MARINE_VERTEBRATES_RICHNESS, layers),
  },
  {
    label: t('All taxa'),
    options: parseAllGroupLayers(ALL_TAXA_RARITY, layers, t('All taxa')),
  },
  {
    label: t('All vertebrates'),
    options: parseAllGroupLayers(ALL_MARINE_VERTEBRATES_RARITY, layers),
  },
  {
    label: t('amphibians'),
    options: parseGroupLayers(t('amphibians'), layers),
  },
  {
    label: t('birds'),
    options: parseGroupLayers(t('birds'), layers),
  },
  {
    label: t('fishes'),
    options: parseGroupLayers(t('fishes'), layers),
  },
  {
    label: t('invertebrates'),
    options: parseGroupLayers(t('invertebrates'), layers),
  },
  {
    label: t('mammals'),
    options: parseGroupLayers(t('mammals'), layers),
  },
  {
    label: t('plants'),
    options: parseGroupLayers(t('plants'), layers),
  },
  {
    label: t('reptiles'),
    options: parseGroupLayers(t('reptiles'), layers),
  },
  {
    label: t('trees'),
    options: parseGroupLayers(t('trees'), layers),
  },
];
