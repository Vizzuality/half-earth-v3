import React from 'react';
import cx from 'classnames';
import RadioTypeToggle from './radio-type';
import CheckboxTypeToggle from './checkbox-type';

import theme from 'styles/themes/checkboxes-theme.module.scss';
import styles from './styles.module.scss';

const LayerToggleComponent = ({
  type,
  title,
  option,
  variant,
  onChange,
  isChecked,
  activeLayers,
  toggleCategory,
  handleInfoClick,
  handleOpacityClick,
  handleBringToBackClick,
  handleBringToFrontClick,
}) => {
    return type === 'radio' ? (
      <div 
        className={cx(
          styles.wrapper,
          {[styles[variant]]:variant,
          [theme[toggleCategory]]: toggleCategory,
          [styles.checked]: isChecked}
        )}
      >
        <RadioTypeToggle 
          theme={theme}
          title={title}
          option={option}
          onChange={onChange}
          isChecked={isChecked}
          activeLayers={activeLayers}
          onInfoClick={handleInfoClick}
          onOpacityClick={handleOpacityClick}
          onBringToBackClick={handleBringToBackClick}
          onBringToFrontClick={handleBringToFrontClick}
        />
      </div>
    ) : (
      <div 
        className={cx(
          styles.wrapper,
          {[styles[variant]]:variant,
          [theme[toggleCategory]]: toggleCategory,
          [styles.checked]: isChecked}
        )}
      >
        <CheckboxTypeToggle 
          theme={theme}
          title={title}
          option={option}
          onChange={onChange}
          isChecked={isChecked}
          activeLayers={activeLayers}
          onInfoClick={handleInfoClick}
          onOpacityClick={handleOpacityClick}
          onBringToBackClick={handleBringToBackClick}
          onBringToFrontClick={handleBringToFrontClick}
        />
      </div>
    )
}

export default LayerToggleComponent;