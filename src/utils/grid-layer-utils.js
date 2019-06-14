import { gridCellDefaultStyles } from 'constants/landscape-view-constants';
const { fillOpacity, outlineOpacity, outlineWidth, colorRGB } = gridCellDefaultStyles;
export const createGridCellGraphic = (Graphic) => {
  return new Graphic({
    symbol: {
      type: "polygon-3d",
      symbolLayers: [
        {
          type: "fill",
          material: { color: [...colorRGB, fillOpacity], },
          outline: {
            color: [...colorRGB, outlineOpacity],
            size: outlineWidth
          }
        }
      ]
    }
  });
}

export const createGraphicLayer = (GraphicsLayer, graphic) => {
  return new GraphicsLayer({
    id: "Grid layer",
    graphics: [graphic]
  });
}