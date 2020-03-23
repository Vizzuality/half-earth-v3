import { loadModules } from 'esri-loader';
import { isEqual } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { useWatchUtils } from 'hooks/esri';
import { GRID_URL } from 'constants/layers-urls';
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

  let watchHandle;
  let watchUpdateHandle;

  const watchUtils = useWatchUtils();
  const [viewExtent, setViewExtent] = useState();
  const [gridLayer, setGridLayer] = useState(null);
  const [aggregatedCells, setAggregatedCells] = useState(null);
  const [singleCell, setSingleCell] = useState(null)
  const [gridCellGraphic, setGridCellGraphic] = useState(null);
  // References for cleaning up graphics
  const gridCellRef = useRef();

  const cleanUpHandles = () => {
    watchUpdateHandle && watchUpdateHandle.remove();
    watchHandle && watchHandle.remove();
  }

  //Create the graphics layer on mount
  useEffect(() => {
    loadModules(
      [
        "esri/Graphic",
        "esri/layers/GraphicsLayer"
      ]).then(([Graphic, GraphicsLayer]) => {
        const _gridCellGraphic = createGraphic(Graphic, gridCellDefaultStyles);
        const graphicsLayer = createGraphicLayer(GraphicsLayer, _gridCellGraphic, GRAPHIC_LAYER);
        setGridCellGraphic(_gridCellGraphic);
        view.map.add(graphicsLayer);
      })
  }, []);

  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
      const grid = new FeatureLayer({
        url: GRID_URL
      });
      setGridLayer(grid);
    })
  }, []);

  // set the view extent when view stationary
  useEffect(() => {
    watchHandle = watchUtils && watchUtils.whenTrue(view, "stationary", function() {
      setViewExtent(view.extent);
    })
    return function cleanUp() {
      watchHandle && watchHandle.remove();
    }
  },[watchUtils]);


  useEffect(() => {
    if (viewExtent && gridLayer && gridCellGraphic) {
      const containedQueryObject = containedQuery(gridLayer, view.extent);
      gridLayer.queryFeatures(containedQueryObject)
        .then(function(results) {
          const { features } = results;
          setAggregatedCells(features);
        });
      }
    }, [gridLayer, viewExtent, gridCellGraphic]);

  useEffect(() => {
    if (aggregatedCells && aggregatedCells.length) {
      createCell(aggregatedCells, 'aggregatedCells')
    }
  }, [aggregatedCells, gridCellGraphic]);

  useEffect(() => {
    if (aggregatedCells && !aggregatedCells.length > 0) {
      const centerCellQueryObject = centerQuery(gridLayer, view.center);
      gridLayer.queryFeatures(centerCellQueryObject)
      .then(function(results) {
        const { features } = results;
            setSingleCell(features);
        })
    }
  }, [aggregatedCells, viewExtent, gridCellGraphic]);

  useEffect(() => {
    if (singleCell) {
      createCell(singleCell, 'singleCell')
    }
  }, [singleCell, gridCellGraphic]);



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

  const createCell = (features, type) => {
    const cellsIDsArray = getCellsIDs(features);
    if (!isEqual(gridCellRef.current, cellsIDsArray)) {
      manageCellStoreAndGeomCreation(features, cellsIDsArray, type);
    }
  }

  return null;
}

export default GridLayer;