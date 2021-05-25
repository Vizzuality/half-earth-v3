import {
  COUNTRY_PRIORITY_LAYER,
  COUNTRIES_LABELS_FEATURE_LAYER,
  COUNTRIES_DATA_FEATURE_LAYER,
  COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER,
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
  RAISIG_AREAS_FEATURE_LAYER,
  RAISIG_AREAS_VECTOR_TILE_LAYER,
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
  FIREFLY_BASEMAP_LAYER
} from 'constants/layers-slugs';

export const GRID_URL = "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm_grid_55k_dis/FeatureServer";
export const PLEDGES_LAYER_URL = "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/PledgeLocationsURL/FeatureServer";
export const METADATA_SERVICE_URL = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Metadata2/FeatureServer/0';
export const MONITORING_HE_GOAL_SERVICE_URL = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/monitoringHEgoal/FeatureServer/0'
export const HIGHLIGHTED_COUNTRY_SPECIES_URL = 'https://utility.arcgis.com/usrsvcs/servers/aa62e9946df34e4ba176827c8ebc1b4d/rest/services/dupl_highlited_sp/FeatureServer/0';
export const COUNTRIES_DATA_SERVICE_URL = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm_centroid/FeatureServer/0';
export const COUNTRIES_GEOMETRIES_SERVICE_URL = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/gadm_generalised/FeatureServer/0';

