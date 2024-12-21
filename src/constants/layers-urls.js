import {
  COUNTRY_PRIORITY_LAYER,
  LAND_COUNTRY_PRIORITY_LAYER,
  MARINE_COUNTRY_PRIORITY_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  COUNTRIES_DATA_FEATURE_LAYER,
  GLOBAL_SPI_FEATURE_LAYER,
  MARINE_SPI_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  REGIONS_LABELS_LAYER,
  VIBRANT_BASEMAP_LAYER,
  SATELLITE_BASEMAP_LAYER,
  PRIORITY_PLACES_POLYGONS,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  CARBON_LAYER,
  MARINE_CARBON_LAYER,
  HALF_EARTH_FUTURE_WDPA_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
  SPECIFIC_REGIONS_WDPA_LAYER,
  GRID_CELLS_PROTECTED_AREAS_PERCENTAGE,
  GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER,
  GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE,
  FEATURED_PLACES_LAYER,
  ENERGY_HUMAN_PRESSURES_TILE_LAYER,
  BUILTUP_HUMAN_PRESSURES_TILE_LAYER,
  TRANSPORTATION_HUMAN_PRESSURES_TILE_LAYER,
  AGRICULTURE_HUMAN_PRESSURES_TILE_LAYER,
  INTRUSION_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER,
  COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
  ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER,
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
  ANTS_RARITY_1KM,
  ANTS_RICHNESS_1KM,
  ANTS_RARITY_GLOBAL,
  ANTS_RICHNESS_GLOBAL,
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
  ALL_TAXA_RARITY,
  ALL_TAXA_RICHNESS,
  ALL_TAXA_PRIORITY,
  ALL_VERTEBRATES_PRIORITY,
  ALL_MARINE_VERTEBRATES_PRIORITY,
  ALL_MARINE_VERTEBRATES_RICHNESS,
  ALL_MARINE_VERTEBRATES_RARITY,
  CACTI_RARITY,
  CACTI_RICHNESS,
  CONIFERS_RARITY,
  CONIFERS_RICHNESS,
  REPTILES_PRIORITY,
  REPTILES_RARITY,
  REPTILES_RICHNESS,
  HUMMINGBIRDS_RARITY,
  HUMMINGBIRDS_RICHNESS,
  ANTS_RICHNESS,
  BUTTERFLIES_RICHNESS,
  ODONATES_RICHNESS,
  SAPINDALES_RICHNESS,
  BUTTERFLIES_RARITY_1KM,
  BUTTERFLIES_RICHNESS_1KM,
  PLEDGES_LAYER,
  EDUCATOR_AMBASSADORS_LAYER,
  SPECIES_LIST,
  MARINE_SPECIES_LIST,
  FIREFLY_BASEMAP_LAYER,
  WDPA_OECM_FEATURE_LAYER,
  WDPA_OECM_FEATURE_DATA_LAYER,
  ADMIN_AREAS_FEATURE_LAYER,
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER,
  AOIS_HISTORIC_PRODUCTION,
  AOIS_HISTORIC_DEVELOPMENT,
  ELU_LOOKUP_TABLE,
  AMPHIBIAN_LOOKUP,
  BIRDS_LOOKUP,
  MAMMALS_LOOKUP,
  REPTILES_LOOKUP,
  EEZ_MARINE_AND_LAND_BORDERS,
  SEARCH_LOOKUP_TABLE,
  TREES_PRIORITY,
  TREES_RICHNESS,
  TREES_RARITY,
} from 'constants/layers-slugs';

const { VITE_APP_VERCEL_ENV } = import.meta.env;

const isNotProduction =
  VITE_APP_VERCEL_ENV === 'development' || VITE_APP_VERCEL_ENV === 'preview';

const COUNTRIES_DATA_URL =
  'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/NRC_final_20240507/FeatureServer';

const EEZ_MARINE_BORDERS_URL =
  'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Country_boundaries_with_EEZ/FeatureServer';

export const EEZ_MARINE_GEOMETRY_BORDERS_URL = `${EEZ_MARINE_BORDERS_URL}/0`;
export const METADATA_SERVICE_URL = isNotProduction
  ? 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/metadata_staging/FeatureServer/0'
  : 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/metadata_prod/FeatureServer/0';
export const MONITORING_HE_GOAL_SERVICE_URL =
  'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/monitoringHEgoal/FeatureServer/0';
export const HIGHLIGHTED_COUNTRY_SPECIES_URL =
  'https://utility.arcgis.com/usrsvcs/servers/aa62e9946df34e4ba176827c8ebc1b4d/rest/services/dupl_highlited_sp/FeatureServer/0';
