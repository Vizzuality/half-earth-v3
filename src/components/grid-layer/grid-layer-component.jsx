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

  const [viewExtent, setViewExtent] = useState();
  const [containedGridCells, setContainedGridCells] = useState(null);
  // References for cleaning up graphics
  const gridCellRef = useRef();
  const gridCellGeometryRef = useRef();

  // set the view extent when view stationary
  useEffect(() => {
    let watchHandle;
    loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
      watchUtils.whenTrue(view, "stationary", function() {
        setViewExtent(view.extent)
      })
    })
    return function cleanUp() {
      watchHandle && watchHandle.remove();
    }
  },[])

   // set contained gridcells
   useEffect(() => {
    let queryHandle;
    let layerViewHandle;
    const { layers } = map;
      const gridLayer = layers.items.find(l => l.id === BIODIVERSITY_FACETS_LAYER);
      view.whenLayerView(gridLayer).then(function(layerView) {
        layerViewHandle = layerView.watch('updating', function(value) {
          if (!value) {
            const { extent } = view;
            const scaledDownExtent = extent.clone().expand(0.9);
            queryHandle && (!queryHandle.isFulfilled()) && queryHandle.cancel();
            queryHandle = layerView.queryFeatures({
              geometry: extent,
              spatialRelationship: 'intersects'
            }).then(function(results) {
              const containedGridCells = results.features.filter(gridCell => scaledDownExtent.contains(gridCell.geometry.extent));
              setContainedGridCells(containedGridCells);
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
    let watchHandle;
    let queryHandle;
    let layerViewHandle;
    loadModules(
      [
        "esri/core/watchUtils",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/geometry/geometryEngine",
        "esri/geometry/support/webMercatorUtils"
      ]).then(([watchUtils, Graphic, GraphicsLayer, geometryEngine, webMercatorUtils]) => {
        const { layers } = map;
      const gridLayer = layers.items.find(l => l.id === BIODIVERSITY_FACETS_LAYER);
      view.whenLayerView(gridLayer).then(function(layerView) {
        watchHandle = watchUtils.whenTrue(view, "stationary", function() {
          if (containedGridCells) {
            const { extent } = view;
            const scaledDownExtent = extent.clone().expand(0.9);
            queryHandle && (!queryHandle.isFulfilled()) && queryHandle.cancel();
            queryHandle = layerView.queryFeatures({
              geometry: extent,
              spatialRelationship: 'intersects'
            }).then(function(results) {
              const containedGridCells = results.features.filter(gridCell => scaledDownExtent.contains(gridCell.geometry.extent));
              const hasContainedGridCells = containedGridCells.length > 0;
              const containedGridCellsGeometries = hasContainedGridCells && containedGridCells.map(gc => gc.geometry);
              // If there are not a group of cells pick the one in the center
              const singleGridCell = !hasContainedGridCells && results.features.filter(gridCell => gridCell.geometry.contains(view.center));
              const gridCellGeometry = hasContainedGridCells ? geometryEngine.union(containedGridCellsGeometries) : singleGridCell[0].geometry;
              const isDifferentGridCell = gridCellGeometryRef.current && isEqual(gridCellGeometryRef.current.rings, gridCellGeometry.rings) === false

              if (!gridCellGeometryRef.current || isDifferentGridCell) {
              
                
                //// AQUI ESTAMOS CREANDO EL GEOJSON Y PILLANDO LA GEODESCRIPTION (solamente deberiamos hacerlo si la geometria ha cambiado)
                const geoGeometry = webMercatorUtils.webMercatorToGeographic(gridCellGeometry);
                const geoJSON = esriGeometryToGeojson(geoGeometry);
                fetchGeoDescription(geoJSON);
                /////////////////////////////////////////////////////////////////


                /////// AQUI PILLAMOS TODAS LAS CELDAS  Y LAS ANHADIMOS AL STORE (solamente deberiamos hacerlo si la geometria ha cambiado)
                const cellData = hasContainedGridCells ? containedGridCells : singleGridCell;
                // Add data to the store
                setGridCellData(cellData);
                /////////////////////////////////////


                //////////////// AQUI BORRAMOS, PINTAMOS Y GUARDAMOS REFERENCIA (solamente deberiamos hacerlo si la geometria ha cambiado)
                // Remove current grid cell before painting a new one
                gridCellRef.current && removeGridCell(view, gridCellRef.current);
                // Create a symbol for rendering the graphic
                const { fillOpacity, outlineOpacity, outlineWidth, colorRGB } = gridCellDefaultStyles;
                const gridCellSymbol = setGridCellStyles(fillOpacity, outlineOpacity, outlineWidth, colorRGB);
                // Create the graphic
                const gridCellGraphic = setGridCellGraphic(Graphic, gridCellGeometry, gridCellSymbol);
                // Store a reference to the gridCell polygon created
                gridCellRef.current = gridCellGraphic;
                // Add it to the view
                paintGridCell(view, gridCellGraphic);
                //////////////////////////////////////////////////////
              }
              gridCellGeometryRef.current = gridCellGeometry

            

          }).catch((err) => console.error(err));
        }
        })
      }).catch((err) => console.error(err));
    }).catch((err) => console.error(err));
    return function cleanUp() {
      watchHandle && watchHandle.remove();
      layerViewHandle && layerViewHandle.remove();
    }
  }, [viewExtent, containedGridCells])

  useEffect(() => {
    return function cleanUp() {
      // remove geometry before unmounting
      removeGridCell(view, gridCellRef.current);
    }
  },[])

  return null;
}

export default GridLayer;