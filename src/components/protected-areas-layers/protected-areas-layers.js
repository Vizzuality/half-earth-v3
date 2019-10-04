import React from 'react';
import Component from './protected-areas-layers-component';
import { connect } from 'react-redux';
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
import { layerManagerToggle, handleLayerCreation, batchLayerManagerToggle } from 'utils/layer-manager-utils';
import { layersConfig } from 'constants/mol-layers-configs';
import { COMMUNITY_AREAS_VECTOR_TILE_LAYER } from 'constants/layers-slugs';
import { COMMUNITY_PROTECTED_AREAS_LAYER_GROUP } from 'constants/layers-groups';

const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent, ...urlActions };

const ProtectedAreasLayersContainer = props => {

  const handleLayerToggle = layerName => {
    const { removeLayerAnalyticsEvent, activeLayers, changeGlobe, activeCategory, map } = props;
    if (layerName === COMMUNITY_AREAS_VECTOR_TILE_LAYER) {
      COMMUNITY_PROTECTED_AREAS_LAYER_GROUP.forEach(layerName => {
        const layerConfig = layersConfig[layerName];
        handleLayerCreation(layerConfig, map);
      })
      batchLayerManagerToggle(COMMUNITY_PROTECTED_AREAS_LAYER_GROUP, activeLayers, changeGlobe, activeCategory);
    } else {
      const layer = layersConfig[layerName];
      handleLayerCreation(layer, map);
      layerManagerToggle(layer.slug, activeLayers, changeGlobe, activeCategory);
      removeLayerAnalyticsEvent({ slug: layer.slug });
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