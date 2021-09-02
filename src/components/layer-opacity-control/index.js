import React from 'react';
import Component from './component';
import { layerManagerOpacity } from 'utils/layer-manager-utils';

const Container = ({
  layer,
  changeGlobe,
  activeLayers,
}) => {

  const handleOpacityChange = (opacity) => {
    layerManagerOpacity(layer.value, opacity, activeLayers, changeGlobe);
  }

  return (
    <Component 
      onOpacityChange={handleOpacityChange}
    />
  )
}

export default Container;