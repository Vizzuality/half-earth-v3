
// Sample code about using VectorTileLayers on the globe
// https://developers.arcgis.com/javascript/latest/sample-code/layers-vectortilelayer-json/index.html
export const minimapLayerStyles = {
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

// Sample code for views synchronization
// https://developers.arcgis.com/javascript/latest/sample-code/views-synchronize/index.html
export const synchronizeWebScenes = (globeView, minimapView) => {
  const sync = (newViewpoint, viewToSync) => {
    viewToSync.viewpoint = newViewpoint;
    viewToSync.zoom = 0;
  };
  // it returns the handler in case it needs to be removed
  return globeView.watch("viewpoint", (newViewpoint) => sync(newViewpoint, minimapView));
};
