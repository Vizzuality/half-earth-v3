import Polygon from '@arcgis/core/geometry/Polygon';

export const createGraphicLayer = (
  GraphicsLayer,
  graphicsArray,
  id = 'graphicLayer'
) => {
  return new GraphicsLayer({
    id,
    title: id,
    graphics: graphicsArray,
  });
};

export const createPointGraphic = (GraphicConstructor, symbol, lon, lat) => {
  const point = {
    type: 'point',
    longitude: lon,
    latitude: lat,
  };
  return new GraphicConstructor({
    geometry: point,
    symbol,
  });
};

export const createGraphic = (Graphic, graphicStyles, geometry) => {
  const graphic = new Graphic({
    symbol: {
      type: 'polygon-3d',
      symbolLayers: [
        {
          type: 'fill',
          material: {
            color: [...graphicStyles.fillColor, graphicStyles.fillOpacity],
          },
          outline: {
            color: [
              ...graphicStyles.outlineColor,
              graphicStyles.outlineOpacity,
            ],
            size: graphicStyles.outlineWidth,
          },
        },
      ],
    },
  });

  if (geometry) {
    graphic.geometry = geometry;
  }

  return graphic;
};

export const createPolygonGeometry = (gridCell) => {
  return new Polygon(gridCell);
};

export const simplePictureMarker = (asset, symbol = {}) => ({
  type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
  url: asset,
  ...symbol,
});
