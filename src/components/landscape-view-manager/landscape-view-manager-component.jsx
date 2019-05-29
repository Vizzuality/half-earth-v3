import { loadModules } from '@esri/react-arcgis';
import { useState, useEffect, useRef } from 'react';
import { gridCellDefaultStyles } from 'constants/landscape-view-constants';
import {
  setGridCellStyles,
  setGridCellGraphic,
  paintGridCell,
  removeGridCell,
  isLandscapeViewOnEvent,
  isLandscapeViewOffEvent
} from 'utils/landscape-view-manager-utils';

const LandscapeViewManager = ({ view, map, zoomLevelTrigger, onZoomChange, query, isLandscapeMode, setGridCellData }) => {
  const [watchUtils, setWatchUtils] = useState(null);
  const [viewExtent, setViewExtent] = useState();
  // References for cleaning up graphics
  const gridCellRef = useRef();
  const landscapeModeRef = useRef();

  // Load watchUtils module from ArcGis
  useEffect(() => {
    loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
      setWatchUtils(watchUtils);
    })
  }, []);

  // Update url param
  useEffect(() => {
    const watchHandle = watchUtils && watchUtils.whenTrue(view, "stationary", function() {
      if (isLandscapeViewOnEvent(view.zoom, zoomLevelTrigger, isLandscapeMode)) {
        onZoomChange({ landscapeView: true })
        landscapeModeRef.current = true;
      } else if (isLandscapeViewOffEvent(view.zoom, zoomLevelTrigger, isLandscapeMode)) {
        onZoomChange({ landscapeView: false })
        landscapeModeRef.current = false;
      }
       else {
        landscapeModeRef.current = isLandscapeMode;
      }
    })
    return function cleanUp() {
      watchHandle && watchHandle.remove()
    }
  }, [watchUtils, isLandscapeMode, query])

  // CAMERA change effect
  useEffect(() => {
    const tilt = isLandscapeMode ? 45 : 0;
    const heading = 0;
    const target = { tilt, heading };
    const options = {
      speedFactor: 0.5,
      duration: 1000
    }
    view.goTo(target, options)
  }, [isLandscapeMode])

  // GRID data and painting effect
  useEffect(() => {
    let watchHandle;
    let queryHandle;
    loadModules(
      [
        "esri/core/watchUtils",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/geometry/geometryEngine"
      ]).then(([watchUtils, Graphic, GraphicsLayer, geometryEngine]) => {
      const { layers } = map;
      const gridLayer = layers.items.find(l => l.title === "rarity-richness-GRID");
      gridLayer.outFields = ["*"];
      view.whenLayerView(gridLayer).then(function(layerView) {
        watchHandle = watchUtils.whenTrue(view, "stationary", function() {
          if (landscapeModeRef.current) {
            const { extent } = view;
            const scaledDownExtent = extent.clone().expand(0.9);
            setViewExtent(extent);
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
              const cellData = hasContainedGridCells ? containedGridCells : singleGridCell;
              // Add data to the store
              setGridCellData(cellData);
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
          }).catch((err) => console.error(err));
          } else {
          // Remove any created gridCell polygon when not in landscape view
          removeGridCell(view, gridCellRef.current);
          }
        })
      }).catch((err) => console.error(err));
    }).catch((err) => console.error(err));
    return function cleanUp() {
      watchHandle && watchHandle.remove();
    }
  }, [landscapeModeRef, viewExtent])

  return null
}

export default LandscapeViewManager;