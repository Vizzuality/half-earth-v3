import { isEqual, flattenDeep } from 'lodash';
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

export const calculateAgregatedGridCellGeometry = (hasContainedGridCells, gridCells, geometryEngineModule) => {
  if (!gridCells.length) return null;
  return hasContainedGridCells
  ? geometryEngineModule.simplify(geometryEngineModule.union(gridCells.map(gc => gc.geometry.extent))) 
  : gridCells[0].geometry.extent;
}

export const cellsEquality = (ref, cells, hasContainedGridCells) => {
  if (!ref) return false;
  if (hasContainedGridCells) return isEqual(ref, cells);
  const refRings = flattenDeep(ref[0].geometry.rings)
  const cellRings = flattenDeep(cells[0].geometry.rings)
  return isEqual(refRings, cellRings);
}