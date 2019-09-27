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

export const usePaintLayer = (layer, slug, color) => {
  useEffect(() => {
    const paintProperties = layer.getPaintProperties(slug);

    paintProperties['fill-color'] = color;
    paintProperties['fill-outline-color'] = color;

    layer.setPaintProperties(slug, paintProperties);
  }, [])
}