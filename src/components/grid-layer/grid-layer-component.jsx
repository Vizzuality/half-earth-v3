import { loadModules } from '@esri/react-arcgis';
import { useState, useEffect, useRef } from 'react';
import { isEqual } from 'lodash';
import { BIODIVERSITY_FACETS_LAYER } from 'constants/biodiversity';
import { gridCellDefaultStyles } from 'constants/landscape-view-constants';
import { esriGeometryToGeojson } from 'utils/geojson-parser';
import {
  setGridCellStyles,
  setGridCellGraphic,
  paintGridCell,
  removeGridCell
} from 'utils/landscape-view-manager-utils';

const GridLayer = ({map, view, setGridCellData, fetchGeoDescription}) => {

  



  let watchHandle;
  let queryHandle;
  let layerViewHandle;

  const [viewExtent, setViewExtent] = useState();
  const [containedGridCells, setContainedGridCells] = useState(null);
  const [multipleGridCell, setMultipleGridCell] = useState(null);
  const [gridCellGeometry, setGridCellGeometry] = useState(null);
  const [graphicLayer, setGraphicLayer] = useState(null);
  // References for cleaning up graphics
  const gridCellRef = useRef();
  const gridCellGraphicRef = useRef();

  //Load once the needed modules
  useState(() => {
    loadModules(
      [
        "esri/Graphic",
        "esri/layers/GraphicsLayer"
      ]).then(([Graphic, GraphicsLayer]) => {
  
        let selectionGraphic = new Graphic({
          symbol: {
            type: "polygon-3d",
            symbolLayers: [
              {
                type: "fill",
                material: { color: [0, 255, 255, 0.2] },
                outline: {
                  color: [0, 255, 255, 0.9],
                  size: "3px"
                }
              }
            ]
          }
        });

        const selectionLayer = new GraphicsLayer({
          id: "Grid layer",
          graphics: [selectionGraphic]
        });
        setGraphicLayer(selectionGraphic)
        view.map.add(selectionLayer);
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

   // set contained gridcells
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
              // If there are not a group of cells pick the one in the center
              const singleGridCell = !hasContainedGridCells && results.features.filter(gridCell => gridCell.geometry.contains(view.center));
              const gridCells = hasContainedGridCells ? containedGridCells : singleGridCell;
              const cellEquality = hasContainedGridCells ? isEqual(gridCellRef.current, gridCells) : isEqual(gridCellRef.current[0].geometry.rings, gridCells[0].geometry.rings)
              if (!gridCellRef.current || !cellEquality) {
                setMultipleGridCell(hasContainedGridCells)
                setContainedGridCells(gridCells);
              }
              gridCellRef.current = gridCells
            })
          }
        })
      })
      return function cleanUp() {
        queryHandle && queryHandle.cancel();
        layerViewHandle && layerViewHandle.remove();
      }
  }, [viewExtent]);
  
  useEffect(() => {
    loadModules(
      [
        "esri/geometry/geometryEngine",
        "esri/geometry/support/webMercatorUtils"
      ]).then(([geometryEngine, webMercatorUtils]) => {

        const gridCellGeometry = multipleGridCell ? geometryEngine.simplify(geometryEngine.union(containedGridCells.map(gc => gc.geometry.extent))) : containedGridCells[0].geometry.extent;
        setGridCellGeometry(gridCellGeometry)
          //// AQUI ESTAMOS CREANDO EL GEOJSON Y PILLANDO LA GEODESCRIPTION (solamente deberiamos hacerlo si la geometria ha cambiado)
          const geoGeometry = webMercatorUtils.webMercatorToGeographic(gridCellGeometry);
          const geoJSON = esriGeometryToGeojson(geoGeometry);
          fetchGeoDescription(geoJSON);
          /////////////////////////////////////////////////////////////////
          
          
          /////// AQUI PILLAMOS TODAS LAS CELDAS  Y LAS ANHADIMOS AL STORE (solamente deberiamos hacerlo si la geometria ha cambiado)
          // const cellData = hasContainedGridCells ? containedGridCells : singleGridCell;
          // Add data to the store
          setGridCellData(containedGridCells);
          /////////////////////////////////////
    }).catch((err) => console.error(err));
  }, [containedGridCells])

  useEffect(() => {
    console.log(graphicLayer)
    if (graphicLayer) {
      graphicLayer.geometry = gridCellGeometry;
     }

  }, [gridCellGeometry])

  useEffect(() => {
    return function cleanUp() {
      removeGridCell(view, gridCellGraphicRef.current);
      queryHandle && queryHandle.cancel();
      layerViewHandle && layerViewHandle.remove();
    }
  },[])

  return null;
}

export default GridLayer;