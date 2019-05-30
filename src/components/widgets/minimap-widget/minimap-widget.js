import { loadModules } from '@esri/react-arcgis';
import React from 'react';
import MinimapWidgetComponent from './minimap-widget-component';
import { disableInteractions, minimapLayerStyles, synchronizeWebScenes } from 'utils/minimap-utils';

const MinimapWidget = props => {
  const handleMapLoad = (map, view, globeView ) => {
    map.ground.surfaceColor = '#0A212E';  // set surface color, before basemap is loaded
    disableInteractions(view); // disable all interactions on the minimap globe
    loadModules(["esri/layers/VectorTileLayer"]).then(([VectorTileLayer]) => { // load two-colors vector-tile-layer into minimap globe
      const minimapLayer = new VectorTileLayer(minimapLayerStyles);
      map.add(minimapLayer);
    });
    synchronizeWebScenes(globeView, view); // synchronize data-globe position, zoom etc. with minimap-globe
  }

  return (
    <MinimapWidgetComponent handleMapLoad={handleMapLoad} {...props}/>
  );
}

export default MinimapWidget;