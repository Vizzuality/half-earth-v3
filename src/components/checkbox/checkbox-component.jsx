import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { HALF_EARTH_FUTURE_TILE_LAYER } from 'constants/layers-slugs';

import styles from './checkbox-styles.module.scss';

function Checkbox({
  option,
  onChange,
  checked,
  theme,
  className,
  disabled,
  showProgress,
}) {
  return (
    <div
      key={option.value}
      className={cx(className, { [theme]: checked }, styles.checkboxWrapper, {
        [styles.disabled]: disabled,
      })}
    >
      <input
        disabled={disabled}
        type="checkbox"
        value={option.value}
        name={option.name}
        id={option.value}
        checked={checked}
        onChange={() => onChange(option)}
      />
      <label
        htmlFor={option.value}
        className={cx(styles.checkbox, { [styles.checkboxSelected]: checked })}
      >
        <span className={styles.label}>{option.name}</span>
        {option.rightDot && !checked && (
          <span
            className={styles.rightDot}
            style={{ background: option.rightDot }}
          />
        )}
      </label>
      {option.value === HALF_EARTH_FUTURE_TILE_LAYER && showProgress && (
        <div className={styles.progressBar}>
          <div className={`${styles.circle} ${styles.border}`} />
        </div>
      )}
    </div>
  );
}

export default Checkbox;

Checkbox.propTypes = {
  option: PropTypes.shape().isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  theme: PropTypes.string,
};

Checkbox.defaultProps = {
  onChange: () => {},
  checked: false,
  theme: '',
};
