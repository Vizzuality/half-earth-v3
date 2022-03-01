import {
  COUNTRY_PRIORITY_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  COUNTRIES_DATA_FEATURE_LAYER,
  COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER,
  GLOBAL_SPI_FEATURE_LAYER,
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  VIBRANT_BASEMAP_LAYER,
  SATELLITE_BASEMAP_LAYER,
  PRIORITY_PLACES_POLYGONS,
  MERGED_WDPA_VECTOR_TILE_LAYER,
  PROTECTED_AREAS_FEATURE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_FEATURE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  HALF_EARTH_FUTURE_FEATURE_LAYER,
  HALF_EARTH_FUTURE_VECTOR_TILE_LAYER,
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
  PLEDGES_LAYER,
  EDUCATOR_AMBASSADORS_LAYER,
  SPECIES_LIST,
  FIREFLY_BASEMAP_LAYER,
  WDPA_OECM_FEATURE_LAYER,
  WDPA_OECM_FEATURE_DATA_LAYER,
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER,
  AOIS_HISTORIC_PRODUCTION,
  AOIS_HISTORIC_DEVELOPMENT,
  ELU_LOOKUP_TABLE,
  WDPA_LOOKUP_TABLE,
  AMPHIBIAN_LOOKUP,
  BIRDS_LOOKUP,
  MAMMALS_LOOKUP,
  REPTILES_LOOKUP,
} from 'constants/layers-slugs';

export const GRID_URL = "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm_grid_55k_dis/FeatureServer";
export const PLEDGES_LAYER_URL = "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/PledgeLocationsURL/FeatureServer";
export const METADATA_SERVICE_URL = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/metadata_prod/FeatureServer/0';
export const MONITORING_HE_GOAL_SERVICE_URL = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/monitoringHEgoal/FeatureServer/0'
export const HIGHLIGHTED_COUNTRY_SPECIES_URL = 'https://utility.arcgis.com/usrsvcs/servers/aa62e9946df34e4ba176827c8ebc1b4d/rest/services/dupl_highlited_sp/FeatureServer/0';
export const COUNTRIES_DATA_SERVICE_URL = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm_centroid/FeatureServer/0';
export const COUNTRIES_GEOMETRIES_SERVICE_URL = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm_generalised/FeatureServer/0';

