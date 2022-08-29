import {
  MERGED_WDPA_VECTOR_TILE_LAYER,
  AMPHIB_RARITY_1KM,
  AMPHIB_RICHNESS_1KM,
  SA_DRAGONFLIES_RARITY,
  SA_DRAGONFLIES_RICHNESS,
  SA_BIRDS_RARITY,
  SA_BIRDS_RICHNESS,
  SA_RESTIO_RARITY,
  SA_RESTIO_RICHNESS,
  SA_PROTEA_RARITY,
  SA_PROTEA_RICHNESS,
  REPTILES_RARITY_1KM,
  REPTILES_RICHNESS_1KM,
  BUTTERFLIES_RARITY_1KM,
  BUTTERFLIES_RICHNESS_1KM,
  MAMMALS_RICHNESS_1KM,
  SUMMER_BIRDS_RICHNESS_1KM,
  WINTER_BIRDS_RICHNESS_1KM,
  MAMMALS_RARITY_1KM,
  SUMMER_BIRDS_RARITY_1KM,
  WINTER_BIRDS_RARITY_1KM,
  HUMMINGBIRDS_RICHNESS,
  HUMMINGBIRDS_RARITY,
  MAMMALS_RARITY,
  MAMMALS_RICHNESS,
  FISHES_RARITY,
  FISHES_RICHNESS,
  CONIFERS_RARITY,
  CONIFERS_RICHNESS,
  CACTI_RARITY,
  CACTI_RICHNESS,
  AMPHIB_RARITY,
  AMPHIB_RICHNESS,
  REPTILES_RICHNESS,
  ANTS_RICHNESS,
  BUTTERFLIES_RICHNESS,
  ODONATES_RICHNESS,
  SAPINDALES_RICHNESS,
  REPTILES_RARITY,
  BIRDS_RARITY,
  BIRDS_RICHNESS,
  ALL_TAXA_RARITY,
  ALL_TAXA_RICHNESS,
  COUNTRY_PRIORITY_LAYER,
  LAND_COUNTRY_PRIORITY_LAYER,
  MARINE_COUNTRY_PRIORITY_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  MARINE_AND_LAND_HUMAN_PRESSURES,
  ALL_TAXA_PRIORITY,
  MERGED_LAND_HUMAN_PRESSURES,
  HALF_EARTH_FUTURE_METADATA_SLUG,
  HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
  TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER,
  MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER,
  CARBON_LAYER,
} from 'constants/layers-slugs';

export const SPECIES_PROTECTION_INDEX = 'spi-def';
export const CHALLENGES_CHART = 'challenges-plot';
export const RANKING_CHART = 'spi-ranking';
export const MERGED_PROTECTION = MERGED_WDPA_VECTOR_TILE_LAYER;
export const COUNTRY_PRIORITY = COUNTRY_PRIORITY_LAYER;

export {
  ALL_TAXA_PRIORITY,
  MERGED_LAND_HUMAN_PRESSURES,
  HALF_EARTH_FUTURE_TILE_LAYER,
} from 'constants/layers-slugs';

