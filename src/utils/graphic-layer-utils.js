import { loadModules } from 'esri-loader';

export const createGraphicLayer = (GraphicsLayer, graphicsArray, id = "graphicLayer") => {
  return new GraphicsLayer({
    id: id,
    title: id,
    graphics: graphicsArray
  });
}

export const createPointGraphic = (GraphicConstructor, symbol, lon, lat) => {
  var point = {
    type: "point",
    longitude: lon,
    latitude: lat
  };
  return new GraphicConstructor({
    geometry: point,
    symbol: symbol
  });
}

export const createGraphic = (Graphic, graphicStyles, geometry) => {
  const graphic = new Graphic({
    symbol: {
      type: "polygon-3d",
      symbolLayers: [
        {
          type: "fill",
          material: { color: [...graphicStyles.fillColor, graphicStyles.fillOpacity], },
          outline: {
            color: [...graphicStyles.outlineColor, graphicStyles.outlineOpacity],
            size: graphicStyles.outlineWidth
          }
        }
      ]
    }
  });

  if (geometry) {
    graphic.geometry = geometry;
  }

  return graphic;
}

export const createPolygonGeometry = (gridCell) => {
  return loadModules(["esri/geometry/Polygon"])
    .then(([Polygon]) => {
      return new Polygon(gridCell);
    }).catch(error => {
      console.error(error);
    })
}

export const simplePictureMarker = (asset, symbol = {}) => ({
  type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
  url: asset,
  ...symbol
})