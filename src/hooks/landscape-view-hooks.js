import { loadModules } from '@esri/react-arcgis';
import { useEffect, useRef } from 'react';
import {
  isLandscapeViewOnEvent,
  isLandscapeViewOffEvent
} from 'utils/landscape-view-manager-utils';

  export function useSetLandscapeViewParam(view, zoomLevelTrigger, onZoomChange) {
    const landscapeModeRef = useRef(false);
    useEffect(() => {
      loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
        watchUtils.whenTrue(view, "stationary", function() {
          if (isLandscapeViewOnEvent(view.zoom, zoomLevelTrigger, landscapeModeRef.current)) {
            onZoomChange({ landscapeView: true })
            landscapeModeRef.current = true;
          } else if (isLandscapeViewOffEvent(view.zoom, zoomLevelTrigger, landscapeModeRef.current)) {
            onZoomChange({ landscapeView: false })
            landscapeModeRef.current = false;
          }
        })
      })
    }, []);
  }

  export function useLandscapeViewCameraChange(view, isLandscapeMode) {
    useEffect(() => {
      const tilt = 55;
      const heading = 0;
      const target = { tilt, heading };
      const options = {
        speedFactor: 0.5,
        duration: 1000
      }
      view.goTo(target, options)
    }, [isLandscapeMode])
  }