export const COUNTRIES_DATA_SERVICE_URL = `${COUNTRIES_DATA_URL}/0`;
export const COUNTRIES_GEOMETRIES_SERVICE_URL =
  'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm_generalised/FeatureServer/0';
export const NRC_TERRESTRIAL_SPI_DATA_LAYER =
  'https://utility.arcgis.com/usrsvcs/servers/496871854f434806b93057a171c57e75/rest/services/Terrestrial_SPI_by_country_202401_refine_update_allcountries2_withGID/FeatureServer/0';
export const NRC_MARINE_SPI_DATA_LAYER =
  'https://utility.arcgis.com/usrsvcs/servers/4d9ee1ec6fb840ad83cc4fcfe6cc84e5/rest/services/Marine_SPI_by_country_20240314_withGID/FeatureServer/0';

const GADM_0_ADMIN_AREAS_FEATURE_LAYER_URL =
  'https://utility.arcgis.com/usrsvcs/servers/f09f7630ec964885bb2a968c7f1a8bea/rest/services/gadm0_aoi_summaries_updated_20240326/FeatureServer';
const GADM_1_ADMIN_AREAS_FEATURE_LAYER_URL =
  'https://utility.arcgis.com/usrsvcs/servers/340d03102060417c8a9f712754708216/rest/services/gadm1_precalculated_aoi_summaries_updated_20240321/FeatureServer';

