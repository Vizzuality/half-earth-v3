import React from 'react';
import { Range } from 'vizzuality-components';
import styles from './opacity-tooltip-styles.module.scss';

const OpacityTooltipComponent = props => {
  const { min, max, step, value, onChange, ...rest } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderContent}>
        Opacity
        <Range
          min={min}
          max={max}
          step={step}
          value={value}
          onAfterChange={onChange}
          {...rest}
        />
      </div>
      <span className={styles.sliderValue}>{`${Math.round(value * 100)}%`}</span>
    </div>
  );
}

export default OpacityTooltipComponent;
