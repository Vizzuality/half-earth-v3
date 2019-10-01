import {
  BIODIVERSITY_FACETS_LAYER,
  LABELS_LAYER_GROUP,
  GRID_LAYER,
  PRIORITY_POLYGONS_GRAPHIC_LAYER,
  VIBRANT_BASEMAP_LAYER,
  FEATURED_PLACES_LAYER
} from 'constants/layers-slugs';

export default {
  globe: {
    activeLayers: [
      { title: BIODIVERSITY_FACETS_LAYER }, // Biodiversity Facets (new grid)
      { title: GRID_LAYER }, // This is the layer used to paint aggregated grid cells
      { title: PRIORITY_POLYGONS_GRAPHIC_LAYER }, // This is the layer used to paint priority polygons
      { title: LABELS_LAYER_GROUP }, // This is the layer used to paint aggregated grid cells
      { title: VIBRANT_BASEMAP_LAYER },
      { title: FEATURED_PLACES_LAYER }
    ],
    rasters: {},
    zoom: 1,
    center: [16.9515536, 0.116959],
    isGlobeUpdating: false
  },
  ui: {
    selectedSidebar: 'featuredMapCard',
    selectedFeaturedMap: 'bestPlaces',
    selectedTaxa: 'all',
    selectedFeaturedPlace: null,
    isFullscreenActive: false, 
  }
}