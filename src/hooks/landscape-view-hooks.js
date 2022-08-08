import { loadModules } from 'esri-loader';
import { useEffect, useRef } from 'react';
import {
  isLandscapeViewOnEvent,
  isLandscapeViewOffEvent,
} from 'utils/landscape-view-manager-utils';

export function useSetLandscapeViewParam(view, zoomLevelTrigger, onZoomChange, countryISO) {
  const landscapeModeRef = useRef(false);
  useEffect(() => {
    let watcher;
    loadModules(['esri/core/watchUtils']).then(([watchUtils]) => {
      watcher = watchUtils.whenTrue(view, 'stationary', () => {
        if (isLandscapeViewOnEvent(view.zoom, zoomLevelTrigger, landscapeModeRef.current, countryISO)) {
          onZoomChange({ landscapeView: true });
          landscapeModeRef.current = true;
        } else if (isLandscapeViewOffEvent(view.zoom, zoomLevelTrigger, landscapeModeRef.current, countryISO)) {
          onZoomChange({ landscapeView: false });
          landscapeModeRef.current = false;
        }
      });
    });
    return function cleanUp() {
      watcher && watcher.remove();
    };
  }, [countryISO]);
}

export function useLandscapeViewCameraChange(view, isLandscapeMode) {
  useEffect(() => {
    const tilt = isLandscapeMode ? 55 : 0;
    const heading = 0;
    const target = { tilt, heading };
    const options = {
      speedFactor: 0.5,
      duration: 1000,
    };
    view.goTo(target, options)
      .catch((error) => {
        // Avoid displaying console errors when transition is aborted by user interacions
        if (error.name !== 'AbortError') {
          console.error(error);
        }
      });
  }, [isLandscapeMode]);
}
