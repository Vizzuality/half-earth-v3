import React from 'react';
import { connect } from 'react-redux';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import { DATA } from 'router';

import { createAction } from 'redux-tools';
import Component from './featured-globe-component.jsx';

import mapStateToProps from './featured-globe-selectors';
import * as ownActions from './featured-globe-actions.js';

const handleSwitch = createAction(DATA);

const actions = { ...ownActions, handleSwitch}

const feturedGlobeContainer = props => {
  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, props.setFeaturedGlobeSettings);
  const handleZoomChange = props.setFeaturedGlobeSettings;

  return <Component handleLayerToggle={toggleLayer} handleZoomChange={handleZoomChange} {...props}/>
}

export default connect(mapStateToProps, actions)(feturedGlobeContainer);