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
  centerQuery
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
    if (biodiversityFacetsLayer) {
      const containedQueryObject = containedQuery(biodiversityFacetsLayer, view.extent);

      biodiversityFacetsLayer.queryFeatures(containedQueryObject)
        .then(async function(results) {
          const { features } = results;
          if (features.length > 0) {
            const cellsAttributes = results.features.map(gc => gc.attributes);
            const cellsIDsArray = cellsAttributes.map(att => att.CELL_ID);
            if (!isEqual(gridCellRef.current, cellsIDsArray)) {
              const gridCell = await calculateAggregatedCells(features);
              const gridCellGeometry = await createCellGeometry(gridCell);
              setGridCellGeometry(gridCellGeometry);
              setGridCellData(cellsAttributes);
              if (gridCellGraphic) { gridCellGraphic.geometry = gridCellGeometry };
              gridCellRef.current = cellsIDsArray;
            }
          } else {
            const centerQueryObject = centerQuery(biodiversityFacetsLayer, view.center);
            biodiversityFacetsLayer.queryFeatures(centerQueryObject)
              .then(async function(results) {
                const gridCell = results.features[0];
                const cellsAttributes = results.features.map(gc => gc.attributes);
                const cellsIDsArray = cellsAttributes.map(att => att.CELL_ID);
                if (!isEqual(gridCellRef.current, cellsIDsArray)) {
                  const gridCellGeometry = await createCellGeometry(gridCell.geometry);
                  setGridCellGeometry(gridCellGeometry);
                  setGridCellData(cellsAttributes);
                  if (gridCellGraphic) { gridCellGraphic.geometry = gridCellGeometry };
                  gridCellRef.current = cellsIDsArray;
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

  return null;
}

export default GridLayer;