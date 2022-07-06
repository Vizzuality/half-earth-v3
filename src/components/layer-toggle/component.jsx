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
  disabled,
  onChange,
  isChecked,
  activeLayers,
  themeCategorySlug,
  handleInfoClick,
  handleOpacityClick,
  handleBringToBackClick,
  handleBringToFrontClick,
  className,
}) => {
  return type === 'radio' ? (
    <div
      className={cx(
        styles.wrapper,
        {
          [styles[variant]]: variant,
          [theme[themeCategorySlug]]: themeCategorySlug,
          [styles.checked]: isChecked,
        },
        className
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
        {
          [styles[variant]]: variant,
          [theme[themeCategorySlug]]: themeCategorySlug,
          [styles.checked]: isChecked && !disabled,
          [styles.disabled]: disabled,
        },
        className
      )}
    >
      <CheckboxTypeToggle
        disabled={disabled}
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
  );
};

export default LayerToggleComponent;
