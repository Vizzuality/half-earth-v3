import { loadModules } from 'esri-loader';
import { isEqual } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { useWatchUtils } from 'hooks/esri';
import { BIODIVERSITY_FACETS_SERVICE_URL } from 'constants/layers-urls';
import { GRAPHIC_LAYER } from 'constants/layers-slugs';
import { gridCellDefaultStyles } from 'constants/landscape-view-constants';

import {
  calculateAggregatedCells,
  containedQuery,
  centerQuery,
  getCellsIDs
} from 'utils/grid-layer-utils';

import {
  createGraphic,
  createGraphicLayer,
  createPolygonGeometry
} from 'utils/graphic-layer-utils';

const GridLayer = ({ view, setGridCellData, setGridCellGeometry }) => {

  let queryHandle;
  let watchHandle;
  let watchUpdateHandle;

  const watchUtils = useWatchUtils();
  const [viewExtent, setViewExtent] = useState();
  const [biodiversityFacetsLayer, setBiodiversityFacetsLayer] = useState(null);
  const [gridCellGraphic, setGridCellGraphic] = useState(null);
  // References for cleaning up graphics
  const gridCellRef = useRef();

  const cleanUpHandles = () => {
    watchUpdateHandle && watchUpdateHandle.remove();
    watchHandle && watchHandle.remove();
    queryHandle && queryHandle.cancel();
  }

  //Create the graphics layer on mount
  useEffect(() => {
    loadModules(
      [
        "esri/Graphic",
        "esri/layers/GraphicsLayer"
      ]).then(([Graphic, GraphicsLayer]) => {
        const _gridCellGraphic = createGraphic(Graphic, gridCellDefaultStyles);
        const graphicsLayer = createGraphicLayer(GraphicsLayer, [_gridCellGraphic], GRAPHIC_LAYER);
        setGridCellGraphic(_gridCellGraphic);
        view.map.add(graphicsLayer);
      })
  }, [])

  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
      const layer = new FeatureLayer({
        url: BIODIVERSITY_FACETS_SERVICE_URL
      });
      setBiodiversityFacetsLayer(layer);
    })
  }, [])

  // set the view extent when view stationary
  useEffect(() => {
    watchHandle = watchUtils && watchUtils.whenTrue(view, "stationary", function() {
      setViewExtent(view.extent);
    })
    return function cleanUp() {
      watchHandle && watchHandle.remove();
    }
  },[watchUtils])

  useEffect(() => {
    if (viewExtent && biodiversityFacetsLayer && gridCellGraphic) {
      const containedCellsQueryObject = containedQuery(biodiversityFacetsLayer, view.extent);
      biodiversityFacetsLayer.queryFeatures(containedCellsQueryObject)
        .then(function(results) {
          const { features } = results;
          if (features.length > 0) {
            createCell(results, 'aggregatedCells');
          } else {
            const centerCellQueryObject = centerQuery(biodiversityFacetsLayer, view.center);
            biodiversityFacetsLayer.queryFeatures(centerCellQueryObject)
              .then(function(results) {
                createCell(results, 'singleCell');
              })
          }
        })
    }
  }, [biodiversityFacetsLayer, viewExtent, gridCellGraphic])

  useEffect(() => {
    return function cleanUp() {
      if (gridCellGraphic) { gridCellGraphic.geometry = null };
      cleanUpHandles();
    }
  },[gridCellGraphic])

  const addCellDataToStore = features => {
    const cellsAttributes = features.map(gc => gc.attributes);
    setGridCellData(cellsAttributes);
  }
  
  const manageCellStoreAndGeomCreation = async (features, cellsIDsArray, type) => {
    addCellDataToStore(features);
    const gridCell = type === 'aggregatedCells' ? await calculateAggregatedCells(features) : features[0].geometry;
    const gridCellGeometry = await createPolygonGeometry(gridCell);
    setGridCellGeometry(gridCellGeometry);
    if (gridCellGraphic) { gridCellGraphic.geometry = gridCellGeometry };
    gridCellRef.current = cellsIDsArray;
  }

  const createCell = (results, type) => {
    const { features } = results;
    const cellsIDsArray = getCellsIDs(results);
    if (!isEqual(gridCellRef.current, cellsIDsArray)) {
      manageCellStoreAndGeomCreation(features, cellsIDsArray, type);
    }
  }

  return null;
}

export default GridLayer;