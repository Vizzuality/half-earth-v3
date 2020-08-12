import {
  MERGED_WDPA_VECTOR_TILE_LAYER,
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
  REPTILES_RARITY,
  BIRDS_RARITY,
  BIRDS_RICHNESS,
  ALL_TAXA_RARITY,
  ALL_TAXA_RICHNESS,
  COUNTRY_PRIORITY_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  MERGED_LAND_HUMAN_PRESSURES
 } from 'constants/layers-slugs';

 export const SPECIES_PROTECTION_INDEX = 'spi-def';
 export const CHALLENGES_CHART = 'challenges-plot';
 export const MERGED_PROTECTION = MERGED_WDPA_VECTOR_TILE_LAYER;
 export const COUNTRY_PRIORITY = COUNTRY_PRIORITY_LAYER;

export default {
  [CHALLENGES_CHART]: {
    slug: CHALLENGES_CHART,
    title: 'What are the challenges for a country?'
  },
  [MERGED_PROTECTION]: {
    slug: MERGED_PROTECTION,
    title: 'Protected Areas'
  },
  [SPECIES_PROTECTION_INDEX]: {
    slug: SPECIES_PROTECTION_INDEX,
    title: 'Species Protection Index'
  },
  [SA_AMPHIB_RARITY]: {
    slug: SA_AMPHIB_RARITY,
    title: "Amphibian regional rarity"
  },
  [SA_AMPHIB_RICHNESS]: {
    slug: SA_AMPHIB_RICHNESS,
    title: "Amphibian regional richness"
  },
  [SA_DRAGONFLIES_RARITY]: {
    slug: SA_DRAGONFLIES_RARITY,
    title: "Dragonflies rarity"
  },
  [SA_DRAGONFLIES_RICHNESS]: {
    slug: SA_DRAGONFLIES_RICHNESS,
    title: "Dragonflies richness"
  },
  [SA_MAMMALS_RARITY]: {
    slug: SA_MAMMALS_RARITY,
    title: "Mammals regional rarity"
  },
  [SA_MAMMALS_RICHNESS]: {
    slug: SA_MAMMALS_RICHNESS,
    title: "Mammals regional richness"
  },
  [SA_BIRDS_RARITY]: {
    slug: SA_BIRDS_RARITY,
    title: "Birds regional rarity"
  },
  [SA_BIRDS_RICHNESS]: {
    slug: SA_BIRDS_RICHNESS,
    title: "Birds regional richness"
  },
  [SA_RESTIO_RARITY]: {
    slug: SA_RESTIO_RARITY,
    title: "Restio regional rarity"
  },
  [SA_RESTIO_RICHNESS]: {
    slug: SA_RESTIO_RICHNESS,
    title: "Restio regional richness"
  },
  [SA_PROTEA_RARITY]: {
    slug: SA_PROTEA_RARITY,
    title: "Protea regional rarity"
  },
  [SA_PROTEA_RICHNESS]: {
    slug: SA_PROTEA_RICHNESS,
    title: "Protea regional richness"
  },
  [SA_REPTILES_RARITY]: {
    slug: SA_REPTILES_RARITY,
    title: "Reptiles regional rarity"
  },
  [SA_REPTILES_RICHNESS]: {
    slug: SA_REPTILES_RICHNESS,
    title: "Reptiles regional richness"
  },
  // Hummingbirds
  [HUMMINGBIRDS_RICHNESS]: {
    slug: HUMMINGBIRDS_RICHNESS,
    title: "Hummingbirds richness"
  },
  [HUMMINGBIRDS_RARITY]: {
    slug: HUMMINGBIRDS_RARITY,
    title: "Hummingbirds rarity"
  },
  // Global data
  [MAMMALS_RARITY]: {
    slug: MAMMALS_RARITY,
    title: "Mammals rarity"
  },
  [MAMMALS_RICHNESS]: {
    slug: MAMMALS_RICHNESS,
    title: "Mammals richness"
  },
  [FISHES_RARITY]: {
    slug: FISHES_RARITY,
    title: "Fishes rarity"
  },
  [FISHES_RICHNESS]: {
    slug: FISHES_RICHNESS,
    title: "Fishes richness"
  },
  [CONIFERS_RARITY]: {
    slug: CONIFERS_RARITY,
    title: "Conifers rarity"
  },
  [CONIFERS_RICHNESS]: {
    slug: CONIFERS_RICHNESS,
    title: "Conifers richness"
  },
  [CACTI_RARITY]: {
    slug: CACTI_RARITY,
    title: "Cacti rarity"
  },
  [CACTI_RICHNESS]: {
    slug: CACTI_RICHNESS,
    title: "Cacti richness"
  },
  [AMPHIB_RARITY]: {
    slug: AMPHIB_RARITY,
    title: "Amphibian rarity"
  },
  [AMPHIB_RICHNESS]: {
    slug: AMPHIB_RICHNESS,
    title: "Amphibian richness"
  },
  [REPTILES_RICHNESS]: {
    slug: REPTILES_RICHNESS,
    title: "Reptile richness"
  },
  [REPTILES_RARITY]: {
    slug: REPTILES_RARITY,
    title: "Reptile rarity"
  },
  [BIRDS_RARITY]: {
    slug: BIRDS_RARITY,
    title: "Birds rarity"
  },
  [BIRDS_RICHNESS]: {
    slug: BIRDS_RICHNESS,
    title: "Birds richness"
  },
  [ALL_TAXA_RARITY]: {
    slug: ALL_TAXA_RARITY,
    title: "All groups rarity"
  },
  [ALL_TAXA_RICHNESS]: {
    slug: ALL_TAXA_RICHNESS,
    title: "All groups richness"
  },
  [COUNTRY_PRIORITY_LAYER]: {
    slug: COUNTRY_PRIORITY_LAYER,
    title: "Protection needed"
  },
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]: {
    slug: COMMUNITY_AREAS_VECTOR_TILE_LAYER,
    title: "Community-based protected areas"
  },
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    title: "Protected areas"
  },
  [MERGED_LAND_HUMAN_PRESSURES]: {
    slug: MERGED_LAND_HUMAN_PRESSURES,
    title: "Land use pressures"
  }
}
