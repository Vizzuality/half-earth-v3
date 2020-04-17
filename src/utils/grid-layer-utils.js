import { loadModules } from 'esri-loader';
import { isEqual, flattenDeep } from 'lodash';

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
export const getCellsIDs = features => features.map(gc => gc.attributes.CELL_ID || gc.attributes.ID);