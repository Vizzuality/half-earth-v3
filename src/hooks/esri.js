import { loadModules } from '@esri/react-arcgis';
import { useState, useEffect } from 'react';

// Load watchUtils module to follow esri map changes
export const useWatchUtils = () => {
  const [watchUtils, setWatchUtils] = useState(null);
  useEffect(() => {
    loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
      setWatchUtils(watchUtils);
    })
  }, []);
  return watchUtils;
}