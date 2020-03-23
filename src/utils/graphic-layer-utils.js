import { loadModules } from 'esri-loader';

export const createGraphicLayer = (GraphicsLayer, graphic, id = "graphicLayer") => {
  return new GraphicsLayer({
    id: id,
    title: id,
    graphics: [graphic]
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

export const createGraphic = (Graphic, graphicStyles) => {
  return new Graphic({
    symbol: {
      type: "polygon-3d",
      symbolLayers: [
        {
          type: "fill",
          material: { color: [...graphicStyles.colorRGB, graphicStyles.fillOpacity], },
          outline: {
            color: [...graphicStyles.colorRGB, graphicStyles.outlineOpacity],
            size: graphicStyles.outlineWidth
          }
        }
      ]
    }
  });
}

export const createPolygonGeometry = (gridCell) => {
  return loadModules(["esri/geometry/Polygon"])
    .then(([Polygon]) => {
      return new Polygon(gridCell);
    }).catch(error => {
      console.error(error);
    })
}

export const simplePictureMarker = asset => ({
  type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
  url: asset
})