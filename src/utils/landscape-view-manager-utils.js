export const setGridCellStyles = (fillOpacity, outlineOpacity, outlineWidth, colorRGB = [24, 186, 180]) => {
  return (
    {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: [...colorRGB, fillOpacity],
      outline: { // autocasts as new SimpleLineSymbol()
        color: [...colorRGB, outlineOpacity],
        width: outlineWidth
      }
    }
  )
};

export const setGridCellGraphic = (Graphic, geometry, symbol) => {
  return new Graphic({
    geometry,
    symbol
  });
}

export const paintGridCell = (view, graphic) => view.graphics.add(graphic)
export const removeGridCell = (view, graphic) => view.graphics.remove(graphic)
export const isLandscapeViewOnEvent = (zoomValue, zoomLevelTrigger, landscapeView) => zoomValue >= zoomLevelTrigger && !landscapeView;
export const isLandscapeViewOffEvent = (zoomValue, zoomLevelTrigger, landscapeView) => zoomValue < zoomLevelTrigger && landscapeView;