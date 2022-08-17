// Protected areas layers.
export const MERGED_WDPA_VECTOR_TILE_LAYER = 'merged-protected';
export const PROTECTED_AREAS_FEATURE_LAYER = 'protected_areas_feature_layer';
export const PROTECTED_AREAS_VECTOR_TILE_LAYER = 'protected_areas_vector_tile_layer';

export const TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER = 'terrestrial_protected_areas_vector_tile_layer';
export const MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER = 'marine_protected_areas_vector_tile_layer';

export const COMMUNITY_AREAS_FEATURE_LAYER = 'community_areas_feature_layer';
export const COMMUNITY_AREAS_VECTOR_TILE_LAYER = 'community_areas_vector_tile_layer';
export const GRID_CELLS_PROTECTED_AREAS_PERCENTAGE = 'grid_cells_protected_areas_percentage';
export const GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER = 'grid_cells_focal_species';
export const GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE = 'grid_cells_land_human_pressures_percentage';
export const RAISIG_AREAS_VECTOR_TILE_LAYER = 'RAISIG_areas_vector_tile_layer';

// Future places layers
export const HALF_EARTH_FUTURE_TILE_LAYER = 'WDPA_20_vector_tile_places';
export const HALF_EARTH_FUTURE_WDPA_LAYER = 'WDPA_20_feature_places';
export const HALF_EARTH_FUTURE_METADATA_SLUG = 'places-future';

// Specific regions layers
export const SPECIFIC_REGIONS_TILE_LAYER = 'specific-regions-tile';
export const SPECIFIC_REGIONS_WDPA_LAYER = 'specific-regions-wdpa-tile';

// Biodiversity facets layer. Disolved layer created by John Grayson based on MoL biodiversity facets.
export const BIODIVERSITY_FACETS_LAYER = 'biodiversity_facets';
// Dinamically created graphics layer to paint aggregated gridcells
export const GRID_LAYER = 'grid_layer';
export const COUNTRY_PRIORITY_LAYER = 'country_priority_layer';

export const LAND_COUNTRY_PRIORITY_LAYER = 'land_country_priority_layer';
export const MARINE_COUNTRY_PRIORITY_LAYER = 'marine_country_priority_layer';

// Terrestrial human pressures tiled layers.
export const MARINE_AND_LAND_HUMAN_PRESSURES = 'marine_and_land_human_pressures'
export const LAND_HUMAN_PRESSURES = 'land_human_pressures'
export const MARINE_HUMAN_PRESSURES = 'marine_human_pressures'
// Land human pressures
export const URBAN_HUMAN_PRESSURES_TILE_LAYER = 'urban_human_pressures';
export const IRRIGATED_HUMAN_PRESSURES_TILE_LAYER = 'irrigated_human_pressures';
export const RAINFED_HUMAN_PRESSURES_TILE_LAYER = 'rainfed_human_pressures';
export const RANGELAND_HUMAN_PRESSURES_TILE_LAYER = 'rangeland_human_pressures';
export const MERGED_LAND_HUMAN_PRESSURES = 'merged_land_human_pressures';
// Marine human pressures tiled layers.
export const MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER = 'marine_land_drivers_human_pressures';
export const MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER = 'marine_ocean_drivers_human_pressures';
export const COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER = 'commercial_fishing_human_pressures';
export const ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER = 'artisanal_fishing_human_pressures';
//////
export const GRAPHIC_LAYER = 'graphic_layer';
export const MASK_LAYER = 'mask-layer';
export const GLOBAL_SPI_FEATURE_LAYER = 'spi-feature-layer';
export const MARINE_SPI_FEATURE_LAYER = 'marine-spi-feature-layer';
///

export const NRC_TERRESTRIAL_SPI_DATA_LAYER = 'nrc-spi-terrestrial';
export const NRC_MARINE_SPI_DATA_LAYER = 'nrc-spi-marine';

