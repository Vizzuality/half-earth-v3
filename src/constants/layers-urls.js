import {
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER,
  VIBRANT_BASEMAP_LAYER,
  PRIORITY_PLACES_POLYGONS,
  PROTECTED_AREAS_FEATURE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_FEATURE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  RAISIG_AREAS_FEATURE_LAYER,
  RAISIG_AREAS_VECTOR_TILE_LAYER,
  GRID_CELLS_PROTECTED_AREAS_PERCENTAGE,
  GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER,
  FEATURED_PLACES_LAYER,
  LAND_HUMAN_PRESSURES_IMAGE_LAYER,
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
  AMPHIB_RARITY,
  AMPHIB_RICHNESS,
  FISHES_RARITY,
  FISHES_RICHNESS,
  MAMMALS_RARITY,
  MAMMALS_RICHNESS,
  BIRDS_RARITY,
  BIRDS_RICHNESS,
  ALL_TAXA_RARITY,
  ALL_TAXA_RICHNESS,
  TURTLES_RARITY,
  TURTLES_RICHNESS,
  CACTI_RARITY,
  CACTI_RICHNESS,
  CONIFERS_RARITY,
  CONIFERS_RICHNESS,
  HUMMINGBIRDS_RARITY,
  HUMMINGBIRDS_RICHNESS
} from 'constants/layers-slugs'

const bucketUrl = "https://storage.googleapis.com/cdn.mol.org/half-earth/tiles/phase2";
const templatePattern = "{level}/{col}/{row}";

export const TERRESTRIAL_GRID_URL = "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Global_Terrestrial_Species_Richness_and_Rarity_Patterns_for_Select_Taxa/FeatureServer";
export const MARINE_GRID_URL = "https://utility.arcgis.com/usrsvcs/servers/e6c05ee3ee7b45af9577904bf9238529/rest/services/Biodiversity_Facets_Dissolved/FeatureServer/0";
export const PLEDGES_LAYER_URL = "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/PledgeLocationsURL/FeatureServer";


