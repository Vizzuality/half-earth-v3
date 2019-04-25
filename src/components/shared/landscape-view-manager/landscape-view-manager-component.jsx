import { useState, useEffect } from 'react';

const LandscapeViewManager = ({ view, zoomLevelTrigger, onZoomChange, query, isLandscapeMode }) => {
  const [ isInteracting, setInteracting ] = useState(false);
  const [ isUpdating, setUpdating ] = useState(false);
  const [ zoomLevel, setZoomLevel ] = useState(null);

  const interactionWatcher = view.watch('interacting', function(interactionState) {
    setInteracting(interactionState)
  })

  const updateWatcher = view.watch('updating', function(interactionState) {
    setUpdating(interactionState)
  })

  const zoomWatcher = view.watch('zoom', function(zoomValue) {
    setZoomLevel(zoomValue)
  })

  useEffect(() => {
    const tilt = isLandscapeMode ? 65 : 0;
    const target = { tilt };
    const options = {
      speedFactor: 0.5,
      duration: 1000
    }
    view.goTo(target, options)

    return function cleanUp() {
      interactionWatcher.remove();
      updateWatcher.remove();
      zoomWatcher.remove();
    }
  }, [isLandscapeMode])

  
  if (!isInteracting && !isUpdating) {
    onZoomChange({ query: { ...query, landscapeView: zoomLevel >= zoomLevelTrigger }})
  }
  return null
}

export default LandscapeViewManager;