import { loadModules } from '@esri/react-arcgis';
import { isEqual } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { useWatchUtils } from 'hooks/esri';
import { BIODIVERSITY_FACETS_LAYER } from 'constants/layers-slugs';

import { createGridCellGraphic, createGraphicLayer, calculateAgregatedGridCellGeometry, cellsEquality } from 'utils/grid-layer-utils';

const GridLayer = ({map, view, setGridCellData, setGridCellGeometry, handleGlobeUpdating}) => {

  let queryHandle;
  let watchHandle;
  let watchUpdateHandle;

  const watchUtils = useWatchUtils();
  const [worker, setWorker] = useState();
  const [viewExtent, setViewExtent] = useState();
  const [gridViewLayer, setGridViewLayer] = useState(null);
  const [biodiversityFacetsLayer, setBiodiversityFacetsLayer] = useState(null);
  const [gridCellGraphic, setGridCellGraphic] = useState(null);
  // References for cleaning up graphics
  const gridCellRef = useRef();

  const cleanUpHandles = () => {
    watchUpdateHandle && watchUpdateHandle.remove();
    watchHandle && watchHandle.remove();
    queryHandle && queryHandle.cancel();
  }

  // useEffect(() => {
  //   const _worker = new Worker('workerScripts/aggregated-grid-cell.worker.js');
  //   setWorker(_worker)
  // }, [])

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
  // useEffect(() => {
  //   const { layers } = map;
  //     const gridLayer = layers.items.find(l => l.title === BIODIVERSITY_FACETS_LAYER);
  //     view.whenLayerView(gridLayer).then(function(layerView) {
  //       setGridViewLayer(layerView);
  //     })
  // }, [])

  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
      const layer = new FeatureLayer({
        url: "https://utility.arcgis.com/usrsvcs/servers/e6c05ee3ee7b45af9577904bf9238529/rest/services/Biodiversity_Facets_Dissolved/FeatureServer/0"
      });
      setBiodiversityFacetsLayer(layer);
    })
  }, [])

  useEffect(() => {
    if (biodiversityFacetsLayer) {

      const query = biodiversityFacetsLayer.createQuery();
      query.geometry = view.extent;
      query.spatialRelationship = "contains";
    
      biodiversityFacetsLayer.queryFeatures(query).then(function(results) {
        if (results.features.length > 0) {
          console.log('calculate aggregated', results)
        } else {
          console.log('find center one')
        }
      })
    }
  }, [biodiversityFacetsLayer, viewExtent])

  // set the view extent when view stationary
  useEffect(() => {
      watchHandle = watchUtils && watchUtils.whenTrue(view, "stationary", function() {
        setViewExtent(view.extent);
        //worker.postMessage(JSON.stringify({viewExtent: view.extent, type: 'multipleGridCell'}))
      })
    return function cleanUp() {
      watchHandle && watchHandle.remove();
    }
  },[watchUtils])

   // update gridcells when view extent changes
   useEffect(() => {
    handleGlobeUpdating(true);
        queryHandle = viewExtent && gridViewLayer && gridViewLayer.queryFeatures({
          geometry: viewExtent,
          spatialRelationship: 'contains',
          returnGeometry: true
        }).then(function(results) {
          handleGlobeUpdating(false);
            if(results.features.length > 0) {
              worker.postMessage(JSON.stringify({results, viewExtent, type: 'multipleGridCell'})) 
            } else {
              gridViewLayer.queryFeatures({
                geometry: view.center,
                spatialRelationship: 'contains',
                returnGeometry: true
              }).then(function(results) {
                loadModules(["esri/geometry/Polygon"]).then(([Polygon]) => {
                  const gridCellGeometry = new Polygon(results)
                  if (gridCellGraphic) { gridCellGraphic.geometry = gridCellGeometry };
                  console.log(isEqual(gridCellRef.current, results))
                  if (!isEqual(gridCellRef.current, results)) {
                    setGridCellGeometry(gridCellGeometry);
                    gridCellRef.current = results
                  }
                })
                worker.postMessage(JSON.stringify({results, type: 'singleGridCell'})) 
              })
            }
            worker.onmessage = function(e) {
              const gridCell = JSON.parse(e.data.payload);
              loadModules(["esri/geometry/Polygon"]).then(([Polygon]) => {
                const gridCellGeometry = new Polygon(gridCell)
                if (gridCellGraphic) { gridCellGraphic.geometry = gridCellGeometry };
                console.log(isEqual(gridCellRef.current, gridCell))
                if (!isEqual(gridCellRef.current, gridCell)) {
                  setGridCellGeometry(gridCellGeometry);
                  gridCellRef.current = gridCell
                }
              })
            }
        })
    return function cleanUp() {
      cleanUpHandles();
      handleGlobeUpdating(false);
    }
  }, [gridViewLayer, viewExtent, gridCellGraphic]);

  useEffect(() => {
    return function cleanUp() {
      if (gridCellGraphic) { gridCellGraphic.geometry = null };
      cleanUpHandles();
    }
  },[gridCellGraphic])

  return null;
}

export default GridLayer;