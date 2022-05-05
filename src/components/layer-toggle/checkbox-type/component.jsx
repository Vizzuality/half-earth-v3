import React from 'react';
import cx from 'classnames';
import Checkbox from 'components/checkbox';
import LayerTools from 'components/layer-toggle/layers-tools';

import styles from './styles.module.scss';

const CheckboxType = ({
  option,
  onChange,
  disabled,
  isChecked,
  onInfoClick,
  activeLayers,
  onOpacityClick,
  onBringToBackClick,
  onBringToFrontClick,
}) => {

  return (
    <div
      key={option.name}
      className={cx({
        [styles.container]: true,
      })}
    >
      <div
        className={styles.checkboxOption}
      >
        <Checkbox
          disabled={disabled}
          option={option}
          checked={!disabled && isChecked}
          onChange={onChange}
          className={styles.labelStyles}
        />
      </div>
      {isChecked && !disabled && (
        <LayerTools
          option={option}
          onInfoClick={onInfoClick}
          activeLayers={activeLayers}
          onOpacityClick={onOpacityClick}
          onBringToBackClick={onBringToBackClick}
          onBringToFrontClick={onBringToFrontClick}
        />
      )}
    </div>
  )
}

export default CheckboxType;
