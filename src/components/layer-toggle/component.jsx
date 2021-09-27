import React from 'react';
import RadioTypeToggle from './radio-type';
import CheckboxTypeToggle from './checkbox-type';

const LayerToggleComponent = ({
  type,
  theme,
  option,
  title,
  onChange,
  activeLayers,
  handleInfoClick,
  handleOpacityClick,
  handleBringToBackClick,
  handleBringToFrontClick,
}) => {
    return type === 'radio' ? (
      <RadioTypeToggle 
        theme={theme}
        title={title}
        option={option}
        variant='priority'
        onChange={onChange}
        activeLayers={activeLayers}
        onInfoClick={handleInfoClick}
        onOpacityClick={handleOpacityClick}
        onBringToBackClick={handleBringToBackClick}
        onBringToFrontClick={handleBringToFrontClick}
        isChecked={activeLayers.some(layer => layer.title === option.value)}
      />
    ) : (
      <CheckboxTypeToggle 
        theme={theme}
        title={title}
        option={option}
        onChange={onChange}
        activeLayers={activeLayers}
        onInfoClick={handleInfoClick}
        onOpacityClick={handleOpacityClick}
        onBringToBackClick={handleBringToBackClick}
        onBringToFrontClick={handleBringToFrontClick}
        isChecked={activeLayers.some(layer => layer.title === option.value)}
      />
    )
}

export default LayerToggleComponent;