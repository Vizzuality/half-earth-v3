import React from 'react';
import { connect } from 'react-redux';
import Component from './legend-component';
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

  const handleInfoClick = layer => {
    const { setModalMetadata } = props;
    setModalMetadata({
      slug: `${layer.id}`,
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