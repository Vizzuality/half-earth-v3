import React from 'react';
import { connect } from 'react-redux';
import { intersection } from 'lodash';
import Component from './legend-component';
import { layerManagerOrder, layerManagerOpacity, layerManagerVisibility, batchLayerManagerToggle, batchLayerManagerOpacity } from 'utils/layer-manager-utils';
import metadataActions from 'redux_modules/metadata';
import metadataConfig from 'constants/metadata';
import * as urlActions from 'actions/url-actions';
import { changeLayerOpacityAnalyticsEvent, openLayerInfoModalAnalyticsEvent, removeLayerAnalyticsEvent, changeLayersOrderAnalyticsEvent } from 'actions/google-analytics-actions';
import { VIEW_MODE } from 'constants/google-analytics-constants';
import { LEGEND_GROUPED_LAYERS_GROUPS } from 'constants/layers-groups';
import { MERGED_LAND_HUMAN_PRESSURES } from 'constants/layers-slugs';
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
    if(layer.title.includes('human_pressures')) return MERGED_LAND_HUMAN_PRESSURES;
    return layer.legendConfig.slug || layer.title;
  }

  const handleInfoClick = layer => {
    const { setModalMetadata, openLayerInfoModalAnalyticsEvent } = props;
    const slug = getSlug(layer);
    setModalMetadata({
      slug,
      title: metadataConfig[slug].title,
      isOpen: true
    });
    openLayerInfoModalAnalyticsEvent({ slug, query: { viewMode: VIEW_MODE.LEGEND }});
  };
  
  const spreadGroupLayers = (layers, activeLayers) => {
    const activeLayersTitles = activeLayers.map(l => l.title);
    return layers.reduce((acc, layerName) => {
      const layer = LEGEND_GROUPED_LAYERS_GROUPS[layerName] ? intersection(LEGEND_GROUPED_LAYERS_GROUPS[layerName], activeLayersTitles): [layerName];
      return layer ? [...acc, ...layer] : acc;
    }, []);
  }
  
  const handleChangeOrder = layers => {
    const { activeLayers, changeLayersOrderAnalyticsEvent, changeGlobe } = props;
    const flattenedGroupedLayers = spreadGroupLayers(layers, activeLayers);
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