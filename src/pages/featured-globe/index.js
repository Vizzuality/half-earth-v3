import React from 'react';
import { connect } from 'react-redux';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import Component from './featured-globe-component.jsx';

import mapStateToProps from './featured-globe-selectors';
import * as ownActions from './featured-globe-actions.js';

const feturedGlobeContainer = props => {
  const toggleLayer = e => layerManagerToggle(e, "data-layer-id", props.activeLayers, props.setFeaturedGlobeSettings);
  const handleZoomChange = props.setFeaturedGlobeSettings;
  return <Component handleLayerToggle={toggleLayer} handleZoomChange={handleZoomChange} {...props}/>
}

export default connect(mapStateToProps, ownActions)(feturedGlobeContainer);