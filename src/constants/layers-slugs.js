// Protected areas layers. Based on WDPA and RAISIG data.
export const MERGED_WDPA_VECTOR_TILE_LAYER = 'merged-protected';
export const PROTECTED_AREAS_FEATURE_LAYER = 'protected_areas_feature_layer';
export const PROTECTED_AREAS_VECTOR_TILE_LAYER = 'protected_areas_vector_tile_layer';
export const COMMUNITY_AREAS_FEATURE_LAYER = 'community_areas_feature_layer';
export const COMMUNITY_AREAS_VECTOR_TILE_LAYER = 'community_areas_vector_tile_layer';
export const RAISIG_AREAS_FEATURE_LAYER = 'RAISIG_areas_feature_layer';
export const RAISIG_AREAS_VECTOR_TILE_LAYER = 'RAISIG_areas_vector_tile_layer';
export const GRID_CELLS_PROTECTED_AREAS_PERCENTAGE = 'grid_cells_protected_areas_percentage';
export const GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER = 'grid_cells_focal_species';
export const GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE = 'grid_cells_land_human_pressures_percentage';
// Biodiversity facets layer. Disolved layer created by John Grayson based on MoL biodiversity facets.
export const BIODIVERSITY_FACETS_LAYER = 'biodiversity_facets';
// Dinamically created graphics layer to paint aggregated gridcells
export const GRID_LAYER = 'grid_layer';
export const COUNTRY_PRIORITY_LAYER = 'country_priority_layer';
// Terrestrial human pressures tiled layers.
export const MARINE_AND_LAND_HUMAN_PRESSURES = 'marine_and_land_human_pressures';
export const URBAN_HUMAN_PRESSURES_TILE_LAYER = 'urban_human_pressures';
export const IRRIGATED_HUMAN_PRESSURES_TILE_LAYER = 'irrigated_human_pressures';
export const RAINFED_HUMAN_PRESSURES_TILE_LAYER = 'rainfed_human_pressures';
export const RANGELAND_HUMAN_PRESSURES_TILE_LAYER = 'rangeland_human_pressures';
// Marine human pressures tiled layers.
export const MARINE_LAND_DRIVERS_HUMAN_PRESSURES_TILE_LAYER = 'marine_land_drivers_human_pressures';
export const MARINE_OCEAN_DRIVERS_HUMAN_PRESSURES_TILE_LAYER = 'marine_ocean_drivers_human_pressures';
export const COMMERCIAL_FISHING_HUMAN_PRESSURES_TILE_LAYER = 'commercial_fishing_human_pressures';
export const ARTISANAL_FISHING_HUMAN_PRESSURES_TILE_LAYER = 'artisanal_fishing_human_pressures';
//////
export const GRAPHIC_LAYER = 'graphic_layer';
export const COUNTRY_MASK_LAYER = 'mask-layer';
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
export const COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER = 'countries_generalized_borders_layer';
export const COUNTRY_BORDERS_GRAPHIC_LAYER = 'country_borders_graphic_layer';
export const COUNTRIES_DATA_FEATURE_LAYER = 'countries_data_layer';
export const PRIORITY_PLACES_POLYGONS = 'priority_places_polygons';
export const PRIORITY_POLYGONS_GRAPHIC_LAYER = 'priority_polygons_graphic_layer';
// South Africa layers
export const SA_AMPHIB_RARITY = 'amphib-rarity-sa';
export const SA_AMPHIB_RICHNESS = 'amphib-rich-sa';
export const SA_DRAGONFLIES_RARITY = 'dragonflies-rare-sa';
export const SA_DRAGONFLIES_RICHNESS = 'dragonflies-rich-sa';
export const SA_MAMMALS_RARITY = 'mammals-rare-sa';
export const SA_MAMMALS_RICHNESS = 'mammals-rich-sa';
export const SA_BIRDS_RARITY = 'birds-rare-sa';
export const SA_BIRDS_RICHNESS = 'birds-rich-sa';
export const SA_RESTIO_RARITY = 'restio-rare-sa';
export const SA_RESTIO_RICHNESS = 'restio-rich-sa';
export const SA_PROTEA_RARITY = 'protea-rare-sa';
export const SA_PROTEA_RICHNESS = 'protea-rich-sa';
export const SA_REPTILES_RARITY = 'reptiles-rare-sa';
export const SA_REPTILES_RICHNESS = 'reptiles-rich-sa';
// Global biodiversity

export const ALL_TAXA_PRIORITY = 'all-taxa-priority';
export const ALL_TAXA_RARITY = 'all-taxa-rarity';
export const ALL_TAXA_RICHNESS = 'all-taxa-richness';
export const AMPHIB_RARITY = 'amphib-rarity';
export const AMPHIB_RICHNESS = 'amphib-rich';
export const AMPHIB_PRIORITY = 'amphib-priority';
export const FISHES_RARITY = 'fishes-rarity';
export const FISHES_RICHNESS = 'fishes-rich';
export const FISHES_PRIORITY = 'fishes-priority';
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
export const MARINE_MAMMALS_RICHNESS = 'marine-mammals-richness';
export const MARINE_MAMMALS_RARITY = 'marine-mammals-rarity';
export const MARINE_MAMMALS_PRIORITY = 'marine-mammals-priority';
export const ALL_MARINE_VERTEBRATES_RICHNESS = 'all-marine-vertebrates-richness';
export const ALL_MARINE_VERTEBRATES_RARITY = 'all-marine-vertebrates-rarity';
export const ALL_MARINE_VERTEBRATES_PRIORITY = 'all-marine-vertebrates-priority';
// Hummingbirds
export const HUMMINGBIRDS_RARITY = 'hummingbirds-rare';
export const HUMMINGBIRDS_RICHNESS = 'hummingbirds-rich';
// Species modal
export const SPECIES_LIST = 'species-list';