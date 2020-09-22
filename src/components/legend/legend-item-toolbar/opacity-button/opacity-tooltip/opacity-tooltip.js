import React from 'react';
import OpacityTooltipComponent from './opacity-tooltip-component';

const OpacityTooltip = props => {
  const { min, max, step, activeLayer: { opacity }, ...rest } = props;
  const value = typeof opacity !== 'undefined' ? opacity : 1;

  const onChange = (value) => {
    const { activeLayer, onChangeOpacity } = props;
    onChangeOpacity(activeLayer, value);
  }

  return (
    <OpacityTooltipComponent
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

export default OpacityTooltip;
