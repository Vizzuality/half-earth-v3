import { loadModules } from 'esri-loader';
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
    id: "grid_layer",
    title: "grid_layer",
    graphics: [graphic]
  });
}

export const calculateAgregatedGridCellGeometry = (hasContainedGridCells, gridCells, geometryEngineModule) => {
  if (!gridCells.length) return null;
  return hasContainedGridCells
  ? geometryEngineModule.simplify(geometryEngineModule.union(gridCells.map(gc => gc.geometry.extent))) 
  : gridCells[0].geometry;
}

export const cellsEquality = (ref, cells, hasContainedGridCells) => {
  if (!ref) return false;
  if (hasContainedGridCells) return isEqual(ref, cells);
  const refId = flattenDeep(ref[0].attributes.CELL_ID)
  const cellId = flattenDeep(cells[0].attributes.CELL_ID)
  return isEqual(refId, cellId);
}

export const calculateAggregatedCells = (features) => {
  return loadModules(["esri/geometry/geometryEngine"])
    .then(([geometryEngine]) => {
      return geometryEngine.union(features.map(gc => gc.geometry));
    }).catch(error => {
      console.error(error);
    })
}

export const createCellGeometry = (gridCell) => {
  return loadModules(["esri/geometry/Polygon"])
    .then(([Polygon]) => {
      return new Polygon(gridCell);
    }).catch(error => {
      console.error(error);
    })
}

export const containedQuery = (layer, extent) => {
  const scaledDownExtent = extent.clone().expand(0.9);
  const query = layer.createQuery();
  query.geometry = scaledDownExtent;
  query.spatialRelationship = "contains";
  return query;
}

export const centerQuery = (layer, center) => {
  const query = layer.createQuery();
  query.geometry = center;
  query.spatialRelationship = "within";
  return query;
}

export const getCellsAttributes = features => features.map(gc => gc.attributes);
export const getCellsIDs = results => results.features.map(gc => gc.attributes.CELL_ID);