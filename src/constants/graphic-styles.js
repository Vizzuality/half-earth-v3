export const MASK_STYLES = {
  fillColor: [0, 0, 0],
  fillOpacity: 0.7,
  outlineColor: [147, 255, 95],
  outlineOpacity: 0.9,
  outlineWidth: 1,
}

export const BORDERS_OPACITY = 0.3;

export const BORDERS_LAYERS_RENDERER = {
  type: 'simple',
  symbol: {
    type: 'simple-fill',
    color: [0, 0, 0, 0],
    outline: {
      color: [216, 216, 216, BORDERS_OPACITY],
      width: '1px'
    }
  }
}

export const COUNTRY_BORDER_STYLES = {
  fillColor: [15, 43, 59],
  fillOpacity: 0,
  outlineColor: [216, 216, 216],
  outlineOpacity: 1,
  outlineWidth: 1
}

export const GRID_CELL_STYLES = {
  fillColor: [147, 255, 95],
  fillOpacity: 0,
  outlineColor: [147, 255, 95],
  outlineOpacity: 0.9,
  outlineWidth: 2,
}

export const MINIMAP_EXTENT_GRAPHIC_STYLES = {
  fillColor: [0, 0, 0],
  fillOpacity: 0.3,
  outlineColor: [24, 186, 180],
  outlineOpacity: 0.9,
  outlineWidth: 4,
}

// Sample code about using VectorTileLayers on the globe
// https://developers.arcgis.com/javascript/latest/sample-code/layers-vectortilelayer-json/index.html
export const MINIMAP_BASE_LAYER_STYLES = {
  style: {
    layers: [
      {
        layout: {},
        paint: {
          "fill-color": "#7C95AA"
        },
        source: "esri",
        minzoom: 0,
        "source-layer": "Land",
        type: "fill",
        id: "Land/0"
      },
      {
        layout: {},
        paint: {
          "fill-color": "#0A212E"
        },
        source: "esri",
        minzoom: 0,
        "source-layer": "Marine area",
        type: "fill",
        id: "Marine area/1"
      },
    ],
    glyphs:
      "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/resources/fonts/{fontstack}/{range}.pbf",
    version: 8,
    sprite:
      "https://www.arcgis.com/sharing/rest/content/items/7675d44bb1e4428aa2c30a9b68f97822/resources/sprites/sprite",
    sources: {
      esri: {
        url:
          "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer",
        type: "vector"
      }
    } 
  }
};