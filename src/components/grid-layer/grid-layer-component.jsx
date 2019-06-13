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
  // const [geometryEngineModule, setGeometryEngineModule] = useState(null);
  const [multipleGridCell, setMultipleGridCell] = useState(null);
  // References for cleaning up graphics
  const gridCellRef = useRef();
  const gridCellGeometryRef = useRef();
  const gridCellGraphicRef = useRef();

  // //
  // useEffect(()=> {
  //   loadModules(["esri/geometry/geometryEngine"]).then(([geometryEngine]) => {
  //     setGeometryEngineModule(geometryEngine)
  //   })
  // }, [])

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
              const hasContainedGridCells = containedGridCells.length > 0;
              // If there are not a group of cells pick the one in the center
              const singleGridCell = !hasContainedGridCells && results.features.filter(gridCell => gridCell.geometry.contains(view.center));
              const gridCells = hasContainedGridCells ? containedGridCells : singleGridCell;
              if (!gridCellRef.current || !isEqual(gridCellRef.current[0], gridCells)) {
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
        "esri/Graphic",
        "esri/geometry/geometryEngine",
        "esri/layers/GraphicsLayer",
        "esri/geometry/support/webMercatorUtils"
      ]).then(([Graphic, geometryEngine, GraphicsLayer, webMercatorUtils]) => {
        const gridCellGeometry = multipleGridCell ? geometryEngine.union(containedGridCells.map(gc => gc.geometry)) : containedGridCells[0].geometry;
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
          
          
          //////////////// AQUI BORRAMOS, PINTAMOS Y GUARDAMOS REFERENCIA (solamente deberiamos hacerlo si la geometria ha cambiado)
          // Remove current grid cell before painting a new one
          console.log('REMOVING', gridCellGraphicRef.current)
          gridCellGraphicRef.current && removeGridCell(view, gridCellGraphicRef.current);
          // Create a symbol for rendering the graphic
          const { fillOpacity, outlineOpacity, outlineWidth, colorRGB } = gridCellDefaultStyles;
          const gridCellSymbol = setGridCellStyles(fillOpacity, outlineOpacity, outlineWidth, colorRGB);
          // Create the graphic
          const gridCellGraphic = setGridCellGraphic(Graphic, gridCellGeometry, gridCellSymbol);
          // Store a reference to the gridCell polygon created
          gridCellGraphicRef.current = gridCellGraphic;
          // Add it to the view
          console.log('PAINTING', gridCellGraphic)
                paintGridCell(view, gridCellGraphic);
    }).catch((err) => console.error(err));
    // return function cleanUp() {
    //   console.log('CLEANING UP', gridCellGraphicRef.current)
    //   removeGridCell(view, gridCellGraphicRef.current);
    // }
  }, [containedGridCells])

  useEffect(() => {
    return function cleanUp() {
      // remove geometry before unmounting
      removeGridCell(view, gridCellGraphicRef.current);
    }
  },[])

  return null;
}

export default GridLayer;