export const LAYERS_URLS = {
  [GLOBAL_SPI_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/SPI_Terrestrial_202403/FeatureServer',
  [MARINE_SPI_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Global_SPI_EEZ_202403/FeatureServer',
  [AOIS_HISTORIC_PRODUCTION]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/shared_custom_aois_prod/FeatureServer/0',
  [AOIS_HISTORIC_DEVELOPMENT]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/shared_custom_aois/FeatureServer/0',
  [FIREFLY_BASEMAP_LAYER]:
    'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/HalfEarthFirefly/MapServer',
  [COUNTRY_PRIORITY_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/nrc_prior_bioRamp_clip/MapServer',
  [LAND_COUNTRY_PRIORITY_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/nrc_prior_bioRamp_clip/MapServer',
  [MARINE_COUNTRY_PRIORITY_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/nrc_prior_bioRamp_clip_marine3/MapServer',
  [EEZ_MARINE_AND_LAND_BORDERS]: EEZ_MARINE_BORDERS_URL,
  [PLEDGES_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/PledgeLocationsURL/FeatureServer',
  [EDUCATOR_AMBASSADORS_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Educator_Ambassadors/FeatureServer',
  [COUNTRIES_LABELS_FEATURE_LAYER]: COUNTRIES_DATA_URL,
  [COUNTRIES_DATA_FEATURE_LAYER]: COUNTRIES_DATA_URL,
  [LANDSCAPE_FEATURES_LABELS_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/LandscapeUniqueRivers_gadm36/FeatureServer',
  [CITIES_LABELS_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/CityLabels/FeatureServer',
  [REGIONS_LABELS_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm1_centroid/FeatureServer',
  [VIBRANT_BASEMAP_LAYER]:
    'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/Vibrant/MapServer',
  [SATELLITE_BASEMAP_LAYER]:
    'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
  [PRIORITY_PLACES_POLYGONS]:
    'https://utility.arcgis.com/usrsvcs/servers/685d69cda038469f93dcfd96355abefc/rest/services/PriorPolygons/FeatureServer',
  [FEATURED_PLACES_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Bioplaces/FeatureServer',

  // Carbon layer
  [CARBON_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Carbon_Total_2018/MapServer',
  [MARINE_CARBON_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Mean_Marine_Carbon_Stock/MapServer',

  // Protected areas WDPA
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]:
    'https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ProtectedAreas_MeriamNelson_202401/VectorTileServer',
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]:
    'https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Community_Based_MeriamNelson/VectorTileServer',

  [GRID_CELLS_PROTECTED_AREAS_PERCENTAGE]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/ArcGIS/rest/services/marine_and_land_grid_55km_prot_prop/FeatureServer',
  [GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/species_data_55km/FeatureServer',
  [GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/human_pressure_55km/FeatureServer',
  [BUILTUP_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Global_Human_Pressures_Urban_and_Built_up/MapServer',
  [ENERGY_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Global_Human_Pressures_Energy_Production_and_Occupancy/MapServer',
  [TRANSPORTATION_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Global_Human_Pressures_Transportation/MapServer',
  [AGRICULTURE_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Global_Human_Pressures_Agriculture/MapServer',
  [INTRUSION_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Global_Human_Pressures_Human_Intrusion/MapServer',
  [MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Land_Based_Drivers_MeriamNelson_cont/MapServer',
  [MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Ocean_Based_Drivers_MeriamNelson_cont/MapServer',
  [COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Commercial_Fishing_MeriamNelson_cont/MapServer',
  [ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Artisanal_Fishing_MeriamNelson_cont/MapServer',

  // REGIONAL 1km BIODIVERSITY

  // US, South Africa, South East Asia
  [AMPHIB_RARITY_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/amph_rar_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Rarity_Patterns_for_Amphibian_Species/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/SEA_Amphibians_Rarity_v1_5_20240313/MapServer',
  ],
  // US, South Africa, South East Asia
  [AMPHIB_RICHNESS_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/amph_rich_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Richness_Patterns_for_Amphibian_Species/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/SEA_Amphibians_Richness_v1_5_20240313/MapServer',
  ],
  [DRAGONFLIES_RARITY_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/df_rar_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/NA_Odanates_mean_rarity_tif/MapServer',
  ],
  [DRAGONFLIES_RICHNESS_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/df_rich_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/NA_Odanates_richness_tif/MapServer',
  ],
  // South Africa, South East Asia
  [BIRDS_RARITY_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/birds_rar_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/SEA_Birds_Rarity_v1_5_1_20240313/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Birds_Log_Total_Rarity/MapServer',
  ],
  // South Africa, South East Asia
  [BIRDS_RICHNESS_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/birds_rich_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/SEA_Birds_Richness_v1_5_1_20240313/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/NASA_Birds_Richness/MapServer',
  ],
  [RESTIO_RARITY_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/restio_rar_sa_tif/MapServer',
  [RESTIO_RICHNESS_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/restio_rich_sa_tif/MapServer',
  [PROTEA_RARITY_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/protea_rar_sa_tif/MapServer',
  [PROTEA_RICHNESS_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/protea_rich_sa_tif/MapServer',
  // US, South Africa, South East Asia
  [REPTILES_RARITY_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rept_rar_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Rarity_Patterns_for_Reptile_Species/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/SEA_Reptiles_Rarity_v1_5_1_20240313/MapServer',
  ],
  // US, South Africa, South East Asia
  [REPTILES_RICHNESS_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rept_rich_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Richness_Patterns_for_Reptile_Species/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/SEA_Reptiles_Richness_v1_5_1_20240313/MapServer',
  ],
  [HUMMINGBIRDS_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/hb_rarity_raw_tif/MapServer',
  [HUMMINGBIRDS_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/hb_rich_1km_tif/MapServer',
  // US, South Africa, South East Asia
  [MAMMALS_RICHNESS_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/mamm_rich_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/SEA_Mammals_Richness_v1_5_20240313/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/NASA_Mammals_Richness/MapServer',
  ],
  [SUMMER_BIRDS_RICHNESS_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Richness_Patterns_of_Breeding_Bird_Species_of_North_America/MapServer',
  [WINTER_BIRDS_RICHNESS_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Richness_Patterns_for_Nonbreeding_Bird_Species_of_North_America/MapServer',
  [RESIDENT_BIRDS_RICHNESS_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/NA_Resident_Bird_Richness_tif/MapServer',
  [ANTS_RICHNESS_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/NA_Ants_richness_v2_tif/MapServer',
  // US, South Africa, South East Asia
  [MAMMALS_RARITY_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/mamm_rar_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/SEA_Mammals_Rarity_v1_5_20240313/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/NASA_Mammals_Log_Total_Rarity/MapServer',
  ],
  [SUMMER_BIRDS_RARITY_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Rarity_Patterns_for_Breeding_Bird_Species_of_North_America/MapServer',
  [WINTER_BIRDS_RARITY_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Rarity_Patterns_for_Nonbreeding_Birds_of_North_America/MapServer',
  [RESIDENT_BIRDS_RARITY_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/NA_Resident_Bird_Rarity_tif/MapServer',
  [ANTS_RARITY_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/NA_Ants_mean_rarity_v2_2_1_tif/MapServer',

  // Global biodiversity services
  // Terrestrial Priority services
  [ALL_TAXA_PRIORITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Protection_Priority_All_Taxa_20240312/MapServer',
  [ALL_VERTEBRATES_PRIORITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Protection_Priority_All_Vertebrate_20240312/MapServer',
  [AMPHIB_PRIORITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Protection_Priority_Amphibians_20240312/MapServer',
  [MAMMALS_PRIORITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Protection_Priority_Mammals_20240312/MapServer',
  [BIRDS_PRIORITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Protection_Priority_Birds_20240312/MapServer',
  [REPTILES_PRIORITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Protection_Priority_Reptiles_20240312/MapServer',
  [TREES_PRIORITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Protection_Priority_Trees_20240312/MapServer',

  // Terrestrial vertebrates richness and rarity services
  [AMPHIB_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_amphib/MapServer',
  [AMPHIB_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_amphibians/MapServer',
  [ANTS_RARITY_GLOBAL]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Global_Ant_Species_Rarity_025_Degree/MapServer',
  [ANTS_RICHNESS_GLOBAL]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Global_Global_Ant_Species_Richness_025_Degree_Scaled/MapServer',

  [MAMMALS_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_mammals/MapServer',
  [MAMMALS_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_mammals/MapServer',

  [BIRDS_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_birds/MapServer',
  [BIRDS_RICHNESS]:
    ' https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_birds/MapServer',

  [REPTILES_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_reptiles/MapServer',
  [REPTILES_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_reptiles/MapServer',

  [BUTTERFLIES_RICHNESS_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Richness_Patterns_for_Butterfly_Species/MapServer',
  [BUTTERFLIES_RARITY_1KM]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Rarity_Patterns_for_Butterfly_Species/MapServer',

  // Terrestrial richness and rarity country level services
  [ANTS_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Country_checklists_ants/MapServer',
  [BUTTERFLIES_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Country_checklists_butterflies/MapServer',
  [ODONATES_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Country_checklists_odonates/MapServer',
  [SAPINDALES_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Country_checklists_sapindales/MapServer',

  // Plants richness and rarity services
  [CACTI_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_cacti/MapServer',
  [CACTI_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_cacti/MapServer',

  [CONIFERS_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_conifers/MapServer',
  [CONIFERS_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_conifers/MapServer',

  [TREES_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Tree_Richness_Percentile_v13a_20240312/MapServer',
  [TREES_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Tree_Log_Rarity_Percentile_v13a_20240312/MapServer',
  // All terrestrial richness and rarity services
  [ALL_TAXA_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_all/MapServer',
  [ALL_TAXA_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_taxa/MapServer',

  //  Marine priority services, 55km
  [ALL_MARINE_VERTEBRATES_PRIORITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Marine_Protection_Priority_All_Taxa_20240312/MapServer',
  [FISHES_PRIORITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Marine_Protection_Priority_Fish_20240312/MapServer',
  [MARINE_MAMMALS_PRIORITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Marine_Protection_Priority_Mammal_20240312/MapServer',

  // Marine vertebrates richness and rarity services
  [ALL_MARINE_VERTEBRATES_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rich_marine_taxa_global55km/MapServer',
  [ALL_MARINE_VERTEBRATES_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rar_marine_taxa_global55km/MapServer',
  [MARINE_MAMMALS_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rich_marine_mammal_global55km/MapServer',
  [MARINE_MAMMALS_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rar_marine_mammal_global55km/MapServer',
  [FISHES_RARITY]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rar_marine_fish_global55km/MapServer',
  [FISHES_RICHNESS]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rich_marine_fish_global55km/MapServer',

  // Vertebrate species modal
  [SPECIES_LIST]:
    'https://utility.arcgis.com/usrsvcs/servers/5e32902ede02487c8713d347813aaebf/rest/services/Terrestrial_SPI_NRCs_202401_refine_allcountries_withGID/FeatureServer',
  [MARINE_SPECIES_LIST]:
    'https://utility.arcgis.com/usrsvcs/servers/b252ecc71edc435cb34038dc9fb68768/rest/services/Marine_SPI_NRCs_202401_expert_withGID_20240314/FeatureServer',
  // AOIs lookup tables
  [SEARCH_LOOKUP_TABLE]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/ArcGIS/rest/services/AOI_lookup_table_20240318/FeatureServer/0',
  [ELU_LOOKUP_TABLE]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/ArcGIS/rest/services/ecosytem_categories_lookup/FeatureServer/0',
  [AMPHIBIAN_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/04d64805adcb460aa0ff6face308703a/rest/services/amphibians_with_SPS_updated/FeatureServer/0',
  [BIRDS_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/af760c4cbcfb4402bb5ee63b5c09151f/rest/services/birds_with_SPS_updated/FeatureServer/0',
  [MAMMALS_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/a0a1d30a1fe54e2e926ef7b723dee75b/rest/services/mammals_with_SPS_updated/FeatureServer/0',
  [REPTILES_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/ad816c55e2634f32848389d0ebec6d69/rest/services/reptiles_with_SPS_updated/FeatureServer/0',
  // AOIs precalculated layers
  [ADMIN_AREAS_FEATURE_LAYER]: [
    GADM_0_ADMIN_AREAS_FEATURE_LAYER_URL,
    GADM_1_ADMIN_AREAS_FEATURE_LAYER_URL,
  ],
  [GADM_0_ADMIN_AREAS_FEATURE_LAYER]: `${GADM_0_ADMIN_AREAS_FEATURE_LAYER_URL}/0`,
  [GADM_1_ADMIN_AREAS_FEATURE_LAYER]: `${GADM_1_ADMIN_AREAS_FEATURE_LAYER_URL}/0`,
  [GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA_with_gadm0_updated_202401/FeatureServer/0',
  [GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA_with_gadm1_updated_202401/FeatureServer/0',
  // 99%, 90%, 50% WDPA simplifications
  [WDPA_OECM_FEATURE_LAYER]: [
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA_Terrestrial_202401_Simplification50_20240320/FeatureServer/0',
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA_Terrestrial_202401_Simplification90_20240320/FeatureServer/0',
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA_Terrestrial_202401_Simplification99_20240320/FeatureServer/0',
  ],
  [WDPA_OECM_FEATURE_DATA_LAYER]:
    'https://utility.arcgis.com/usrsvcs/servers/a26fcc88e1a8495b9e679565c9e628f6/rest/services/wdpa_precalculated_aoi_summaries_updated_20240408/FeatureServer/0',
  [HALF_EARTH_FUTURE_TILE_LAYER]:
    'https://utility.arcgis.com/usrsvcs/servers/69967ac4027f49f095fd379974bdc3a8/rest/services/places_precalculated_aoi_summaries_updated_20240321/FeatureServer/0',
  [HALF_EARTH_FUTURE_WDPA_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA_with_20places_updated_202401/FeatureServer/0',
  [SPECIFIC_REGIONS_TILE_LAYER]:
    'https://utility.arcgis.com/usrsvcs/servers/5bd5e7f56500423cb0df4145c4cb4319/rest/services/regions_precalculated_aoi_summaries_updated_20240321/FeatureServer/0',
  [SPECIFIC_REGIONS_WDPA_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/SpecificRegions_wdpa_202401/FeatureServer/0',
};

export const DASHBOARD_URLS = {
  COUNTRY_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ESRI_table1_v2_0/FeatureServer',
  SPECIES_OCCURENCE_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/regional_species_COD/FeatureServer',
  WDPA_OCCURENCE_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/cd_occ_province_join/FeatureServer',
  SPI_PROVINCE_TREND_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ESRI_table2_v2_2/FeatureServer',
  SPI_REGION_SPECIES_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/regional_species_spi_scores_year_2024_v1_2/FeatureServer',
  SPI_HISTOGRAM_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/regional_and_national_spi_bin_count_2024/FeatureServer',
  SHI_PROVINCE_TREND_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/drc_provinces_spi_join2/FeatureServer',
  SHI_SPECIES_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/national_species_shi_scores_year_2024/FeatureServer',
  SHI_HISTOGRAM_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/shs_summary_for_stacked_bar_chart/FeatureServer',
  SHI_PROVINCE_HISTOGRAM_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/regional_shs_bin_count_2022/FeatureServer',
  SHI_PROVINCE_SPECIES_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/regional_species_shs_scores_year_2022/FeatureServer',
  AMPHIBIAN_LOOKUP:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/taxa_amphibians_final/FeatureServer',
  BIRDS_LOOKUP:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/taxa_birds_final/FeatureServer',
  MAMMALS_LOOKUP:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/taxa_mammals_final/FeatureServer',
  REPTILES_LOOKUP:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/taxa_reptiles_final/FeatureServer',
  PRECALC_AOI:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm1_precalculated_aoi_summaries_updated_20240321/FeatureServer',
  WDPA_PRECALC:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/wdpa_precalculated_aoi_summaries_updated_20240408/FeatureServer',
  ADMIN_AREAS_FEATURE_LAYER: [
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm0_aoi_summaries_updated_20240326/FeatureServer',
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm1_precalculated_aoi_summaries_updated_20240321/FeatureServer',
  ],
  FOREST:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/forest_title_refined_range_species/FeatureServer',
};
