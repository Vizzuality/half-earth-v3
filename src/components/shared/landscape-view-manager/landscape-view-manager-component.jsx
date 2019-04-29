import { useState, useEffect } from 'react';

const LandscapeViewManager = ({ view, map, zoomLevelTrigger, onZoomChange, query, isLandscapeMode }) => {
  const [ isInteracting, setInteracting ] = useState(false);
  const [ isUpdating, setUpdating ] = useState(false);
  const [ landscapeView, setLandscapeView ] = useState(false);

  const isLandscapeViewOnEvent = (zoomValue, landscapeView) => zoomValue >= zoomLevelTrigger && landscapeView === false;
  const isLandscapeViewOffEvent = (zoomValue, landscapeView) => zoomValue < zoomLevelTrigger && landscapeView === true;

  const interactionWatcher = view.watch('interacting', function(interactionState) {
    setInteracting(interactionState)
  })

  const updateWatcher = view.watch('updating', function(interactionState) {
    setUpdating(interactionState)
  })

  const zoomWatcher = view.watch('zoom', function(zoomValue) {
    if (isLandscapeViewOnEvent(zoomValue, landscapeView)) {
      setLandscapeView(true)
    } else if (isLandscapeViewOffEvent(zoomValue, landscapeView)) {
      setLandscapeView(false)
    }
  })

  useEffect(() => {
    const tilt = isLandscapeMode ? 65 : 0;
    const target = { tilt };
    const options = {
      speedFactor: 0.5,
      duration: 1000
    }
    view.goTo(target, options)

    if (isLandscapeMode) {
      const { layers } = map;
  layers.items.forEach(mapLayer => {
    if (mapLayer.type === 'feature') {
      view.whenLayerView(mapLayer).then(function(layerView) {
        console.log('LAYER VIEW',layerView)
        layerView.watch('updating', function(value) {
          console.log('updating', value)
          if (!value) {
            // wait for the layer view to finish updating
console.log(view.extent)
            // query all the features available for drawing.
            layerView
              .queryFeatures({
                geometry: view.extent,
                spatialRelationship: 'intersects'
              }).then(function(results) {
                console.log('RESULTS',results)
              })
          }
        })
      })
    }
  })
    }

    return function cleanUp() {
      interactionWatcher.remove();
      updateWatcher.remove();
      zoomWatcher.remove();
    }
  }, [isLandscapeMode])

  
  if (!isInteracting && !isUpdating) {
    onZoomChange({ query: { ...query, landscapeView: landscapeView }})
  }
  return null
}

export default LandscapeViewManager;