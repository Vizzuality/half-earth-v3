import React from 'react';
import Component from './protected-areas-layers-component';
import { connect } from 'react-redux';
import { layerToggleAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
import { layerManagerToggle } from 'utils/layer-manager-utils';

const actions = { layerToggleAnalyticsEvent, ...urlActions };

const ProtectedAreasLayersContainer = props => {
  const handleLayerToggle = async layerName => {
    const { activeLayers, changeGlobe, activeCategory, layerToggleAnalyticsEvent } = props;
    layerToggleAnalyticsEvent({slug:layerName});
    layerManagerToggle(layerName, activeLayers, changeGlobe, activeCategory);
  }

  return (
    <Component
      handleLayerToggle={handleLayerToggle}
      {...props}
    />
  )
}
export default connect(null, actions)(ProtectedAreasLayersContainer);