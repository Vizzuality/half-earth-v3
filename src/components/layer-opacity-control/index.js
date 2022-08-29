import React from 'react';
import Component from './component';
import { layerManagerOpacity } from 'utils/layer-manager-utils';

function Container(props) {
  const {
    layer,
    changeGlobe,
    activeLayers,
  } = props;
  const handleOpacityChange = (opacity) => {
    layerManagerOpacity(layer.value, opacity, activeLayers, changeGlobe);
  };

  return (
    <Component
      onOpacityChange={handleOpacityChange}
      {...props}
    />
  );
}

export default Container;
