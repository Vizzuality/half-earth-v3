import React from 'react';
import Component from './component';

import { bringLayerToFront, bringLayerToBack } from 'utils/layer-manager-utils';

const Container = (props) => {
  const { map } = props;


  const handleInfoClick = () => {

  }
  const handleOpacityClick = () => {

  }

  const handleBringToBackClick = (e,layer) => {
    e.stopPropagation();
    bringLayerToBack(layer, map);
  }
  const handleBringToFrontClick = (e,layer) => {
    e.stopPropagation();
    bringLayerToFront(layer, map);
  }

  return (
    <Component
      handleBringToBackClick={handleBringToBackClick}
      handleBringToFrontClick={handleBringToFrontClick}
      {...props}
    />
  )
}

export default Container;