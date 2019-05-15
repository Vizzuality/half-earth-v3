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

const LandscapeViewManager = ({ view, map, zoomLevelTrigger, onZoomChange, query, isLandscapeMode }) => {
  const [watchUtils, setWatchUtils] = useState(null);
  const [viewExtent, setViewExtent] = useState();
  // References for cleaning up graphics
  const gridCellsGraphicRef = useRef();
  const gridCellsLayerRef = useRef();
  const landscapeModeRef = useRef()


  // Load watchUtils module from ArcGis
  useEffect(() => {
    loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
      setWatchUtils(watchUtils);
    })
  }, []);

  // Create graphics layer to store grid cells graphics
  useEffect(() => {
    if (isLandscapeMode) {
      const {colorRGB, outlineOpacity, outlineWidth} = gridCellDefaultStyles;
      loadModules(["esri/Graphic", "esri/layers/GraphicsLayer"]).then(([Graphic, GraphicsLayer]) => {
        const graphic= new Graphic({
          symbol: {
            type: "polygon-3d",
            symbolLayers: [
              {
                type: "fill",
                material: { color: [0, 255, 255, 0] },
                outline: {
                  color: [...colorRGB, outlineOpacity],
                  size: outlineWidth
                }
              }
            ]
          },
          geometry: gridCellsGraphicRef.current || null
        });
        gridCellsLayerRef.current = new GraphicsLayer({
          title: "Selection Layer",
          graphics: [graphic]
        });
        view.map.add(gridCellsLayerRef.current);
      })
    } else {
      view.map.remove(gridCellsLayerRef.current);
    }
    return function cleanUp() {
      view.map.remove(gridCellsLayerRef.current);
      gridCellsGraphicRef.current = null;
    }
  }, [isLandscapeMode, gridCellsGraphicRef.current]);

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
    let queryHandle;
    let selectionGraphic;
    let selectionLayer;
    loadModules(["esri/core/watchUtils", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/geometry/geometryEngine"]).then(([watchUtils, Graphic, GraphicsLayer, geometryEngine]) => {
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
                geometry: scaledDownExtent,
                spatialRelationship: 'intersects'
              }).then(function(results) {
                const containedGridCells = results.features.filter(gridCell => scaledDownExtent.contains(gridCell.geometry.extent));
                // const containedData = containedGridCells.reduce((acc, current) => {
                //   return {
                //     ...acc,
                //     [current.attributes.CELL_ID]: {
                //       CELL_DATA: {
                //         RAINFED: current.attributes.RAINFED,
                //         URBAN: current.attributes.URBAN,
                //         AGRICULTUR: current.attributes.AGRICULTUR,
                //         Shape__Area: current.attributes.Shape__Area,
                //         PROP_LAND: current.attributes.PROP_LAND,
                //         ISISLAND: current.attributes.ISISLAND
                //       },
                //       ...acc[current.attributes.CELL_ID],
                //       [current.attributes.TAXA]: {
                //         AVE_RSR_PC: current.attributes.AVE_RSR_PC,
                //         SR_PC: current.attributes.SR_PC,
                //         FOCAL_SPP: current.attributes.FOCAL_SPP
                //       }
                //     }
                //   }
                // }, {})
                // console.log(containedData)
                const containedGridCellsGeometries = containedGridCells && containedGridCells.map(gc => gc.geometry.extent)
                gridCellsGraphicRef.current = geometryEngine.union(containedGridCellsGeometries);
            }).catch((err) => console.error(err));
           } else {
            // Remove any created gridCell polygon when not in landscape view
            // selectionGraphic.geometry = null;
            // removeGridCell(view, gridCellRef.current);
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