import React from 'react';
import { connect } from 'react-redux';


import { PLEDGES_LAYER, SIGNED_PLEDGE_GRAPHIC_LAYER } from 'constants/layers-slugs';
import { PLEDGES_LAYER_URL } from 'constants/layers-urls';
import { layersConfig } from 'constants/mol-layers-configs';
import { createLayer, addLayerToMap, handleLayerCreation } from 'utils/layer-manager-utils';

import Component from './map-iframe-component.jsx';
import mapStateToProps from './map-iframe-selectors';
import pledgeLightIcon from 'icons/pledge.svg'

import ownActions from './map-iframe-actions.js';
const actions = { ...ownActions };



const handleMapLoad = (map, activeLayers) => {

  const biodiversityLayerIDs = activeLayers
    //.filter(({ category }) => category === "Biodiversity")
    .map(({ title }) => title);

  biodiversityLayerIDs.forEach(layerName => {
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