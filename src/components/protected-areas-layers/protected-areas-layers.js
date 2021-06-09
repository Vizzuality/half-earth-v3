import React from 'react';
import Component from './protected-areas-layers-component';
import { connect } from 'react-redux';
import { layerToggleAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
import { layerManagerToggle, batchToggleLayers } from 'utils/layer-manager-utils';
import { COMMUNITY_AREAS_VECTOR_TILE_LAYER } from 'constants/layers-slugs';
import { COMMUNITY_PROTECTED_AREAS_LAYER_GROUP } from 'constants/layers-groups';

const actions = { layerToggleAnalyticsEvent, ...urlActions };

const ProtectedAreasLayersContainer = props => {
  const handleLayerToggle = async layerName => {
    const { activeLayers, changeGlobe, activeCategory, layerToggleAnalyticsEvent } = props;
    layerToggleAnalyticsEvent({slug:layerName})
    if (layerName === COMMUNITY_AREAS_VECTOR_TILE_LAYER) {
      batchToggleLayers(COMMUNITY_PROTECTED_AREAS_LAYER_GROUP, activeLayers, changeGlobe, activeCategory);
    } else {
      layerManagerToggle(layerName, activeLayers, changeGlobe, activeCategory);
    }
  }

  return (
    <Component
      handleLayerToggle={handleLayerToggle}
      {...props}
    />
  )
}
export default connect(null, actions)(ProtectedAreasLayersContainer);