// Label layer to display features labels (marine, terrestrial and urban).
// The scale in which they are displayed is set directly on the layer on ArcGIS online item.
export const LABELS_LAYER_GROUP = 'labels_layer_group';
export const LANDSCAPE_LABELS_LAYER = 'landscape_labels_layer';
// Basemap (added as a layer to display satellite imagery on higher zoom levels)
export const FIREFLY_BASEMAP_LAYER = 'firefly_basemap';
// Featured places layer
export const FEATURED_PLACES_LAYER = 'featured_places';
// Basemap (featured mode)
export const VIBRANT_BASEMAP_LAYER = 'Vibrant';
// Basemap (featured mode)
export const SATELLITE_BASEMAP_LAYER = 'satellite';
// Pledges layer
export const PLEDGES_LAYER = 'signed_pledges';
export const EDUCATOR_AMBASSADORS_LAYER = 'educator_ambassadors';
export const SIGNED_PLEDGE_GRAPHIC_LAYER = 'signed_pledges_graphic_layer';
// Labels for mountains and rivers
export const LANDSCAPE_FEATURES_LABELS_LAYER = 'landscape_features_labels_layer';
// human settlements labels
export const CITIES_LABELS_LAYER = 'cities_labels_layer';
// layer with countries data and borders geometries
export const COUNTRIES_LABELS_FEATURE_LAYER = 'countries_labels_layer';
export const COUNTRY_BORDERS_GRAPHIC_LAYER = 'country_borders_graphic_layer';
export const COUNTRIES_DATA_FEATURE_LAYER = 'countries_data_layer';
export const PRIORITY_PLACES_POLYGONS = 'priority_places_polygons';
export const PRIORITY_POLYGONS_GRAPHIC_LAYER = 'priority_polygons_graphic_layer';

// South Africa layers
export const AMPHIB_RARITY_1KM = 'amphib-rarity-sa';
export const AMPHIB_RICHNESS_1KM = 'amphib-rich-sa';
export const SA_DRAGONFLIES_RARITY = 'dragonflies-rare-sa';
export const SA_DRAGONFLIES_RICHNESS = 'dragonflies-rich-sa';
export const SA_BIRDS_RARITY = 'birds-rare-sa';
export const SA_BIRDS_RICHNESS = 'birds-rich-sa';
export const SA_RESTIO_RARITY = 'restio-rare-sa';
export const SA_RESTIO_RICHNESS = 'restio-rich-sa';
export const SA_PROTEA_RARITY = 'protea-rare-sa';
export const SA_PROTEA_RICHNESS = 'protea-rich-sa';
export const REPTILES_RARITY_1KM = 'reptiles-rare-sa';
export const REPTILES_RICHNESS_1KM = 'reptiles-rich-sa';

// Carbon Layer
export const CARBON_LAYER = 'carbon-layer-land';

// Global biodiversity

export const ALL_TAXA_PRIORITY = 'all-taxa-priority';
export const ALL_TAXA_RARITY = 'all-taxa-rarity';
export const ALL_TAXA_RICHNESS = 'all-taxa-richness';

export const ALL_MARINE_VERTEBRATES_PRIORITY = 'all-marine-vertebrates-priority';
export const ALL_MARINE_VERTEBRATES_RICHNESS = 'all-marine-vertebrates-richness';
export const ALL_MARINE_VERTEBRATES_RARITY = 'all-marine-vertebrates-rarity';

