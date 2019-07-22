import React from 'react';
import PropTypes from 'prop-types';
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

OpacityTooltip.propTypes = {
  activeLayer: PropTypes.object.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChangeOpacity: PropTypes.func.isRequired
}

OpacityTooltip.defaultProps = {
    min: 0,
    max: 1,
    step: 0.01
}

export default OpacityTooltip;
