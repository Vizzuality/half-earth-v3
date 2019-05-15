export const setGridCellStyles = (outlineOpacity, outlineWidth, colorRGB = [24, 186, 180]) => {
  return (
    {
      // type: "polygon-3d",
      // symbolLayers: [
      //   {
      //     type: "fill",
      //     material: { color: [0, 255, 255, 0.2] },
      //     outline: {
      //       color: [...colorRGB, outlineOpacity],
      //       size: outlineWidth
      //     }
      //   }
      // ]
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: [...colorRGB, 1],
      outline: { // autocasts as new SimpleLineSymbol()
        color: [...colorRGB, outlineOpacity],
        width: outlineWidth
      }
    }
  )
};

export const setGridCellGraphic = (Graphic, symbol) => {
  return new Graphic({
    symbol
  });
}

export const setAggregatedCellsLayer = (GraphicsLayer, gridCellGraphic) => {
  return new GraphicsLayer({
    title: "Aggregated grid cells",
    graphics: [gridCellGraphic]
  });
}

export const paintGridCell = (view, graphic) => view.graphics.add(graphic)
export const removeGridCell = (view, graphic) => view.graphics.remove(graphic)
export const isLandscapeViewOnEvent = (zoomValue, zoomLevelTrigger, landscapeView) => zoomValue >= zoomLevelTrigger && !landscapeView;
export const isLandscapeViewOffEvent = (zoomValue, zoomLevelTrigger, landscapeView) => zoomValue < zoomLevelTrigger && landscapeView;