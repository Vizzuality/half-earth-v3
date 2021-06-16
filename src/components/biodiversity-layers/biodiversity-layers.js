import React from 'react';
import { connect } from 'react-redux';
import { layersConfig, LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import {
  flyToLayerExtent,
  layerManagerToggle,
  replaceLayerFromActiveLayers,
} from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';
import Component from './biodiversity-layers-component';
import { layerToggleAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { layerToggleAnalyticsEvent, ...urlActions }

const BiodiversityLayerContainer = props => {

  const handleSimpleLayerToggle = (layerName, isSelected) => {
    const {
      view,
      layerToggleAnalyticsEvent,
      activeLayers,
      changeGlobe,
      activeCategory = LAYERS_CATEGORIES.BIODIVERSITY
    } = props;
    const layer = layersConfig[layerName];
    if (layer) {
      layerManagerToggle(layer.slug, activeLayers, changeGlobe, activeCategory);
      layerToggleAnalyticsEvent({ slug: layer.slug });

      if (!isSelected) {
        layer.bbox && flyToLayerExtent(layer.bbox, view);
      }
    }
  }

  const handleExclusiveLayerToggle = (layerToAdd, layerToRemove) => {
    const { activeLayers, changeGlobe, layerToggleAnalyticsEvent, view } = props;
    const layer = layersConfig[layerToAdd];
    const removeLayer = layersConfig[layerToRemove];
    layerToggleAnalyticsEvent({ slug: layer.slug });
    if (layer && removeLayer) {
      replaceLayerFromActiveLayers(
        removeLayer.slug,
        layer.slug,
        activeLayers,
        changeGlobe,
        LAYERS_CATEGORIES.BIODIVERSITY
      );
      layer.bbox && flyToLayerExtent(layer.bbox, view);
    }
  }
  return (
    <Component
      handleExclusiveLayerToggle={handleExclusiveLayerToggle}
      handleSimpleLayerToggle={handleSimpleLayerToggle}
      {...props}
    />
  )
}

export default connect(null, actions)(BiodiversityLayerContainer);
