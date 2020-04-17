import { loadModules } from 'esri-loader';
import { isEqual } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { useWatchUtils } from 'hooks/esri';
import { GRAPHIC_LAYER } from 'constants/layers-slugs';
import { GRID_CELL_STYLES } from 'constants/graphic-styles';
import { TERRESTRIAL_GRID_URL, MARINE_GRID_URL } from 'constants/layers-urls';

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
  const [terrestrialGridLayer, setTerrestrialGridLayer] = useState(null);
  const [marineGridLayer, setMarineGridLayer] = useState(null);
  const [aggregatedCells, setAggregatedCells] = useState(null);
  const [singleCell, setSingleCell] = useState(null)
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
        const _gridCellGraphic = createGraphic(Graphic, GRID_CELL_STYLES);
        const graphicsLayer = createGraphicLayer(GraphicsLayer, [_gridCellGraphic], GRAPHIC_LAYER);
        setGridCellGraphic(_gridCellGraphic);
        view.map.add(graphicsLayer);
      })
  }, []);

  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
      const terrestrial = new FeatureLayer({
        url: TERRESTRIAL_GRID_URL
      });
      setTerrestrialGridLayer(terrestrial);
    })
  }, []);

  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
      const marine = new FeatureLayer({
        url: MARINE_GRID_URL
      });
      setMarineGridLayer(marine);
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
    if (viewExtent && terrestrialGridLayer && marineGridLayer && gridCellGraphic) {
      const containedTerrestrialCellsQueryObject = containedQuery(terrestrialGridLayer, view.extent);
      const containedMarineCellsQueryObject = containedQuery(marineGridLayer, view.extent);
      terrestrialGridLayer.queryFeatures(containedTerrestrialCellsQueryObject)
        .then(function(results) {
          const { features: terrestrialCells} = results;
          marineGridLayer.queryFeatures(containedMarineCellsQueryObject)
          .then(function(results) {
            const { features } = results;
            const _marineCells = features.filter(f => f.attributes.ISMARINE !== 0);
            setAggregatedCells([..._marineCells, ...terrestrialCells]);
          })
        });
      }
    }, [marineGridLayer, terrestrialGridLayer, viewExtent, gridCellGraphic]);

  useEffect(() => {
    if (aggregatedCells && aggregatedCells.length) {
      createCell(aggregatedCells, 'aggregatedCells')
    }
  }, [aggregatedCells, gridCellGraphic]);

  useEffect(() => {
    if (aggregatedCells && !aggregatedCells.length > 0) {
      const centerTerrestrialCellQueryObject = centerQuery(terrestrialGridLayer, view.center);
      const centerMarineCellQueryObject = centerQuery(marineGridLayer, view.center);
      terrestrialGridLayer.queryFeatures(centerTerrestrialCellQueryObject)
      .then(function(results) {
        const { features: terrestrialCell } = results;
          if (terrestrialCell.length > 0) {
            setSingleCell(terrestrialCell);
          } else {
            marineGridLayer.queryFeatures(centerMarineCellQueryObject)
            .then(function(results) {
              const { features: marineCell } = results;
                setSingleCell(marineCell);
              })
          }
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