export const LAYERS_URLS = {
  [LANDSCAPE_FEATURES_LABELS_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/LandscapeUniqueRivers/FeatureServer',
  [CITIES_LABELS_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/CityLabels/FeatureServer',
  [VIBRANT_BASEMAP_LAYER]: 'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/Vibrant/MapServer',
  [PRIORITY_PLACES_POLYGONS]: 'https://utility.arcgis.com/usrsvcs/servers/685d69cda038469f93dcfd96355abefc/rest/services/PriorPolygons/FeatureServer',
  [FEATURED_PLACES_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Bioplaces/FeatureServer',
  [PROTECTED_AREAS_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/Protected_areas_FL/FeatureServer',
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Protected_areas/VectorTileServer',
  [COMMUNITY_AREAS_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/community_based_FL/FeatureServer',
  [COMMUNITY_AREAS_VECTOR_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/community_based/VectorTileServer',
  [RAISIG_AREAS_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/RAISG_Tls/FeatureServer',
  [RAISIG_AREAS_VECTOR_TILE_LAYER]: 'https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/Territorios_Ind%C3%ADgenas_RAISG/VectorTileServer',
  [GRID_CELLS_PROTECTED_AREAS_PERCENTAGE]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ConsProp/FeatureServer',
  [GRID_CELLS_FOCAL_SPECIES_FEATURE_LAYER]: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/TerrestrialVertebrateSpeciesSHP/FeatureServer',
  [LAND_HUMAN_PRESSURES_IMAGE_LAYER]: 'https://utility.arcgis.com/usrsvcs/servers/f52a6e023d1242e7ad97b2b67495af7b/rest/services/HumanImpact/Human_Impact/ImageServer',
  [SA_AMPHIB_RARITY]: `${bucketUrl}/rarity_1km/amphibians/${templatePattern}` ,
  [SA_AMPHIB_RICHNESS]: `${bucketUrl}/richness_1km/amphibians/${templatePattern}` ,
  [SA_DRAGONFLIES_RARITY]: `${bucketUrl}/rarity_1km/dragonflies/${templatePattern}` ,
  [SA_DRAGONFLIES_RICHNESS]: `${bucketUrl}/richness_1km/dragonflies/${templatePattern}` ,
  [SA_MAMMALS_RARITY]: `${bucketUrl}/rarity_1km/mammals/${templatePattern}` ,
  [SA_MAMMALS_RICHNESS]: `${bucketUrl}/richness_1km/mammals/${templatePattern}` ,
  [SA_BIRDS_RARITY]: `${bucketUrl}/rarity_1km/birds/${templatePattern}` ,
  [SA_BIRDS_RICHNESS]: `${bucketUrl}/richness_1km/birds/${templatePattern}` ,
  [SA_RESTIO_RARITY]: `${bucketUrl}/rarity_1km/restio/${templatePattern}` ,
  [SA_RESTIO_RICHNESS]: `${bucketUrl}/richness_1km/restio/${templatePattern}` ,
  [SA_PROTEA_RARITY]: `${bucketUrl}/rarity_1km/protea/${templatePattern}` ,
  [SA_PROTEA_RICHNESS]: `${bucketUrl}/richness_1km/protea/${templatePattern}` ,
  [SA_REPTILES_RARITY]: `${bucketUrl}/rarity_1km/reptiles/${templatePattern}` ,
  [SA_REPTILES_RICHNESS]: `${bucketUrl}/richness_1km/reptiles/${templatePattern}` ,
  [HUMMINGBIRDS_RARITY]: `${bucketUrl}/rarity_1km/hummingbirds/${templatePattern}` ,
  [HUMMINGBIRDS_RICHNESS]: `${bucketUrl}/richness_1km/hummingbirds/${templatePattern}`,
  [FISHES_RARITY]: `${bucketUrl}/rarity/fishes/${templatePattern}` ,
  [FISHES_RICHNESS]: `${bucketUrl}/richness/fishes/${templatePattern}` ,
  [AMPHIB_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/ad01787b2880446c8ed7acb75735fcba/rest/services/amphibians_rarity/MapServer` ,
  [AMPHIB_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/58e9d41955c74788bac974a48540ed23/rest/services/amphibians_richness/MapServer` ,
  [MAMMALS_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/31951614b11c472f8e327971008d23b2/rest/services/mammals_rarity/MapServer` ,
  [MAMMALS_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/11f7eef1d863487091afeade6ed6d918/rest/services/mammals_richness/MapServer` ,
  [BIRDS_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/bf99f1090e2b4bf0853046740fda247a/rest/services/birds_rarity/MapServer` ,
  [BIRDS_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/68ce2c44f8884a12b6908f2a740e87ae/rest/services/birds_richness/MapServer` ,
  [ALL_TAXA_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/1ee94bc415424bde91750ce703b2d8d6/rest/services/all_rarity/MapServer` ,
  [ALL_TAXA_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/55838e61c7854915bb62238f2f02710f/rest/services/all_richness/MapServer` ,
  [TURTLES_RARITY]: `${bucketUrl}/rarity/turtles/${templatePattern}` ,
  [TURTLES_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/c201113280834a9ea7b0a15639e5aaa1/rest/services/turtles_richness/MapServer` ,
  [CACTI_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/87ba75119feb4ddba8f2eff9f8cbf84c/rest/services/cacti_rarity/MapServer` ,
  [CACTI_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/ea83c6a422c64614b3b8e129bd454416/rest/services/cati_richness/MapServer` ,
  [CONIFERS_RARITY]: `https://utility.arcgis.com/usrsvcs/servers/853e83b25f77402981e5c83ad43a2bc3/rest/services/conifers_rarity/MapServer` ,
  [CONIFERS_RICHNESS]: `https://utility.arcgis.com/usrsvcs/servers/a7355a715e09458caabdcc904b02da36/rest/services/conifers_richness/MapServer` ,
}