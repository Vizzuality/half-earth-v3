import React from 'react';
import Component from './component.jsx';
import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';
import { layersConfig } from 'constants/mol-layers-configs';
import { FIREFLY_BASEMAP_LAYER, SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';


const AoiSceneContainer = (props) => {
  const { activeLayers } = props;
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({map, layersArray: [SATELLITE_BASEMAP_LAYER, FIREFLY_BASEMAP_LAYER]});
    activateLayersOnLoad(map, activeLayers, layersConfig);
  }

  return (
    <Component
      onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      {...props}
    />
  )
}

export default AoiSceneContainer;