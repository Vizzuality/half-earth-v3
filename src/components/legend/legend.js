import React from 'react';
import { connect } from 'react-redux';
import Component from './legend-component';
import { layerManagerOrder, layerManagerOpacity, layerManagerVisibility, batchLayerManagerToggle, batchLayerManagerOpacity } from 'utils/layer-manager-utils';
import metadataActions from 'redux_modules/metadata';
import * as urlActions from 'actions/url-actions';
import { changeLayerOpacityAnalyticsEvent, openLayerInfoModalAnalyticsEvent, removeLayerAnalyticsEvent, changeLayersOrderAnalyticsEvent } from 'actions/google-analytics-actions';
import { VIEW_MODE } from  'constants/google-analytics-constants';
import { LEGEND_GROUPED_LAYERS_GROUPS } from 'constants/layers-groups';

import mapStateToProps from './legend-selectors';

const actions = {...metadataActions, ...urlActions, changeLayerOpacityAnalyticsEvent, openLayerInfoModalAnalyticsEvent, removeLayerAnalyticsEvent, changeLayersOrderAnalyticsEvent };

const LegendContainer = props => {

  const handleChangeOpacity = (layer, opacity) => {
    const { activeLayers, changeLayerOpacityAnalyticsEvent, changeGlobe } = props;
    if (layer.legendConfig.groupedLayer) {
      batchLayerManagerOpacity(LEGEND_GROUPED_LAYERS_GROUPS[layer.title], opacity, activeLayers, changeGlobe);
    } else {
      layerManagerOpacity(layer.title, opacity, activeLayers, changeGlobe);
      changeLayerOpacityAnalyticsEvent({ slug: getSlug(layer), query: { opacity }});
    }
  }

  const handleRemoveLayer = (layer) => {
    const { activeLayers, removeLayerAnalyticsEvent, changeGlobe } = props;
    if (layer.legendConfig.groupedLayer) {
      batchLayerManagerToggle(LEGEND_GROUPED_LAYERS_GROUPS[layer.title], activeLayers, changeGlobe);
    } else {
      layerManagerVisibility(layer.title, false, activeLayers, changeGlobe);
      removeLayerAnalyticsEvent({ slug: getSlug(layer), query: { viewMode: VIEW_MODE.LEGEND } });
    }
  }

  const getSlug = (layer) => {
    if(layer.title.includes('human_pressures')) return 'human-pressures-all';
    return layer.legendConfig.slug || layer.title;
  }

  const handleInfoClick = layer => {
    const { setModalMetadata, openLayerInfoModalAnalyticsEvent } = props;
    setModalMetadata({
      slug: getSlug(layer),
      title: `${layer.legendConfig.title} metadata`,
      isOpen: true
    });
    openLayerInfoModalAnalyticsEvent({ slug: getSlug(layer), query: { viewMode: VIEW_MODE.LEGEND }});
  };

  const spreadGroupLayers = layers => {
    return layers.reduce((acc, layerName) => {
      const layer = LEGEND_GROUPED_LAYERS_GROUPS[layerName] || [layerName];
      return [...acc, ...layer]
    }, []);
  }

  const handleChangeOrder = layers => {
    const flattenedGroupedLayers = spreadGroupLayers(layers);
    const { activeLayers, changeLayersOrderAnalyticsEvent, changeGlobe } = props;
    layerManagerOrder(flattenedGroupedLayers, activeLayers, changeGlobe);
    changeLayersOrderAnalyticsEvent();
  };

  return (
    <Component
      handleRemoveLayer={handleRemoveLayer}
      handleChangeOpacity={handleChangeOpacity}
      handleInfoClick={handleInfoClick}
      handleChangeOrder={handleChangeOrder}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(LegendContainer);