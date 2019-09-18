import React, { useState } from 'react';
import Component from './tutorial-component';

const TutorialWidget = props => {
  // position:
  // - top-left, top-right, bottom-left, bottom-right
  const offset = '-8px';
  const description = 'When activating a new biodiversity layer you can switch between rarity and richness.';
  const offsetMap = {
    'top-left': { style: { top: offset, left: offset }, dataPlace: "left" },
    'top-right': { style: { top: offset, right: offset }, dataPlace: "right" },
    'bottom-left': { style: { bottom: offset, left: offset}, dataPlace: "left" },
    'bottom-right': { style: { bottom: offset, right: offset}, dataPlace: "right" }
  }


  return (
    <Component
      {...props}
      position={offsetMap['top-right']}
      description={description}
    />
  )
}

export default TutorialWidget;