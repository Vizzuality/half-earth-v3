import React from 'react';
import PropTypes from 'prop-types';
import { Range } from 'vizzuality-components';
import styles from './opacity-tooltip-styles.module.scss';

const railStyle = {
  backgroundColor: 'rgba(255,255,255,0.3)',
  height: '4px',
  borderRadius: '2px',
};

const handleStyle = {
  border: '1px solid #0E2B3B',
  backgroundColor: '#FFFFFF',
  height: '10px',
  width: '10px',
  boxShadow: '0 2px 4px 0 #0E2B3B',
  borderRadius: '50%',
  position: 'absolute',
  transform: 'translate(-5px,-10px)',
  cursor: 'pointer',
  outline: 'none'
};

const trackStyle = { 
  backgroundColor: '#1bcec7',
  height: '3px',
  borderRadius: '4px',
  transform: 'translate(0, -3px)',
  boxShadow: `0 0 3px 0 #00BDB5`
};

const formatValue = (value) => {
  return `${Math.round(value * 100)}%`
}

const OpacityTooltipComponent = props => {
  const { min, max, step, value, onChange, ...rest } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderContent}>
        <span className={styles.sliderTitle}>opacity</span>
        <Range
          min={min}
          max={max}
          step={step}
          value={value}
          onAfterChange={onChange}
          railStyle={railStyle}
          handleStyle={handleStyle}
          trackStyle={trackStyle}
          formatValue={formatValue}
          {...rest}
        />
      </div>
      <span className={styles.sliderValue}>{formatValue(value)}</span>
    </div>
  );
}

OpacityTooltipComponent.propTypes = {
  activeLayer: PropTypes.object.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

OpacityTooltipComponent.defaultProps = {
    min: 0,
    max: 1,
    step: 0.01,
    value: 1
}

export default OpacityTooltipComponent;
