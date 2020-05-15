import React from 'react';
import { connect } from 'react-redux';
import { layersConfig } from 'constants/mol-layers-configs';
import { createLayer, addLayerToMap } from 'utils/layer-manager-utils';

import Component from './map-iframe-component.jsx';
import mapStateToProps from './map-iframe-selectors';

import ownActions from './map-iframe-actions.js';
const actions = { ...ownActions };



const handleMapLoad = (map, activeLayers) => {
  activeLayers
    .map(({ title }) => title)
    .forEach(layerName => {
      const layerConfig = layersConfig[layerName];
      const newLayer = createLayer(layerConfig);
      addLayerToMap(newLayer, map);
    });
}


const dataGlobeContainer = props => {
  const { activeLayers } = props;
  const handleGlobeParamsUpdate = props.setDataGlobeSettings;

  return <Component
    handleZoomChange={handleGlobeParamsUpdate}
    handlePostRobotUpdates={handleGlobeParamsUpdate}
    onLoad={(map, view) => handleMapLoad(map, activeLayers)}
    {...props}/>
}

export default connect(mapStateToProps, actions)(dataGlobeContainer);