export const LAYERS_URLS = {
  [GLOBAL_SPI_FEATURE_LAYER]:
  'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/spi_data_spi_globe/FeatureServer',
  [AOIS_HISTORIC_PRODUCTION]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/shared_custom_aois_prod/FeatureServer/0',
  [AOIS_HISTORIC_DEVELOPMENT]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/shared_custom_aois/FeatureServer/0',
  [FIREFLY_BASEMAP_LAYER]:
    'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/HalfEarthFirefly/MapServer',
  [COUNTRY_PRIORITY_LAYER]:
  'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/nrc_prior_bioRamp_clip/MapServer',
  [PLEDGES_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/PledgeLocationsURL/FeatureServer',
  [EDUCATOR_AMBASSADORS_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Educator_Ambassadors/FeatureServer',
  [COUNTRIES_LABELS_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm_centroid/FeatureServer',
  [COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm_generalised/FeatureServer',
  [COUNTRIES_DATA_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm_centroid/FeatureServer',
  [LANDSCAPE_FEATURES_LABELS_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/LandscapeUniqueRivers_gadm36/FeatureServer',
  [CITIES_LABELS_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/CityLabels/FeatureServer',
  [VIBRANT_BASEMAP_LAYER]:
    'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/Vibrant/MapServer',
  [SATELLITE_BASEMAP_LAYER]:
    'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
  [PRIORITY_PLACES_POLYGONS]:
    'https://utility.arcgis.com/usrsvcs/servers/685d69cda038469f93dcfd96355abefc/rest/services/PriorPolygons/FeatureServer',
  [FEATURED_PLACES_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Bioplaces/FeatureServer',
  [MERGED_WDPA_VECTOR_TILE_LAYER]:
  'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/NRC_WDPA_OECM_Jan2020_cleaned_MOL/VectorTileServer',
  [PROTECTED_AREAS_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Protected_Areas_MeriamNelson/FeatureServer',
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]: 'https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Protected_Areas_MeriamNelson/VectorTileServer',
  [COMMUNITY_AREAS_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Community_Based_MeriamNelson/FeatureServer',
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]: 'https://vectortileservices9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Community_Based_MeriamNelson/VectorTileServer',
  [HALF_EARTH_FUTURE_VECTOR_TILE_LAYER]: 'https://utility.arcgis.com/usrsvcs/servers/21888759592f4272bfc641a23509ffc3/rest/services/top_places_precalculated/FeatureServer',
  [HALF_EARTH_FUTURE_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA_20places/FeatureServer/0',
  [GRID_CELLS_PROTECTED_AREAS_PERCENTAGE]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/ArcGIS/rest/services/marine_and_land_grid_55km_prot_prop/FeatureServer',
  [GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/species_data_55km/FeatureServer',
  [GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/human_pressure_55km/FeatureServer',
  [URBAN_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/gHM_Urban_MerimNelson/MapServer',
  [IRRIGATED_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/gHM_Irrigated_MerimNelson/MapServer',
  [RAINFED_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/gHM_Rainfed_MerimNelson/MapServer',
  [RANGELAND_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/gHM_Rangeland_MerimNelson/MapServer',
  [MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Land_Based_Drivers_MeriamNelson_cont/MapServer',
  [MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Ocean_Based_Drivers_MeriamNelson_cont/MapServer',
  [COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Commercial_Fishing_MeriamNelson_cont/MapServer',
  [ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Artisanal_Fishing_MeriamNelson_cont/MapServer',
  // REGIONAL 1km BIODIVERSITY
  [SA_AMPHIB_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/amph_rich_sa_1km/MapServer`,
  [SA_AMPHIB_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/amph_rich_sa_tif/MapServer`,
  [SA_DRAGONFLIES_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/df_rar_sa_tif/MapServer`,
  [SA_DRAGONFLIES_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/df_rich_sa_tif/MapServer`,
  [SA_MAMMALS_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/mamm_rar_sa_tif/MapServer`,
  [SA_MAMMALS_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/mamm_rich_sa_tif/MapServer`,
  [SA_BIRDS_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/birds_rar_sa_tif/MapServer`,
  [SA_BIRDS_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/birds_rich_sa_tif/MapServer`,
  [SA_RESTIO_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/restio_rar_sa_tif/MapServer`,
  [SA_RESTIO_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/restio_rich_sa_tif/MapServer`,
  [SA_PROTEA_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/protea_rar_sa_tif/MapServer`,
  [SA_PROTEA_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/protea_rich_sa_tif/MapServer`,
  [SA_REPTILES_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rept_rar_sa_tif/MapServer`,
  [SA_REPTILES_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rept_rich_sa_tif/MapServer`,
  [HUMMINGBIRDS_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/hb_rarity_raw_tif/MapServer`,
  [HUMMINGBIRDS_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/hb_rich_1km_tif/MapServer`,
  // Global biodiversity services
  //// Terrestrial Priority services
  [ALL_TAXA_PRIORITY]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/PR_allTaxa_global_025/MapServer',
  [AMPHIB_PRIORITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/PR_amphibians_global_025/MapServer`,
  [MAMMALS_PRIORITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/PR_mammals_global_025/MapServer`,
  [BIRDS_PRIORITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/PR_birds_global_025/MapServer`,
  [REPTILES_PRIORITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/PR_reptiles_global_025/MapServer`,
  //// Terrestrial vertebrates richness and rarity services
  [AMPHIB_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_amphib/MapServer`,
  [AMPHIB_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_amphibians/MapServer`,

  [MAMMALS_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_mammals/MapServer`,
  [MAMMALS_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_mammals/MapServer`,

  [BIRDS_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_birds/MapServer`,
  [BIRDS_RICHNESS]: ` https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_birds/MapServer`,

  [REPTILES_RARITY]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_reptiles/MapServer',
  [REPTILES_RICHNESS]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_reptiles/MapServer',

  //// Plants richness and rarity services
  [CACTI_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_cacti/MapServer`,
  [CACTI_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_cacti/MapServer`,

  [CONIFERS_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_conifers/MapServer`,
  [CONIFERS_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_conifers/MapServer`,

  //// All terrestrial richness and rarity services
  [ALL_TAXA_RARITY]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rarity_025d_all/MapServer',
  [ALL_TAXA_RICHNESS]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/richness_025d_taxa/MapServer',

  //// Marine priority services, 55km
  [ALL_MARINE_VERTEBRATES_PRIORITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Marine_priority_PRall_55km/MapServer`,
  [FISHES_PRIORITY]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Marine_priority_PRfish_55km/MapServer',
  [MARINE_MAMMALS_PRIORITY]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Marine_priority_PRmammals_55km/MapServer',

  //// Marine vertebrates richness and rarity services
  [ALL_MARINE_VERTEBRATES_RICHNESS]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rich_marine_taxa_global55km/MapServer',
  [ALL_MARINE_VERTEBRATES_RARITY]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rar_marine_taxa_global55km/MapServer',
  [MARINE_MAMMALS_RICHNESS]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rich_marine_mammal_global55km/MapServer',
  [MARINE_MAMMALS_RARITY]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rar_marine_mammal_global55km/MapServer',
  [FISHES_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rar_marine_fish_global55km/MapServer`,
  [FISHES_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/rich_marine_fish_global55km/MapServer`,

  [SPECIES_LIST]:
    'https://utility.arcgis.com/usrsvcs/servers/04986e0b667c4ad29539683d6ba2314f/rest/services/NRC_species_data_20200817_formatted/FeatureServer',
  // AOIs lookup tables
  [ELU_LOOKUP_TABLE]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/ArcGIS/rest/services/ecosytem_categories_lookup/FeatureServer/0',
  [WDPA_LOOKUP_TABLE]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA_OECM_June2021_WDPAID_table/FeatureServer/0',
  [AMPHIBIAN_LOOKUP]:'https://utility.arcgis.com/usrsvcs/servers/c20121cd88754247bbbeac5da6b26be1/rest/services/Test_Amphibian_CRF_species_table/FeatureServer/0',
  [BIRDS_LOOKUP]:'https://utility.arcgis.com/usrsvcs/servers/fb93f4475cc84fd7b0eec712d701e46d/rest/services/Bird_CRF_species_table/FeatureServer/0',
  [MAMMALS_LOOKUP]:'https://utility.arcgis.com/usrsvcs/servers/7c7e6649a44e423ab52083b65823c310/rest/services/Test_Mammal_CRF_species_table/FeatureServer/0',
  [REPTILES_LOOKUP]:'https://utility.arcgis.com/usrsvcs/servers/f0b987e051844fd78b05c813ba251548/rest/services/Test_Reptile_CRF_species_table/FeatureServer/0',
   // AOIs precalculated layers
   [GADM_0_ADMIN_AREAS_FEATURE_LAYER]: 'https://utility.arcgis.com/usrsvcs/servers/e4c7c676b18547e6b1934d9738a6a41f/rest/services/gadm0_precalculated_20220224/FeatureServer/0',
   [GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/wdpa_with_gadm0/FeatureServer/0',
   [GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/wdpa_with_gadm1/FeatureServer/0',
   [GADM_1_ADMIN_AREAS_FEATURE_LAYER]: 'https://utility.arcgis.com/usrsvcs/servers/329a41aec90249c2ba5d6330f43f9390/rest/services/gadm1_precalculated_range_area/FeatureServer/0',
  //  [GADM_1_ADMIN_AREAS_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm36_level1_Simplify_precalculated_crfs/FeatureServer/0',
  //  [WDPA_OECM_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA%20with%20OECMs%20June%202021/FeatureServer',
    [WDPA_OECM_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/WDPA_terrestrialmarine2021_simplified_v2/FeatureServer/0',
    [WDPA_OECM_FEATURE_DATA_LAYER]: 'https://utility.arcgis.com/usrsvcs/servers/051ba1f3714748bfb4c725d29b938e20/rest/services/all_precalc_wdpa_no_geom/FeatureServer/0',

};
