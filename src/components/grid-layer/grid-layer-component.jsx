import { loadModules } from '@esri/react-arcgis';
import { isEqual } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { useWatchUtils } from 'hooks/esri';

import {
  createGridCellGraphic,
  createGraphicLayer,
  calculateAggregatedCells,
  createCellGeometry,
  containedQuery,
  centerQuery,
  getCellsIDs
} from 'utils/grid-layer-utils';

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
        const _gridCellGraphic = createGridCellGraphic(Graphic);
        const graphicsLayer = createGraphicLayer(GraphicsLayer, _gridCellGraphic);
        setGridCellGraphic(_gridCellGraphic);
        view.map.add(graphicsLayer);
      })
  }, [])

  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
      const layer = new FeatureLayer({
        url: "https://utility.arcgis.com/usrsvcs/servers/e6c05ee3ee7b45af9577904bf9238529/rest/services/Biodiversity_Facets_Dissolved/FeatureServer/0"
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
    if (biodiversityFacetsLayer && gridCellGraphic) {
      const containedCellsQueryObject = containedQuery(biodiversityFacetsLayer, view.extent);
      biodiversityFacetsLayer.queryFeatures(containedCellsQueryObject)
        .then(function(results) {
          const { features } = results;
          if (features.length > 0) {
            const cellsIDsArray = getCellsIDs(results);
            if (!isEqual(gridCellRef.current, cellsIDsArray)) {
              manageCellCreation(features, cellsIDsArray, 'aggregatedCells');
            }
          } else {
            const centerCellQueryObject = centerQuery(biodiversityFacetsLayer, view.center);
            biodiversityFacetsLayer.queryFeatures(centerCellQueryObject)
              .then(function(results) {
                const { features } = results;
                const cellsIDsArray = getCellsIDs(results);
                if (!isEqual(gridCellRef.current, cellsIDsArray)) {
                  manageCellCreation(features, cellsIDsArray, 'singleCell');
                }
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
  const manageCellCreation = async (features, cellsIDsArray, type) => {
    addCellDataToStore(features);
    const gridCell = type === 'aggregatedCells' ? await calculateAggregatedCells(features) : features[0].geometry;
    const gridCellGeometry = await createCellGeometry(gridCell);
    setGridCellGeometry(gridCellGeometry);
    if (gridCellGraphic) { gridCellGraphic.geometry = gridCellGeometry };
    gridCellRef.current = cellsIDsArray;
  }

  return null;
}

export default GridLayer;