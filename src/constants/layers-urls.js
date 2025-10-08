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
  AMPHIB_RICHNESS_NATIONAL,
  AMPHIB_RARITY_NATIONAL,
  BIRD_RICHNESS_NATIONAL,
  MAMMAL_RICHNESS_NATIONAL,
  REPTILE_RICHNESS_NATIONAL,
  BIRD_RARITY_NATIONAL,
  MAMMAL_RARITY_NATIONAL,
  REPTILE_RARITY_NATIONAL,
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
  BUTTERFLIES_RICHNESS_GLOBAL,
  BUTTERFLIES_RARITY_GLOBAL,
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
  FEATURED_PLACES_PORTAL_ID,
  TEMP_BIRDS_LOOKUP,
  TEMP_MAMMALS_LOOKUP,
  TEMP_REPTILES_LOOKUP,
  TEMP_AMPHIBIAN_LOOKUP,
} from 'constants/layers-slugs';

const { VITE_APP_VERCEL_ENV } = import.meta.env;

const isNotProduction =
  VITE_APP_VERCEL_ENV === 'development' || VITE_APP_VERCEL_ENV === 'preview';

const COUNTRIES_DATA_URL =
  'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/NRC_final_20250403/FeatureServer';
  'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/NRC_final_20250403/FeatureServer';

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
  'https://utility.arcgis.com/usrsvcs/servers/56b76d12d8974c47a6e64f9733f9fc94/rest/services/terrestrial_spi_per_year_20250328/FeatureServer/0';
export const NRC_MARINE_SPI_DATA_LAYER =
  'https://utility.arcgis.com/usrsvcs/servers/026649c877694cea96cbc1a9f06950f5/rest/services/marine_spi_per_year_20250328/FeatureServer/0';

const GADM_0_ADMIN_AREAS_FEATURE_LAYER_URL =
  // 'https://utility.arcgis.com/usrsvcs/servers/f09f7630ec964885bb2a968c7f1a8bea/rest/services/gadm0_aoi_summaries_updated_20240326/FeatureServer';
  'https://utility.arcgis.com/usrsvcs/servers/ca22a0922f934999a00e092feca4315d/rest/services/main_gadm0_precalculated_aoi_summaries_updated_20250521/FeatureServer';
const GADM_1_ADMIN_AREAS_FEATURE_LAYER_URL =
  'https://utility.arcgis.com/usrsvcs/servers/6710f8b62392473d8e06ee9c207ed010/rest/services/gadm1_precalculated_aoi_summaries_updated_20250327/FeatureServer';

