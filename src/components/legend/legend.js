import React from 'react';
import { connect } from 'react-redux';
import Component from './legend-component';
import { HUMAN_PRESSURE_LAYER_ID } from 'constants/human-pressures';
import actions from 'redux_modules/metadata';
import mapStateToProps from './legend-selectors';

const LegendContainer = props => {

  const handleChangeOpacity = (layer, opacity) => {
    const { setLayerOpacity } = props;
    setLayerOpacity && setLayerOpacity(layer.id, opacity);
  }

  const handleRemoveLayer = (layer) => {
    const { setLayerVisibility } = props;
    setLayerVisibility && setLayerVisibility(layer.id, false)
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

  const handleChangeOrder = activeLayers => {
    const { map, setLayerOrder } = props;
    const { layers } = map;
    const visibleLayers = layers.items.filter(layer => activeLayers.includes(layer.id));
    const reversedLayers = [...activeLayers].reverse();
    reversedLayers.forEach((layer, i) => {
      map.reorder(visibleLayers.find(l => l.id === layer), i + 2 );
    })
    setLayerOrder(activeLayers);
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