export const LAYERS_URLS = {
  [FIREFLY_BASEMAP_LAYER]:
    'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/HalfEarthFirefly/MapServer',
  [COUNTRY_PRIORITY_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Prioritisation_for_national_report_cards/MapServer',
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
  [PROTECTED_AREAS_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Protected_areas_FL/FeatureServer',
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Protected_areas/VectorTileServer',
  [COMMUNITY_AREAS_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/community_based_FL/FeatureServer',
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/community_based/VectorTileServer',
  [RAISIG_AREAS_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/RAISG_Tls/FeatureServer',
  [RAISIG_AREAS_VECTOR_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Territorios_Ind%C3%ADgenas_RAISG/VectorTileServer',
  [GRID_CELLS_PROTECTED_AREAS_PERCENTAGE]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/ArcGIS/rest/services/marine_and_land_grid_55km_prot_prop/FeatureServer',
  [GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/species_data_55km/FeatureServer',
  [GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE]:
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/human_pressure_55km/FeatureServer',
  [URBAN_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/gHM_Urban_inverted/MapServer',
  [IRRIGATED_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/gHM_Irrigated_inverted/MapServer',
  [RAINFED_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/gHM_Rainfed_inverted/MapServer',
  [RANGELAND_HUMAN_PRESSURES_TILE_LAYER]:
    'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/gHM_Rangeland_inverted/MapServer',
  [MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/mHM_Land_drivers_aligned_masked/MapServer',
  [MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/mHM_Ocean_drivers_aligned_masked/MapServer',
  [COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/mHM_Commercial_fishing_aligned_masked/MapServer',
  [ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/mHM_Artisanal_fishing_aligned_masked/MapServer',
  // REGIONAL 1km BIODIVERSITY
  [SA_AMPHIB_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Rarity_Patterns_for_Amphibians_of_Southern_Africa/MapServer`,
  [SA_AMPHIB_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Richness_Patterns_for_Amphibians_of_Southern_Africa/MapServer`,
  [SA_DRAGONFLIES_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Rarity_Patterns_for_Dragonflies_of_Southern_Africa/MapServer`,
  [SA_DRAGONFLIES_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Richness_Patterns_for_Dragonflies_of_Southern_Africa/MapServer`,
  [SA_MAMMALS_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Rarity_Patterns_for_Mammals_of_Southern_Africa/MapServer`,
  [SA_MAMMALS_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Richness_Patterns_for_Mammals_of_Southern_Africa/MapServer`,
  [SA_BIRDS_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Rarity_Patterns_for_Birds_of_Southern_Africa/MapServer`,
  [SA_BIRDS_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Richness_Patterns_for_Birds_of_Southern_Africa/MapServer`,
  [SA_RESTIO_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Rarity_Patterns_for_Restio_of_Southern_Africa/MapServer`,
  [SA_RESTIO_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Richness_Patterns_for_Restio_of_Southern_Africa/MapServer`,
  [SA_PROTEA_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Rarity_Patterns_for_Protea_of_Southern_Africa/MapServer`,
  [SA_PROTEA_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Richness_Patterns_for_Protea_of_Southern_Africa/MapServer`,
  [SA_REPTILES_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Rarity_Patterns_for_Reptiles_of_Southern_Africa/MapServer`,
  [SA_REPTILES_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Species_Richness_Patterns_for_Reptiles_of_Southern_Africa/MapServer`,
  [HUMMINGBIRDS_RARITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Global_Species_Rarity_Patterns_for_Hummingbirds/MapServer`,
  [HUMMINGBIRDS_RICHNESS]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Global_Species_Richness_Patterns_for_Hummingbirds/MapServer`,
  // 55 km biodiversity services
  [AMPHIB_PRIORITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Putative_PA_network_PR_amph/MapServer`,
  [AMPHIB_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/dfae6e65b8054d469bb3d9a262a6a012/rest/services/Amphibians_Rarity_55km/MapServer`,
  [MAMMALS_PRIORITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Putative_PA_network_PR_mamm/MapServer`,
  [MAMMALS_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/c86a668ccf7c49e89dea321bbe5d6838/rest/services/Mammals_Rarity_55km/MapServer`,
  [MAMMALS_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/da62311c8b354dfe82975cbfc83ca10c/rest/services/Mammals_Richness_55km/MapServer`,
  [BIRDS_PRIORITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Putative_PA_network_PR_bird/MapServer`,
  [BIRDS_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/319076f4e6484084a6b61d2b5174fdde/rest/services/Birds_Rarity_55km/MapServer`,
  [BIRDS_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/9044251ae4dd44a49096c0d4342da1dc/rest/services/Birds_Richness_55km/MapServer`,
  [CACTI_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/d5d959cb7b73494eb86178ce8723033b/rest/services/Cacti_Rarity_55km/MapServer`,
  [CACTI_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/1620d2b2e23e4722bd405f95cc49c0c2/rest/services/Cacti_Richness_55km/MapServer`,
  [CONIFERS_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/e931b9d4c3194dcdbc96bf51c530163e/rest/services/Conifers_Rarity_55km/MapServer`,
  [CONIFERS_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/ac39f4e35750448d93464d4807e3ac3f/rest/services/Conifers_Richness_55km/MapServer`,
  [REPTILES_PRIORITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Putative_PA_network_PR_rept/MapServer`,
  [REPTILES_RARITY]:
    'https://utility.arcgis.com/usrsvcs/servers/857da983a2a54a2fa6516059501547ac/rest/services/Reptiles_Rarity_55km/MapServer',
  [REPTILES_RICHNESS]:
    'https://utility.arcgis.com/usrsvcs/servers/fc2ad4d2955b446687afcf545cdef135/rest/services/Reptiles_Richness/MapServer',
  [ALL_TAXA_PRIORITY]: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Putative_PA_network_PR_all/MapServer`,
  [ALL_TAXA_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/30b635240689413082d9b4f3c8d25aa6/rest/services/All_Taxa_Rarity_55km/MapServer`,
  [ALL_TAXA_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/2d2acd2ff9f54d5c87ea317c9de3c1a1/rest/services/All_Taxa_Richness_55km/MapServer`,
  [AMPHIB_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/373ad88574cc403cb4707a5491b8a661/rest/services/Amphibians_Richness_55km/MapServer`,
  [FISHES_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/672fd2c2e15d43dba3c452ca600884a8/rest/services/Marine_Fish_Rarity_55km/MapServer`,
  [FISHES_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/5212259d151744438c610d5104b91591/rest/services/Marine_Fish_Richness_55km/MapServer`,
  [SPECIES_LIST]:
    'https://utility.arcgis.com/usrsvcs/servers/04986e0b667c4ad29539683d6ba2314f/rest/services/NRC_species_data_20200817_formatted/FeatureServer'
};
