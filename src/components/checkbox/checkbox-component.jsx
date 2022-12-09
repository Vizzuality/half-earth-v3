import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './checkbox-styles.module.scss';

function Checkbox({ option, onChange, checked, theme, className, disabled }) {
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
