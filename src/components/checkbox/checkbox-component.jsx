import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


import styles from './checkbox-styles.module.scss';

const Checkbox = ({ option, onChange, checked, theme, className }) => {
  return (
    <div key={option.value} className={cx(
      className,
      styles.checkboxWrapper,
      { [theme]: checked }
    )}>
      <input
        type="checkbox"
        value={option.value}
        name={option.name}
        id={option.value}
        checked={checked}
        onChange={() => onChange(option)}
      />
      <label htmlFor={option.value} className={cx(styles.checkbox, { [styles.checkboxSelected]: checked })}>
        <span className={styles.label}>{option.name}</span>
        {option.rightDot && !checked && <span className={styles.rightDot} style={{ background: option.rightDot }} />}
      </label>
    </div>
  )}

export default Checkbox;

Checkbox.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  theme: PropTypes.string
};

Checkbox.defaultProps = {
  options: [],
  onChange: () => {},
  checked: false,
  theme: ''
};
