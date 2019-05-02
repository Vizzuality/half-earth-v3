import { loadModules } from '@esri/react-arcgis';
import { useState, useEffect, useRef } from 'react';
import { setGridCellStyles, setGridCellGraphic, paintGridCell, removeGridCell, isLandscapeViewOnEvent, isLandscapeViewOffEvent } from 'utils/landscape-view-manager-utils';

const LandscapeViewManager = ({ view, map, zoomLevelTrigger, onZoomChange, query, isLandscapeMode }) => {
  const [watchUtils, setWatchUtils] = useState(null);
  const [viewExtent, setViewExtent] = useState();
  // References for cleaning up graphics
  const gridCellRef = useRef();
  const landscapeModeRef = useRef()


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
        onZoomChange({ query: { ...query, landscapeView: true }})
        landscapeModeRef.current = true;
      } else if (isLandscapeViewOffEvent(view.zoom, zoomLevelTrigger, isLandscapeMode)) {
        onZoomChange({ query: { ...query, landscapeView: false }})
        landscapeModeRef.current = false;
      }
    })
    return function cleanUp() {
      watchHandle && watchHandle.remove()
    }
  }, [watchUtils, isLandscapeMode, query])

  // CAMERA change effect
  useEffect(() => {
    const tilt = isLandscapeMode ? 45 : 0;
    const target = { tilt };
    const options = {
      speedFactor: 0.5,
      duration: 1000
    }
    view.goTo(target, options)
  }, [isLandscapeMode])

  // GRID data and painting effect
  useEffect(() => {
    let watchHandle;
    loadModules(["esri/core/watchUtils", "esri/Graphic", "esri/geometry/geometryEngineAsync"]).then(([watchUtils, Graphic, geometryEngineAsync]) => {
      const { layers } = map;
      const gridLayer = layers.items.find(l => l.title === "Birds Rarity");
        view.whenLayerView(gridLayer).then(function(layerView) {
          watchHandle = watchUtils.whenTrue(view, "stationary", function() {
            if (landscapeModeRef.current) {
              const { extent } = view;
              setViewExtent(extent);
              layerView.queryFeatures({
                geometry: extent,
                spatialRelationship: 'intersects'
              }).then(function(results) {
                const containedGridCells = results.features.filter(gridCell => extent.contains(gridCell.geometry.extent)).map(gc => gc.geometry)
                console.log('NUMBER OF GRID CELLS PAINTED', containedGridCells.length)
                containedGridCells && geometryEngineAsync.union(containedGridCells).then(result => {
                  removeGridCell(view, gridCellRef.current);
                  // Create a symbol for rendering the graphic
                  const gridCellSymbol = setGridCellStyles(0.1, 0.9, 2, [24, 186, 180]);
                  // Create the graphic
                  const gridCellGraphic = setGridCellGraphic(Graphic, result, gridCellSymbol);
                  // Store a reference to the gridCell polygon created
                  gridCellRef.current = gridCellGraphic;
                  // Add it to the view
                  paintGridCell(view, gridCellGraphic);
              }).catch((err) => console.error(err));
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