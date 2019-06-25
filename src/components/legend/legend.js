import React from 'react';
import { connect } from 'react-redux';
import Component from './legend-component';
import { HUMAN_PRESSURE_LAYER_ID } from 'constants/human-pressures';
import actions from 'redux_modules/metadata';
import mapStateToProps from './legend-selectors';

const LegendContainer = props => {

  const handleChangeOpacity = (layer, opacity) => {
    const { setLayerOpacity } = props;
    setLayerOpacity(layer.id, opacity);
  }

  const handleRemoveLayer = (layer) => {
    const { setLayerVisibility } = props;
    setLayerVisibility(layer.id, false)
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

export default connect(mapStateToProps, actions)(LegendContainer);