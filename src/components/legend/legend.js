import React from 'react';
import { connect } from 'react-redux';
import Component from './legend-component';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import { layerManagerOrder, layerManagerOpacity, layerManagerVisibility, batchLayerManagerToggle, batchLayerManagerOpacity } from 'utils/layer-manager-utils';
import metadataActions from 'redux_modules/metadata';
import * as urlActions from 'actions/url-actions';
import { changeLayerOpacityAnalyticsEvent, openLayerInfoModalAnalyticsEvent, removeLayerAnalyticsEvent, changeLayersOrderAnalyticsEvent } from 'actions/google-analytics-actions';
import { VIEW_MODE } from  'constants/google-analytics-constants';
import { COMMUNITY_AREAS_VECTOR_TILE_LAYER } from 'constants/layers-slugs';
import { COMMUNITY_PROTECTED_AREAS_LAYER_GROUP } from 'constants/layers-groups';

import mapStateToProps from './legend-selectors';

const actions = {...metadataActions, ...urlActions, changeLayerOpacityAnalyticsEvent, openLayerInfoModalAnalyticsEvent, removeLayerAnalyticsEvent, changeLayersOrderAnalyticsEvent };

const LegendContainer = props => {

  const handleChangeOpacity = (layer, opacity) => {
    const { activeLayers, changeLayerOpacityAnalyticsEvent, changeGlobe } = props;
    if (layer.title === COMMUNITY_AREAS_VECTOR_TILE_LAYER) {
      batchLayerManagerOpacity(COMMUNITY_PROTECTED_AREAS_LAYER_GROUP, opacity, activeLayers, changeGlobe);
    } else {
      layerManagerOpacity(layer.title, opacity, activeLayers, changeGlobe);
      changeLayerOpacityAnalyticsEvent({ slug: getSlug(layer), query: { opacity }});
    }
  }

  const handleRemoveLayer = (layer) => {
    const { activeLayers, removeLayerAnalyticsEvent, changeGlobe } = props;
    if (layer.title === COMMUNITY_AREAS_VECTOR_TILE_LAYER) {
      batchLayerManagerToggle(COMMUNITY_PROTECTED_AREAS_LAYER_GROUP, activeLayers, changeGlobe);
    } else {
      layerManagerVisibility(layer.title, false, activeLayers, changeGlobe);
      removeLayerAnalyticsEvent({ slug: getSlug(layer), query: { viewMode: VIEW_MODE.LEGEND } });
    }
  }

  const getSlug = (layer) => {
    if(layer.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER) return 'human-pressures-all';
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

  const handleChangeOrder = layers => {
    const { activeLayers, changeLayersOrderAnalyticsEvent, changeGlobe } = props;
    layerManagerOrder(layers, activeLayers, changeGlobe);
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