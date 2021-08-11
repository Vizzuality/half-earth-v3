import {
  COUNTRY_PRIORITY_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  COUNTRIES_DATA_FEATURE_LAYER,
  COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  VIBRANT_BASEMAP_LAYER,
  SATELLITE_BASEMAP_LAYER,
  FIREFLY_BASEMAP_LAYER,
  PRIORITY_PLACES_POLYGONS,
  MERGED_WDPA_VECTOR_TILE_LAYER,
  PROTECTED_AREAS_FEATURE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_FEATURE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  GRID_CELLS_PROTECTED_AREAS_PERCENTAGE,
  GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER,
  GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE,
  FEATURED_PLACES_LAYER,
  URBAN_HUMAN_PRESSURES_TILE_LAYER,
  IRRIGATED_HUMAN_PRESSURES_TILE_LAYER,
  RAINFED_HUMAN_PRESSURES_TILE_LAYER,
  RANGELAND_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
  ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
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
  EDUCATOR_AMBASSADORS_LAYER,
  PLEDGES_LAYER
} from 'constants/layers-slugs'

import { LAYER_VARIANTS } from 'constants/biodiversity-layers-constants';
import { LAYERS_URLS } from 'constants/layers-urls';

import {
  getLegendGradient
} from 'utils/legend-utils';

const LAYER_TYPES = {
  FEATURE_LAYER: 'FeatureLayer',
  TILE_LAYER: 'TileLayer',
  VECTOR_TILE_LAYER: 'VectorTileLayer',
  IMAGERY_LAYER: 'ImageryLayer'
}

export const DEFAULT_OPACITY = 0.8;
export const BASEMAP_OPACITY = 1;

export const LAYERS_CATEGORIES = {
  BIODIVERSITY: 'Biodiversity',
  PROTECTION: 'Existing protection',
  LAND_PRESSURES: 'Human pressures'
}

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
    }
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
          value: 'fishes',
          name: 'fishes',
          layer: FISHES_RICHNESS
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
          value: 'fishes',
          name: 'fishes',
          layer: FISHES_RARITY
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

