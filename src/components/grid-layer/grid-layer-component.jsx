import { loadModules } from '@esri/react-arcgis';
import { useState, useEffect, useRef } from 'react';
import { useWatchUtils } from 'hooks/esri';
import { BIODIVERSITY_FACETS_LAYER } from 'constants/biodiversity';

import { createGridCellGraphic, createGraphicLayer, calculateAgregatedGridCellGeometry, cellsEquality } from 'utils/grid-layer-utils';

const GridLayer = ({map, view, setGridCellData, setGridCellGeometry}) => {

  let queryHandle;
  let watchHandle;
  let watchUpdateHandle;

  const watchUtils = useWatchUtils();
  const [viewExtent, setViewExtent] = useState();
  const [gridViewLayer, setGridViewLayer] = useState(null);
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
        const _gridCellGraphic = createGridCellGraphic(Graphic)
        const graphicsLayer = createGraphicLayer(GraphicsLayer, _gridCellGraphic)
        setGridCellGraphic(_gridCellGraphic);
        view.map.add(graphicsLayer);
      })
  }, [])

  // store grid view layer
  useEffect(() => {
    const { layers } = map;
      const gridLayer = layers.items.find(l => l.id === BIODIVERSITY_FACETS_LAYER);
      view.whenLayerView(gridLayer).then(function(layerView) {
        setGridViewLayer(layerView);
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

   // update gridcells when view extent changes
   useEffect(() => {
        const { extent } = view;
        const scaledDownExtent = extent.clone().expand(0.9);
        watchUpdateHandle = gridViewLayer && gridViewLayer.watch('updating', function(value) {
          if (!value) {
            queryHandle && (!queryHandle.isFulfilled()) && queryHandle.cancel();
            queryHandle = gridViewLayer.queryFeatures({
              geometry: extent,
              spatialRelationship: 'intersects'
            }).then(function(results) {
              const containedGridCells = results.features.filter(gridCell => scaledDownExtent.contains(gridCell.geometry.extent));
              const hasContainedGridCells = containedGridCells.length > 0;
              const singleGridCell = results.features.filter(gridCell => gridCell.geometry.contains(view.center));
              // If there are not a group of cells pick the one in the center
              const gridCells = hasContainedGridCells ? containedGridCells : singleGridCell;
              // Change data on the store and paint only when grid cell chaged
              if (!cellsEquality(gridCellRef.current, gridCells, hasContainedGridCells)) {
                // dispatch action
                setGridCellData(gridCells.map(c => c.attributes));
                loadModules(["esri/geometry/geometryEngine"])
                .then(([geometryEngine]) => {
                  // create aggregated grid cell geometry
                  const gridCellGeometry = calculateAgregatedGridCellGeometry(hasContainedGridCells, gridCells, geometryEngine);
                  // paint it
                  if (gridCellGraphic) { gridCellGraphic.geometry = gridCellGeometry };
                  // Add it to the store
                    setGridCellGeometry(gridCellGeometry)
                  })
              }
              gridCellRef.current = gridCells;
            })
          }
        })
        return function cleanUp() {
          cleanUpHandles();
      }
  }, [gridViewLayer, viewExtent]);

  useEffect(() => {
    return function cleanUp() {
      if (gridCellGraphic) { gridCellGraphic.geometry = null };
      cleanUpHandles();
    }
  },[gridCellGraphic])

  return null;
}

export default GridLayer;