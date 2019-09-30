import React from 'react';
import Component from './protected-areas-layers-component';
import { connect } from 'react-redux';
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import { handleLayerCreation } from 'utils/layer-manager-utils';
import { layersConfig } from 'constants/mol-layers-configs';

const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent, ...urlActions };

const ProtectedAreasLayersContainer = props => {

  const handleLayerToggle = layerName => {
    const { removeLayerAnalyticsEvent, activeLayers, changeGlobe, activeCategory, map } = props;
    const layer = layersConfig.find(l => l.slug === layerName);
    handleLayerCreation(layer, map);
    layerManagerToggle(layer.slug, activeLayers, changeGlobe, activeCategory);
    removeLayerAnalyticsEvent({ slug: layer.slug });
  }

  return (
    <Component
      handleLayerToggle={handleLayerToggle}
      {...props}
    />
  ) 
}
export default  connect(null, actions)(ProtectedAreasLayersContainer);