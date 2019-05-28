// https://developers.arcgis.com/javascript/latest/sample-code/view-disable-zoom/index.html
export const disableInteractions = view => {
  view.on("key-down", function(event) {
    var prohibitedKeys = ["+", "-", "Shift", "_", "="];
    var keyPressed = event.key;
    if (prohibitedKeys.indexOf(keyPressed) !== -1) {
      event.stopPropagation();
    }
  });

  view.on("mouse-wheel", function(event) {
    event.stopPropagation();
  });

  view.on("double-click", function(event) {
    event.stopPropagation();
  });

  view.on("double-click", ["Control"], function(event) {
    event.stopPropagation();
  });

  view.on("drag", function(event) {
    event.stopPropagation();
  });

  view.on("drag", ["Shift"], function(event) {
    event.stopPropagation();
  });
  
  view.on("drag", ["Shift", "Control"], function(event) {
    event.stopPropagation();
  });
};

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