export default {
  [ALL_TAXA_PRIORITY]: {
    slug: ALL_TAXA_PRIORITY,
  },
  [MERGED_LAND_HUMAN_PRESSURES]: {
    slug: MERGED_LAND_HUMAN_PRESSURES,
  },
  [CARBON_LAYER]: {
    slug: CARBON_LAYER,
  },
  [CHALLENGES_CHART]: {
    slug: CHALLENGES_CHART,
  },
  [RANKING_CHART]: {
    slug: RANKING_CHART,
  },
  [MERGED_PROTECTION]: {
    slug: MERGED_PROTECTION,
  },
  [SPECIES_PROTECTION_INDEX]: {
    slug: SPECIES_PROTECTION_INDEX,
  },
  [AMPHIB_RARITY_1KM]: {
    slug: AMPHIB_RARITY_1KM,
  },
  [AMPHIB_RICHNESS_1KM]: {
    slug: AMPHIB_RICHNESS_1KM,
  },
  [SA_DRAGONFLIES_RARITY]: {
    slug: SA_DRAGONFLIES_RARITY,
  },
  [SA_DRAGONFLIES_RICHNESS]: {
    slug: SA_DRAGONFLIES_RICHNESS,
  },
  [SA_BIRDS_RARITY]: {
    slug: SA_BIRDS_RARITY,
  },
  [SA_BIRDS_RICHNESS]: {
    slug: SA_BIRDS_RICHNESS,
  },
  [SA_RESTIO_RARITY]: {
    slug: SA_RESTIO_RARITY,
  },
  [SA_RESTIO_RICHNESS]: {
    slug: SA_RESTIO_RICHNESS,
  },
  [SA_PROTEA_RARITY]: {
    slug: SA_PROTEA_RARITY,
  },
  [SA_PROTEA_RICHNESS]: {
    slug: SA_PROTEA_RICHNESS,
  },
  [REPTILES_RARITY_1KM]: {
    slug: REPTILES_RARITY_1KM,
  },
  [REPTILES_RICHNESS_1KM]: {
    slug: REPTILES_RICHNESS_1KM,
  },
  [BUTTERFLIES_RICHNESS_1KM]: {
    slug: BUTTERFLIES_RICHNESS_1KM,
  },
  [BUTTERFLIES_RARITY_1KM]: {
    slug: BUTTERFLIES_RARITY_1KM,
  },
  [MAMMALS_RICHNESS_1KM]: {
    slug: MAMMALS_RICHNESS_1KM,
  },
  [SUMMER_BIRDS_RICHNESS_1KM]: {
    slug: SUMMER_BIRDS_RICHNESS_1KM,
  },
  [WINTER_BIRDS_RICHNESS_1KM]: {
    slug: WINTER_BIRDS_RICHNESS_1KM,
  },
  [MAMMALS_RARITY_1KM]: {
    slug: MAMMALS_RARITY_1KM,
  },
  [SUMMER_BIRDS_RARITY_1KM]: {
    slug: SUMMER_BIRDS_RARITY_1KM,
  },
  [WINTER_BIRDS_RARITY_1KM]: {
    slug: WINTER_BIRDS_RARITY_1KM,
  },
  // Hummingbirds
  [HUMMINGBIRDS_RICHNESS]: {
    slug: HUMMINGBIRDS_RICHNESS,
  },
  [HUMMINGBIRDS_RARITY]: {
    slug: HUMMINGBIRDS_RARITY,
  },
  // Global data
  [MAMMALS_RARITY]: {
    slug: MAMMALS_RARITY,
  },
  [MAMMALS_RICHNESS]: {
    slug: MAMMALS_RICHNESS,
  },
  [FISHES_RARITY]: {
    slug: FISHES_RARITY,
  },
  [FISHES_RICHNESS]: {
    slug: FISHES_RICHNESS,
  },
  [CONIFERS_RARITY]: {
    slug: CONIFERS_RARITY,
  },
  [CONIFERS_RICHNESS]: {
    slug: CONIFERS_RICHNESS,
  },
  [CACTI_RARITY]: {
    slug: CACTI_RARITY,
  },
  [CACTI_RICHNESS]: {
    slug: CACTI_RICHNESS,
  },
  [AMPHIB_RARITY]: {
    slug: AMPHIB_RARITY,
  },
  [AMPHIB_RICHNESS]: {
    slug: AMPHIB_RICHNESS,
  },
  [REPTILES_RICHNESS]: {
    slug: REPTILES_RICHNESS,
  },
  [ANTS_RICHNESS]: {
    slug: ANTS_RICHNESS,
  },
  [BUTTERFLIES_RICHNESS]: {
    slug: BUTTERFLIES_RICHNESS,
  },
  [ODONATES_RICHNESS]: {
    slug: ODONATES_RICHNESS,
  },
  [SAPINDALES_RICHNESS]: {
    slug: SAPINDALES_RICHNESS,
  },
  [REPTILES_RARITY]: {
    slug: REPTILES_RARITY,
  },
  [BIRDS_RARITY]: {
    slug: BIRDS_RARITY,
  },
  [BIRDS_RICHNESS]: {
    slug: BIRDS_RICHNESS,
  },
  [ALL_TAXA_RARITY]: {
    slug: ALL_TAXA_RARITY,
  },
  [ALL_TAXA_RICHNESS]: {
    slug: ALL_TAXA_RICHNESS,
  },
  [COUNTRY_PRIORITY_LAYER]: {
    slug: COUNTRY_PRIORITY_LAYER,
  },
  [LAND_COUNTRY_PRIORITY_LAYER]: {
    slug: COUNTRY_PRIORITY_LAYER,
  },
  [MARINE_COUNTRY_PRIORITY_LAYER]: {
    slug: COUNTRY_PRIORITY_LAYER,
  },
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]: {
    slug: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  },
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
  },
  [TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER]: {
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
  },
  [MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
  },
  [MARINE_AND_LAND_HUMAN_PRESSURES]: {
    slug: MARINE_AND_LAND_HUMAN_PRESSURES,
  },
  [HALF_EARTH_FUTURE_TILE_LAYER]: {
    slug: HALF_EARTH_FUTURE_METADATA_SLUG,
  },
  [SPECIFIC_REGIONS_TILE_LAYER]: {
    slug: SPECIFIC_REGIONS_TILE_LAYER,
  },
};
