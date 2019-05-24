import React from 'react';
import { connect } from 'react-redux';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import Component from './data-globe-component.jsx';
import mapStateToProps from './data-globe-selectors';

import ownActions from './data-globe-actions.js';

const handleMapLoad = (map, view) => {
  const { layers } = map;
  const gridLayer = layers.items.find(l => l.title === "rarity-richness-GRID");
  // set the outFields for the rarity-richness-GRID layer
  // to get all the attributes available
  gridLayer.outFields = ["*"];
}

const dataGlobeContainer = props => {
  const toggleLayer = e => layerManagerToggle(e, "data-layer-id", props.activeLayers, props.setDataGlobeSettings);
  const handleZoomChange = props.setDataGlobeSettings;
  return <Component handleLayerToggle={toggleLayer} handleZoomChange={handleZoomChange} onLoad={handleMapLoad} {...props}/>
}

export default connect(mapStateToProps, ownActions)(dataGlobeContainer);