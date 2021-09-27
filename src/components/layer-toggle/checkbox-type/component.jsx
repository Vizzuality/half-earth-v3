import React from 'react';
import cx from 'classnames';
import Checkbox from 'components/checkbox';
import LayerTools from 'components/layer-toggle/layers-tools';

import styles from './styles.module.scss';

const CheckboxType = ({
  theme,
  option,
  onChange,
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
      className={cx(
        theme,
        styles.container,
        {[theme.checked]: isChecked}
      )}
    >
      <div
        className={styles.checkboxOption}
      >
        <Checkbox
          option={option}
          checked={isChecked}
          onChange={onChange}
          className={styles.labelStyles}
        />
      </div>
      {isChecked && (
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
  )}

export default CheckboxType;
