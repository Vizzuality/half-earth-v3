import React from 'react';

import { layerManagerOpacity } from 'utils/layer-manager-utils';

import Component from './component';

function Container(props) {
  const { layer, changeGlobe, activeLayers } = props;
  const handleOpacityChange = (opacity) => {
    layerManagerOpacity(layer.value, opacity, activeLayers, changeGlobe);
  };

  return <Component onOpacityChange={handleOpacityChange} {...props} />;
}

export default Container;