export const layersConfig = {
  [PLEDGES_LAYER]: {
    title: PLEDGES_LAYER,
    slug: PLEDGES_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[PLEDGES_LAYER],
    bbox: null
  },
  [EDUCATOR_AMBASSADORS_LAYER]: {
    title: EDUCATOR_AMBASSADORS_LAYER,
    slug: EDUCATOR_AMBASSADORS_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[EDUCATOR_AMBASSADORS_LAYER],
    bbox: null
  },
  [COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER]: {
    title: COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER,
    slug: COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER],
    bbox: null
  },
  [COUNTRIES_LABELS_FEATURE_LAYER]: {
    title: COUNTRIES_LABELS_FEATURE_LAYER,
    slug: COUNTRIES_LABELS_FEATURE_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[COUNTRIES_LABELS_FEATURE_LAYER],
    bbox: null
  },
  [COUNTRIES_DATA_FEATURE_LAYER]: {
    title: COUNTRIES_DATA_FEATURE_LAYER,
    slug: COUNTRIES_DATA_FEATURE_LAYER,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[COUNTRIES_DATA_FEATURE_LAYER],
    bbox: null
  },
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
    opacity: BASEMAP_OPACITY,
    bbox: null
  },
  [SATELLITE_BASEMAP_LAYER]: {
    title: SATELLITE_BASEMAP_LAYER,
    slug: SATELLITE_BASEMAP_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[SATELLITE_BASEMAP_LAYER],
    opacity: BASEMAP_OPACITY,
    bbox: null
  },
  [FIREFLY_BASEMAP_LAYER]: {
    title: FIREFLY_BASEMAP_LAYER,
    slug: FIREFLY_BASEMAP_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[FIREFLY_BASEMAP_LAYER],
    opacity: BASEMAP_OPACITY,
    bbox: null
  },
  [COUNTRY_PRIORITY_LAYER]: {
    title: COUNTRY_PRIORITY_LAYER,
    slug: COUNTRY_PRIORITY_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[COUNTRY_PRIORITY_LAYER],
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
  [MERGED_WDPA_VECTOR_TILE_LAYER]: {
    title: MERGED_WDPA_VECTOR_TILE_LAYER,
    slug: MERGED_WDPA_VECTOR_TILE_LAYER,
    type: LAYER_TYPES.VECTOR_TILE_LAYER,
    url: LAYERS_URLS[MERGED_WDPA_VECTOR_TILE_LAYER],
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
  [GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE]: {
    title: GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE,
    slug: GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE,
    type: LAYER_TYPES.FEATURE_LAYER,
    url: LAYERS_URLS[GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE],
    bbox: null
  },
  [URBAN_HUMAN_PRESSURES_TILE_LAYER]: {
    title: URBAN_HUMAN_PRESSURES_TILE_LAYER,
    slug: URBAN_HUMAN_PRESSURES_TILE_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[URBAN_HUMAN_PRESSURES_TILE_LAYER],
    bbox: null
  },
  [IRRIGATED_HUMAN_PRESSURES_TILE_LAYER]: {
    title: IRRIGATED_HUMAN_PRESSURES_TILE_LAYER,
    slug: IRRIGATED_HUMAN_PRESSURES_TILE_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[IRRIGATED_HUMAN_PRESSURES_TILE_LAYER],
    bbox: null
  },
  [RAINFED_HUMAN_PRESSURES_TILE_LAYER]: {
    title: RAINFED_HUMAN_PRESSURES_TILE_LAYER,
    slug: RAINFED_HUMAN_PRESSURES_TILE_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[RAINFED_HUMAN_PRESSURES_TILE_LAYER],
    bbox: null
  },
  [RANGELAND_HUMAN_PRESSURES_TILE_LAYER]: {
    title: RANGELAND_HUMAN_PRESSURES_TILE_LAYER,
    slug: RANGELAND_HUMAN_PRESSURES_TILE_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[RANGELAND_HUMAN_PRESSURES_TILE_LAYER],
    bbox: null
  },
  [MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER]: {
    title: MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
    slug: MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER],
    bbox: null
  },
  [MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER]: {
    title: MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
    slug: MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER],
    bbox: null
  },
  [COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER]: {
    title: COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
    slug: COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER],
    bbox: null
  },
  [ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER]: {
    title: ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
    slug: ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER],
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
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[FISHES_RARITY],
    bbox: null
  },
  [FISHES_RICHNESS]: {
    title: FISHES_RICHNESS,
    slug: FISHES_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[FISHES_RICHNESS],
    bbox: null
  },
  [AMPHIB_PRIORITY]: {
    title: AMPHIB_PRIORITY,
    slug: AMPHIB_PRIORITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[AMPHIB_PRIORITY],
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
  [MAMMALS_PRIORITY]: {
    title: MAMMALS_PRIORITY,
    slug: MAMMALS_PRIORITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[MAMMALS_PRIORITY],
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
  [BIRDS_PRIORITY]: {
    title: BIRDS_PRIORITY,
    slug: BIRDS_PRIORITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[BIRDS_PRIORITY],
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
  [ALL_TAXA_PRIORITY]: {
    title: ALL_TAXA_PRIORITY,
    slug: ALL_TAXA_PRIORITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[ALL_TAXA_PRIORITY],
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
  [REPTILES_PRIORITY]: {
    title: REPTILES_PRIORITY,
    slug: REPTILES_PRIORITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[REPTILES_PRIORITY],
    bbox: null
  },
  [REPTILES_RARITY]: {
    title: REPTILES_RARITY,
    slug: REPTILES_RARITY,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[REPTILES_RARITY],
    bbox: null
  },
  [REPTILES_RICHNESS]: {
    title: REPTILES_RICHNESS,
    slug: REPTILES_RICHNESS,
    type: LAYER_TYPES.TILE_LAYER,
    url: LAYERS_URLS[REPTILES_RICHNESS],
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

export const BIODIVERSITY_LAYERS_COLOUR_RAMP = [
  'rgba(9, 0, 114, .25)',
  'rgba(9, 0, 114, .25)',
  'rgba(9, 0, 114, .25)',
  'rgba(9, 0, 114, .25)',
  'rgba(9, 0, 114, .25)',
  'rgba(0, 133, 170, .6)',
  'rgba(0, 133, 170, .6)',
  'rgba(0, 226, 136, .8)',
  'rgba(0, 226, 136, .8)',
  'rgb(236, 255, 26)',
]

export const legendConfigs = {
  // South Africa
  [SA_AMPHIB_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Amphibian regional rarity"
  },
  [SA_AMPHIB_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Amphibian regional richness"
  },
  [SA_DRAGONFLIES_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Dragonflies rarity"
  },
  [SA_DRAGONFLIES_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Dragonflies richness"
  },
  [SA_MAMMALS_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Mammals regional rarity"
  },
  [SA_MAMMALS_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Mammals regional richness"
  },
  [SA_BIRDS_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Birds regional rarity"
  },
  [SA_BIRDS_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Birds regional richness"
  },
  [SA_RESTIO_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Restio regional rarity"
  },
  [SA_RESTIO_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Restio regional richness"
  },
  [SA_PROTEA_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Protea regional rarity"
  },
  [SA_PROTEA_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Protea regional richness"
  },
  [SA_REPTILES_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Reptiles regional rarity"
  },
  [SA_REPTILES_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Reptiles regional richness"
  },
  // Hummingbirds
  [HUMMINGBIRDS_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Hummingbirds richness"
  },
  [HUMMINGBIRDS_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Hummingbirds rarity"
  },
  // Global data
  [MAMMALS_PRIORITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Global Mammals priority"
  },
  [MAMMALS_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Mammals rarity"
  },
  [MAMMALS_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Mammals richness"
  },
  [FISHES_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Fishes rarity"
  },
  [FISHES_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Fishes richness"
  },
  [CONIFERS_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Conifers rarity"
  },
  [CONIFERS_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Conifers richness"
  },
  [CACTI_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Cacti rarity"
  },
  [CACTI_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Cacti richness"
  },
  [AMPHIB_PRIORITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Global Amphibian priority"
  },
  [AMPHIB_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Amphibian rarity"
  },
  [AMPHIB_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Amphibian richness"
  },
  [REPTILES_PRIORITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Global Reptile priority"
  },
  [REPTILES_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Reptile richness"
  },
  [REPTILES_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Reptile rarity"
  },
  [BIRDS_PRIORITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Global Birds priority"
  },
  [BIRDS_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Birds rarity"
  },
  [BIRDS_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Birds richness"
  },
  [ALL_TAXA_PRIORITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "Global terrestrial vertebrate priority"
  },
  [ALL_TAXA_RARITY]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "All groups rarity"
  },
  [ALL_TAXA_RICHNESS]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low', 'high'),
    title: "All groups richness"
  },
  [COUNTRY_PRIORITY_LAYER]: {
    type: "gradient",
    items: getLegendGradient(BIODIVERSITY_LAYERS_COLOUR_RAMP, 'low priority', 'high priority'),
    title: "Protection needed"
  }
}
