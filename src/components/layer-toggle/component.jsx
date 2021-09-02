import React from 'react';
import RadioTypeToggle from './radio-type';
import CheckboxTypeToggle from './checkbox-type';

const LayerToggleComponent = ({
  type,
  theme,
  option,
  title,
  onChange,
  optionSelected,
  optionsSelected,
  handleInfoClick,
  handleOpacityClick,
  handleBringToBackClick,
  handleBringToFrontClick,
}) => {
    return type === 'radio' ? (
      <RadioTypeToggle 
        title={title}
        option={option}
        variant='priority'
        onChange={onChange}
        onInfoClick={handleInfoClick}
        onOpacityClick={handleOpacityClick}
        onBringToBackClick={handleBringToBackClick}
        onBringToFrontClick={handleBringToFrontClick}
        isChecked={optionSelected === option.value}
      />
    ) : (
      <CheckboxTypeToggle 
        theme={theme}
        title={title}
        option={option}
        onChange={onChange}
        onInfoClick={handleInfoClick}
        onOpacityClick={handleOpacityClick}
        onBringToBackClick={handleBringToBackClick}
        onBringToFrontClick={handleBringToFrontClick}
        isChecked={optionsSelected.indexOf(option.value) !== -1}
      />
    )
}

export default LayerToggleComponent;