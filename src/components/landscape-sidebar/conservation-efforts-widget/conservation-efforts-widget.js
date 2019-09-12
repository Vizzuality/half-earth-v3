import React from 'react';
import { connect } from 'react-redux';
import conservationEffortsActions from 'redux_modules/conservation-efforts';
import { handleLayerRendered } from 'utils/layer-manager-utils';

import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';

import Component from './conservation-efforts-widget-component';
import mapStateToProps from './conservation-efforts-widget-selectors';

const actions = { ...conservationEffortsActions, addLayerAnalyticsEvent, removeLayerAnalyticsEvent };

const ConservationEffortsWidget = (props) => {
  const {
    map,
    activeLayers,
    view,
    handleGlobeUpdating,
    addLayerAnalyticsEvent,
    removeLayerAnalyticsEvent,
    handleLayerToggle,
    alreadyChecked
  } = props;

  const toggleLayer = (layersPassed, option) => {
    const layerNotRendered = !activeLayers.some(layer => layer.title === option.id);
  
    const layerToggled = map.layers.items.reduce((wantedLayer, currentLayer) => {
      if(currentLayer.title === option.id) return currentLayer;
      if(currentLayer.layers) return currentLayer.layers.items.find(layer => layer.title === option.id);
      return wantedLayer;
    }, null)
    
    if (layerNotRendered) {
      handleGlobeUpdating(true);
    }
  
    handleLayerToggle(option.id);
    handleLayerRendered(view, layerToggled, handleGlobeUpdating);
  
    const isLayerActive = alreadyChecked[option.value];
    if (isLayerActive) addLayerAnalyticsEvent({ slug: option.slug })
    else removeLayerAnalyticsEvent({ slug: option.slug });
  }

  return <Component {...props} toggleLayer={toggleLayer} />;
}

export default connect(mapStateToProps, actions)(ConservationEffortsWidget);