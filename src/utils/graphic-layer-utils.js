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

export const simplePictureMarker = asset => ({
  type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
  url: asset
})