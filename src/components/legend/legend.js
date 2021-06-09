import React from 'react';
import { connect } from 'react-redux';
import intersection from 'lodash/intersection';
import metadataActions from 'redux_modules/metadata';
import { layerManagerOrder, layerManagerOpacity, layerManagerVisibility, batchToggleLayers, batchSetLayerManagerOpacity, getActiveLayersFromLayerGroup } from 'utils/layer-manager-utils';
import { LEGEND_GROUPED_LAYERS_GROUPS } from 'constants/layers-groups';
import { MARINE_AND_LAND_HUMAN_PRESSURES } from 'constants/layers-slugs';
import { changeLayerOpacityAnalyticsEvent, openInfoModalAnalyticsEvent, layerToggleAnalyticsEvent, changeLayersOrderAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
import Component from './legend-component';
import mapStateToProps from './legend-selectors';

const actions = {...metadataActions, ...urlActions, changeLayerOpacityAnalyticsEvent, openInfoModalAnalyticsEvent, layerToggleAnalyticsEvent, changeLayersOrderAnalyticsEvent };

const LegendContainer = props => {

  const handleChangeOpacity = (layer, opacity) => {
    const { activeLayers, changeLayerOpacityAnalyticsEvent, changeGlobe } = props;
    if (layer.legendConfig.groupedLayer) {
      batchSetLayerManagerOpacity(
        LEGEND_GROUPED_LAYERS_GROUPS[layer.title],
        opacity,
        activeLayers,
        changeGlobe
      );
    } else {
      layerManagerOpacity(layer.title, opacity, activeLayers, changeGlobe);
      changeLayerOpacityAnalyticsEvent({ slug: getSlug(layer), query: { opacity }});
    }
  }

  const handleRemoveLayer = (layer) => {
    const { activeLayers, layerToggleAnalyticsEvent, changeGlobe } = props;
    if (layer.legendConfig.groupedLayer) {
      const activeGroupedLayers = getActiveLayersFromLayerGroup(LEGEND_GROUPED_LAYERS_GROUPS[layer.title], activeLayers);
      batchToggleLayers(activeGroupedLayers, activeLayers, changeGlobe);
    } else {
      layerManagerVisibility(layer.title, false, activeLayers, changeGlobe);
      layerToggleAnalyticsEvent({ slug: getSlug(layer) });
    }
  }

  const getSlug = (layer) => {
    if(layer.title.includes('human_pressures')) return MARINE_AND_LAND_HUMAN_PRESSURES;
    return layer.legendConfig.slug || layer.title;
  }

  const handleInfoClick = layer => {
    const { setModalMetadata, openInfoModalAnalyticsEvent } = props;
    const slug = getSlug(layer);
    setModalMetadata({
      slug,
      isOpen: true
    });
    openInfoModalAnalyticsEvent({ slug });
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