export const LAYERS_URLS = {
  [GLOBAL_SPI_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/SPI_Terrestrial_20250414/FeatureServer',
  [MARINE_SPI_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/SPI_marine_20250414/FeatureServer',
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
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/featured_places_discover_added/FeatureServer',
  [FEATURED_PLACES_PORTAL_ID]:
  '51f5377402444b04b0a48b223d7431a3',

  // Carbon layer
  [CARBON_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Carbon_Total_2018/MapServer',
  [MARINE_CARBON_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Mean_Marine_Carbon_Stock/MapServer',

  // Protected areas WDPA
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/ProtectedAreas_20250416/VectorTileServer',
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]:
    'https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/community_based_areas_20250408/VectorTileServer',

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
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/amphibians_meanrarity_log10_linear_80km/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/amph_rar_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/SEA_Amphibians_Rarity_v1_5_20240313/MapServer',
  ],
  // US, South Africa, South East Asia
  [AMPHIB_RICHNESS_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/amphibians_richness_linear_80km/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/amph_rich_sa_tif/MapServer',
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
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/reptiles_meanrarity_log10_linear_80km/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rept_rar_sa_tif/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/SEA_Reptiles_Rarity_v1_5_1_20240313/MapServer',
  ],
  // US, South Africa, South East Asia
  [REPTILES_RICHNESS_1KM]: [
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/reptiles_richness_linear_80km/MapServer',
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rept_rich_sa_tif/MapServer',
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
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/ants_richness_linear_80km_tile_package/MapServer',
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
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/ants_meanrarity_log10_linear_80km/MapServer',

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

  [BUTTERFLIES_RICHNESS_GLOBAL]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/butterfly_richness_110km_202504/MapServer',
  [BUTTERFLIES_RARITY_GLOBAL]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/butterfly_rarity_110km_202504/MapServer',

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
    'https://utility.arcgis.com/usrsvcs/servers/06887b77aad943db9dcc25dc05f99ab5/rest/services/Terrestrial_SPI_NRCs_2025_refine_allcountries_withGID_202504015/FeatureServer',
  [MARINE_SPECIES_LIST]:
    'https://utility.arcgis.com/usrsvcs/servers/f656c91cf3c14a86820297c719164992/rest/services/Marine_SPI_NRCs_2025_expert_withGID_202504015/FeatureServer',
  // AOIs lookup tables
  [SEARCH_LOOKUP_TABLE]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/AOI_lookup_table_202504/FeatureServer/0',
  [ELU_LOOKUP_TABLE]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/ArcGIS/rest/services/ecosytem_categories_lookup/FeatureServer/0',
  [AMPHIBIAN_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/364481070b8448aa8df07e5324fcecc9/rest/services/amphibians_with_SPS_updated_202503/FeatureServer/0',
  [BIRDS_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/4c4c7b9a327f48d3955f80a2402198f0/rest/services/birds_with_SPS_updated_202503/FeatureServer/0',
  [MAMMALS_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/94268703d9b345c6a8c1e5ccd1be0acf/rest/services/mammals_with_SPS_updated_202503/FeatureServer/0',
  [REPTILES_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/502f1d5023014390b9d415fecab92810/rest/services/reptiles_with_SPS_updated_202503/FeatureServer/0',

   // Temp AOI lookup table while we migrate to new service
  [TEMP_AMPHIBIAN_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/dc3f05cadc524d4fb9d94d194a7be1bd/rest/services/amphibians_lookup_wattributes_09022025/FeatureServer/0',
  [TEMP_BIRDS_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/5fca1afc62ed44c29d7d794de648ab35/rest/services/birds_lookup_wattributes_09022025/FeatureServer/0',
  [TEMP_MAMMALS_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/164e650be5e34ba39eac1401390f149b/rest/services/mammals_lookup_wattributes_09022025/FeatureServer/0',
  [TEMP_REPTILES_LOOKUP]:
    'https://utility.arcgis.com/usrsvcs/servers/a3214e7f846d45e2a24e343bd1d1e275/rest/services/reptiles_lookup_wattributes_09022025/FeatureServer/0',

  // AOIs precalculated layers
  [ADMIN_AREAS_FEATURE_LAYER]: [
    GADM_0_ADMIN_AREAS_FEATURE_LAYER_URL,
    GADM_1_ADMIN_AREAS_FEATURE_LAYER_URL,
  ],
  [GADM_0_ADMIN_AREAS_FEATURE_LAYER]: `${GADM_0_ADMIN_AREAS_FEATURE_LAYER_URL}/0`,
  [GADM_1_ADMIN_AREAS_FEATURE_LAYER]: `${GADM_1_ADMIN_AREAS_FEATURE_LAYER_URL}/0`,
  [GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/wdpa_with_gadm0_20250602/FeatureServer/0',
  [GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/wdpa_with_gadm1_20250602/FeatureServer/0',
  // 99%, 90%, 50% WDPA simplifications
  [WDPA_OECM_FEATURE_LAYER]: [
    'https://utility.arcgis.com/usrsvcs/servers/adfdb53a755a4916af057be6bb824422/rest/services/WDPA_Terrestrial_202501_Simplification50_20250527/FeatureServer/0',
    'https://utility.arcgis.com/usrsvcs/servers/cc75600a103b4e39a14c103a62a80091/rest/services/WDPA_Terrestrial_202501_Simplification90_20250527/FeatureServer/0',
    'https://utility.arcgis.com/usrsvcs/servers/4530b1d34e74497ea64938055867115d/rest/services/WDPA_Terrestrial_202501_Simplification99_20250527/FeatureServer/0',
  ],
  [WDPA_OECM_FEATURE_DATA_LAYER]:
    'https://utility.arcgis.com/usrsvcs/servers/5b474f385c984b44811cdfad8ad37657/rest/services/wdpa_precalculated_aoi_summaries_updated_20250527/FeatureServer/0',
  [HALF_EARTH_FUTURE_TILE_LAYER]:
    'https://utility.arcgis.com/usrsvcs/servers/5e59f968feaf4efe8846869931b3b49c/rest/services/places_precalculated_aoi_summaries_updated_20250415/FeatureServer/0',
  [HALF_EARTH_FUTURE_WDPA_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/wdpa_with_20places_20250602/FeatureServer/0',
  [SPECIFIC_REGIONS_TILE_LAYER]:
    'https://utility.arcgis.com/usrsvcs/servers/49260dded8b14da3ad3452490d171264/rest/services/regions_precalculated_aoi_summaries_updated_20250521/FeatureServer/0',
  [SPECIFIC_REGIONS_WDPA_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/SpecificRegions_wdpa_202401/FeatureServer/0',
    // Regional richness and rarity layers
  [AMPHIB_RICHNESS_NATIONAL]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/amphibians_richness_nationally_scaled_SEA_NA_SACA/MapServer',
  [AMPHIB_RARITY_NATIONAL]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/amphibians_mean_rarity_nationally_scaled_SEA_NA_SACA/MapServer',
  [BIRD_RICHNESS_NATIONAL]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/birds_richness_nationally_scaled_SEA_NA_SACA/MapServer',
  [BIRD_RARITY_NATIONAL]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/birds_mean_rarity_nationally_scaled_SEA_NA_SACA/MapServer',
  [MAMMAL_RICHNESS_NATIONAL]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/mammals_richness_nationally_scaled_SEA_NA_SACA/MapServer',
  [MAMMAL_RARITY_NATIONAL]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/mammals_mean_rarity_nationally_scaled_SEA_NA_SACA/MapServer',
  [REPTILE_RICHNESS_NATIONAL]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/reptiles_richness_nationally_scaled_SEA_NA_SACA/MapServer',
  [REPTILE_RARITY_NATIONAL]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/reptiles_mean_rarity_nationally_scaled_SEA_NA_SACA/MapServer',

};

export const DASHBOARD_URLS = {
  INITIAL_COUNTRY_LAYER: '53a1e68de7e4499cad77c80daba46a94',
  COUNTRY_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ESRI_table1_v2_1/FeatureServer',
  SPECIES_OCCURENCE_COUNTRY_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/species_list_COD_v2/FeatureServer',
  // https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/species_list_COD_v2/FeatureServer
  SPECIES_OCCURENCE_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/regional_species_COD_v5/FeatureServer',
  // https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/regional_species_COD_v5/FeatureServer
  GUY_SPECIES_OCCURENCE_URL:
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/guy_occurences_w_attributes/FeatureServer',
  WDPA_OCCURENCE_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/cd_occ_province_join/FeatureServer',
  SPI_PROVINCE_TREND_URL:
    // 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ESRI_table2_v2_2/FeatureServer',
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/country_shi_spi_trend_table/FeatureServer',
  SPI_REGION_SPECIES_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/regional_species_spi_scores_year_2024_v1_2/FeatureServer',
  SPI_HISTOGRAM_URL:
    // 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/regional_and_national_spi_bin_count_2024/FeatureServer',
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/country_sps_shs_binned/FeatureServer',
  SHI_PROVINCE_TREND_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/regional_shs_COD_v2/FeatureServer',
  // https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/regional_shs_COD_v2/FeatureServer
  SHI_SPECIES_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/national_species_shi_scores_year_2024/FeatureServer',
  SHI_HISTOGRAM_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/shs_summary_for_stacked_bar_chart_2021/FeatureServer',
  SHI_PROVINCE_HISTOGRAM_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/regional_shs_bin_count_2022/FeatureServer',
  SHI_PROVINCE_SPECIES_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/regional_species_shs_scores_year_2022/FeatureServer',
  SHI_COUNTRY_DATA_URL:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/national_and_province_shs_by_taxa/FeatureServer',
  AMPHIBIAN_LOOKUP:
    'https://utility.arcgis.com/usrsvcs/servers/a17e5af9ca354a69870f3726294e4754/rest/services/amphibians_202507_attributes/FeatureServer',
  BIRDS_LOOKUP:
    'https://utility.arcgis.com/usrsvcs/servers/3ff5a9d0c0c64502a5926b15db01cd68/rest/services/birds_202507_attributes/FeatureServer',
  MAMMALS_LOOKUP:
    'https://utility.arcgis.com/usrsvcs/servers/00080f7438514fbfac713aa1ab60bf9f/rest/services/mammals_202507_attributes/FeatureServer',
  REPTILES_LOOKUP:
    'https://utility.arcgis.com/usrsvcs/servers/c7816b6cbb684ccb8bc69045505315f3/rest/services/reptiles_202507_attributes/FeatureServer?f=pjson',
  PRECALC_AOI_COUNTRY:
    // 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm0_aoi_summaries_updated_20240326/FeatureServer',
    'https://utility.arcgis.com/usrsvcs/servers/ca22a0922f934999a00e092feca4315d/rest/services/main_gadm0_precalculated_aoi_summaries_updated_20250521/FeatureServer',
  PRECALC_AOI:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm1_precalculated_aoi_summaries_updated_20240321/FeatureServer',
  WDPA: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/wdpa_occ_species_COD/FeatureServer',
  WDPA_PRECALC:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/wdpa_precalculated_aoi_summaries_updated_20240408/FeatureServer',
  ADMIN_AREAS_FEATURE_LAYER: [
    // 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm0_aoi_summaries_updated_20240326/FeatureServer',
    'https://utility.arcgis.com/usrsvcs/servers/ca22a0922f934999a00e092feca4315d/rest/services/main_gadm0_precalculated_aoi_summaries_updated_20250521/FeatureServer',
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm1_precalculated_aoi_summaries_updated_20240321/FeatureServer',
  ],
  FOREST:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/forest_title_refined_range_species/FeatureServer',
  PRIORITY_SPECIES:
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/priority_species/FeatureServer',
  IGNORE_SPECIES_LIST:
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/species_to_remove/FeatureServer',
  DATASET_LAYER_INFO:
    'https://dev-api.mol.org/2.x/datasets/metadata?dataset_id=',
  DATASET_LAYER_GROUP_INFO: 'https://dev-api.mol.org/2.x/datasets/type',
  COD_OCCURRENCE_LAYER:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/COD_occurrence_records/FeatureServer',
  COD_REGIONAL_SPECIES_LAYER: 'd9b12607731a42e8b463612d7b51ffa5',
  PRIVATE_COD_OCCURENCE_LAYER:
    'https://services3.arcgis.com/Zyt0ectKCtAdsOa2/arcgis/rest/services/occurrences_RDC/FeatureServer',
  PRIVATE_COD_OCCURENCE_METADATA_LAYER:
    'https://services3.arcgis.com/Zyt0ectKCtAdsOa2/arcgis/rest/services/occurrence_metadata/FeatureServer',
  PRIVATE_GIN_OCCURENCE_LAYER:
    'https://services5.arcgis.com/0f65lZbPr3QAKkSu/arcgis/rest/services/occurrences_GIN/FeatureServer',
  PRIVATE_GIN_OCCURENCE_METADATA_LAYER:
    'https://services5.arcgis.com/0f65lZbPr3QAKkSu/arcgis/rest/services/occurrence_metadata/FeatureServer',
  ZONE_SPECIES:
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/custom_region_species_list_w_attributes/FeatureServer',
  ZONE_OCCURRENCE:
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/species_occurences_iso3_level/FeatureServer',
  RAPID_INVENTORY_SPECIES:
    'https://utility.arcgis.com/usrsvcs/servers/3dd5ccfd05f74871abde3d4cbbe9d6b0/rest/services/RI_32_occurences_w_attributes/FeatureServer',
  NBIS_URL:
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/nbs_op_areas_precalculated_species/FeatureServer',
  // 'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/nbs_op_areas_precalculated/FeatureServer',
  REGION_SHI_SPI_URL:
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/region_shi_spi_trend_table/FeatureServer',
  REGION_HISTOGRAM_URL:
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/region_spi_shi_binned/FeatureServer',
  REGION_SPECIES_SEARCH_URL:
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/region_iso3_species_search_bar/FeatureServer',
  REGION_BIODIVERSITY_URL:
    'https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/species_sps_region_global/FeatureServer',
  REGION_BIODIVERSITY_SHS_URL:
    ' https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/species_shs_region_global/FeatureServer',
  SDM_FEATURE_LAYER_URL:
    'https://tiles.arcgis.com/tiles/7uJv7I3kgh2y7Pe0/arcgis/rest/services/Ateles_paniscus/MapServer',
};

export const NBIS_URLS = {
  // https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/nbs_op_areas/FeatureServer
  // https://services1.arcgis.com/7uJv7I3kgh2y7Pe0/arcgis/rest/services/nbs_op_areas_complete/FeatureServer
};
