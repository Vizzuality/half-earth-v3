import React from 'react';
import RadioTypeToggle from './radio-type';
import CheckboxTypeToggle from './checkbox-type';

const LayerToggleComponent = ({
  type,
  theme,
  option,
  title,
  onClick,
  optionSelected,
  handleInfoClick,
}) => {
  if (type === 'radio') {
    return (
      <div onClick={(e) => onClick(e,option)}>
        <RadioTypeToggle 
          isChecked={optionSelected === option.value}
          option={option}
          title={title}
          onInfoClick={handleInfoClick}
          variant='priority'
        />
      </div>
    )
  }
}

export default LayerToggleComponent;