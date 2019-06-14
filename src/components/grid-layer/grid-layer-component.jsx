import { loadModules } from '@esri/react-arcgis';
import { useState, useEffect, useRef } from 'react';
import { isEqual } from 'lodash';
import { BIODIVERSITY_FACETS_LAYER } from 'constants/biodiversity';

import { createGridCellGraphic, createGraphicLayer } from 'utils/grid-layer-utils';

const GridLayer = ({map, view, setGridCellData, setGridCellGeometry}) => {

  let watchHandle;
  let queryHandle;
  let layerViewHandle;

  const [viewExtent, setViewExtent] = useState();
  const [gridCellGraphic, setGridCellGraphic] = useState(null);
  // References for cleaning up graphics
  const gridCellRef = useRef();

  //Create the graphics layer on mount
  useEffect(() => {
    loadModules(
      [
        "esri/Graphic",
        "esri/layers/GraphicsLayer"
      ]).then(([Graphic, GraphicsLayer]) => {
        const _gridCellGraphic = createGridCellGraphic(Graphic)
        const graphicsLayer = createGraphicLayer(GraphicsLayer, _gridCellGraphic)
        setGridCellGraphic(_gridCellGraphic)
        view.map.add(graphicsLayer);
      })
  }, [])

  // set the view extent when view stationary
  useEffect(() => {
    loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
      watchHandle = watchUtils.whenTrue(view, "stationary", function() {
        setViewExtent(view.extent)
      })
    })
    return function cleanUp() {
      watchHandle && watchHandle.remove();
    }
  },[])

   // update gridcells when view extent changes
   useEffect(() => {
    const { layers } = map;
      const gridLayer = layers.items.find(l => l.id === BIODIVERSITY_FACETS_LAYER);
      view.whenLayerView(gridLayer).then(function(layerView) {
        layerViewHandle = layerView.watch('updating', function(value) {
          if (!value) {
            const { extent } = view;
            const scaledDownExtent = extent.clone().expand(0.9);
            queryHandle = layerView.queryFeatures({
              geometry: extent,
              spatialRelationship: 'intersects'
            }).then(function(results) {
              const containedGridCells = results.features.filter(gridCell => scaledDownExtent.contains(gridCell.geometry.extent));
              const hasContainedGridCells = containedGridCells.length > 0;
              const singleGridCell = results.features.filter(gridCell => gridCell.geometry.contains(view.center));
              // If there are not a group of cells pick the one in the center
              const gridCells = hasContainedGridCells ? containedGridCells : singleGridCell;
              const gridCellsEquallity = hasContainedGridCells ? isEqual(gridCellRef.current, gridCells) : isEqual(gridCellRef.current[0].geometry.rings, gridCells[0].geometry.rings)
              // Change data on the store and paint only when grid cell chaged
              console.log(gridCellRef)
              console.log(gridCellsEquallity)
              if (!gridCellRef.current || !gridCellsEquallity) {
                // dispatch action
                setGridCellData(gridCells.map(c => c.attributes));
                loadModules(["esri/geometry/geometryEngine"])
                  .then(([geometryEngine]) => {
                    // create aggregated grid cell geometry
                    const gridCellGeometry = hasContainedGridCells
                    ? geometryEngine.simplify(geometryEngine.union(gridCells.map(gc => gc.geometry.extent))) 
                    : gridCells[0].geometry.extent;
                    // paint it
                    if (gridCellGraphic) { gridCellGraphic.geometry = gridCellGeometry }
                    setGridCellGeometry(gridCellGeometry)
                  })
              }
              gridCellRef.current = gridCells
            })
          }
        })
        if (gridCellGraphic) { gridCellGraphic.geometry = null }
      })
      return function cleanUp() {
        queryHandle && queryHandle.cancel();
        layerViewHandle && layerViewHandle.remove();
      }
  }, [viewExtent]);

  useEffect(() => {
    return function cleanUp() {
      if (gridCellGraphic) { gridCellGraphic.geometry = null }
      queryHandle && queryHandle.cancel();
      layerViewHandle && layerViewHandle.remove();
    }
  },[])

  return null;
}

export default GridLayer;