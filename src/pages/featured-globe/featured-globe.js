import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import { DATA } from 'router';

import { createAction } from 'redux-tools';
import Component from './featured-globe-component.jsx';

import mapStateToProps from './featured-globe-selectors';
import * as ownActions from './featured-globe-actions.js';
import featuredMapsActions from 'redux_modules/selected-featured-map';

const handleSwitch = createAction(DATA);

const actions = { ...ownActions, ...featuredMapsActions, handleSwitch}

const feturedGlobeContainer = props => {

  useEffect(() => {
    const { setFeaturedMaps } = props;
    setFeaturedMaps()
  },[])

  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, props.setFeaturedGlobeSettings);
  const handleZoomChange = props.setFeaturedGlobeSettings;

  return <Component handleLayerToggle={toggleLayer} handleZoomChange={handleZoomChange} {...props}/>
}

export default connect(mapStateToProps, actions)(feturedGlobeContainer);