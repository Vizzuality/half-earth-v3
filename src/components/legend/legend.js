import React from 'react';
import { connect } from 'react-redux';
import Component from './legend-component';
import { HUMAN_PRESSURE_LAYER_ID } from 'constants/human-pressures';
import actions from 'redux_modules/metadata';
import * as googleAnalyticsActions from 'actions/google-analytics-actions';
import { VIEW_MODE } from  'constants/google-analytics-constants';

import mapStateToProps from './legend-selectors';

const LegendContainer = props => {

  const handleChangeOpacity = (layer, opacity) => {
    const { setLayerOpacity } = props;
    setLayerOpacity && setLayerOpacity(layer.id, opacity);
  }

  const handleRemoveLayer = (layer) => {
    const { setLayerVisibility, removeLayerAnalyticsEvent } = props;
    setLayerVisibility && setLayerVisibility(layer.id, false)
    removeLayerAnalyticsEvent({ slug: getSlug(layer), query: { viewMode: VIEW_MODE.LEGEND } });
  }

  const getSlug = (layer) => {
    if(layer.id === HUMAN_PRESSURE_LAYER_ID) return 'human-pressures-all';
    return layer.legendConfig.slug || layer.id;
  }

  const handleInfoClick = layer => {
    const { setModalMetadata } = props;
    setModalMetadata({
      slug: getSlug(layer),
      title: `${layer.legendConfig.title} metadata`,
      isOpen: true
    });
  };

  return (
    <Component
      handleRemoveLayer={handleRemoveLayer}
      handleChangeOpacity={handleChangeOpacity}
      handleInfoClick={handleInfoClick}
      {...props}
    />
  )
}

export default connect(mapStateToProps, {...actions, ...googleAnalyticsActions})(LegendContainer);