export const FISHES_PRIORITY = 'fishes-priority';
export const FISHES_RARITY = 'fishes-rarity';
export const FISHES_RICHNESS = 'fishes-rich';
export const MARINE_MAMMALS_PRIORITY = 'marine-mammals-priority';
export const MARINE_MAMMALS_RICHNESS = 'marine-mammals-richness';
export const MARINE_MAMMALS_RARITY = 'marine-mammals-rarity';
export const AMPHIB_RARITY = 'amphib-rarity';
export const AMPHIB_RICHNESS = 'amphib-rich';
export const AMPHIB_PRIORITY = 'amphib-priority';
export const MAMMALS_PRIORITY = 'mammals-priority';
export const MAMMALS_RARITY = 'mammals-rare';
export const MAMMALS_RICHNESS = 'mammals-rich';
export const BIRDS_PRIORITY = 'birds-priority';
export const BIRDS_RARITY = 'birds-rarity';
export const BIRDS_RICHNESS = 'birds-rich';
export const CACTI_RARITY = 'cacti-rarity';
export const CACTI_RICHNESS = 'cacti-richness';
export const CONIFERS_RARITY = 'conifers-rarity';
export const CONIFERS_RICHNESS = 'conifers-rich';
export const REPTILES_PRIORITY = 'reptiles-priority';
export const REPTILES_RARITY = 'reptiles-rarity';
export const REPTILES_RICHNESS = 'reptiles-richness';

// 1KM
export const BUTTERFLIES_RICHNESS_1KM = 'butterflies-richness-1km';
export const BUTTERFLIES_RARITY_1KM = 'butterflies-rarity-1km';
export const MAMMALS_RICHNESS_1KM = 'mammals-rare-sa';
export const SUMMER_BIRDS_RICHNESS_1KM = 'summer-birds-richness-1km';
export const WINTER_BIRDS_RICHNESS_1KM = 'winter-birds-richness-1km';
export const MAMMALS_RARITY_1KM = 'mammals-rich-sa';
export const SUMMER_BIRDS_RARITY_1KM = 'summer-birds-rarity-1km';
export const WINTER_BIRDS_RARITY_1KM = 'winter-birds-rarity-1km';


export const ANTS_RICHNESS = 'ants-richness';
export const BUTTERFLIES_RICHNESS = 'butterflies-richness';
export const ODONATES_RICHNESS = 'odonates-richness';
export const SAPINDALES_RICHNESS = 'sapindales-richness';

// Hummingbirds
export const HUMMINGBIRDS_RARITY = 'hummingbirds-rare';
export const HUMMINGBIRDS_RICHNESS = 'hummingbirds-rich';
// Species modal
export const SPECIES_LIST = 'species-list';
export const MARINE_SPECIES_LIST = 'marine-species-list';
// AOIs precalculated layers
export const ADMIN_AREAS_FEATURE_LAYER = 'admin_areas_feature_layer';
export const GADM_0_ADMIN_AREAS_FEATURE_LAYER = 'gadm-0-admin-areas-feature-layer';
export const GADM_0_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER = 'gadm-0-admin-areas-with-wdpas-feature-layer';
export const GADM_1_ADMIN_AREAS_WITH_WDPAS_FEATURE_LAYER = 'gadm-1-admin-areas-with-wdpas-feature-layer';
export const GADM_1_ADMIN_AREAS_FEATURE_LAYER = 'gadm-1-admin-areas-feature-layer';
export const WDPA_OECM_FEATURE_LAYER = 'wdpa-oecm-feature-layer';
export const WDPA_OECM_FEATURE_DATA_LAYER = 'wdpa-oecm-feature-data-layer';
export const AOIS_HISTORIC_PRODUCTION = 'aois-historic-production';
export const AOIS_HISTORIC_DEVELOPMENT = 'aois-historic-development';

// AOIs lookup tables
export const ELU_LOOKUP_TABLE = 'elu-lookup-table';
export const WDPA_LOOKUP_TABLE = 'wdpa-lookup-table';
export const AMPHIBIAN_LOOKUP = 'amphibians-lookup-table';
export const BIRDS_LOOKUP = 'birds-lookup-table';
export const MAMMALS_LOOKUP = 'mammals-lookup-table';
export const REPTILES_LOOKUP = 'reptiles-lookup-table';

// NRC Landing Layers
export const NRC_LANDING_LAYERS_SLUG = 'nrc-landing-layers';
export const EEZ_MARINE_BORDERS = 'eez-marine-borders';
