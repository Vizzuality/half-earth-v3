import React from 'react';
import { connect } from 'react-redux';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import Component from './data-globe-component.jsx';
import mapStateToProps from './data-globe-selectors';

import ownActions from './data-globe-actions.js';

const dataGlobeContainer = props => {
  const toggleLayer = e => layerManagerToggle(e, "data-layer-id", props.activeLayers, props.setDataGlobeSettings);
  const handleZoomChange = props.setDataGlobeSettings;
  return <Component handleLayerToggle={toggleLayer} handleZoomChange={handleZoomChange} {...props}/>
}

export default connect(mapStateToProps, ownActions)(dataGlobeContainer);