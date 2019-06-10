import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as InfoIcon } from 'icons/info.svg';

import styles from './checkbox-styles.module.scss';

const Checkbox = ({ option, onChange, checked, theme, handleInfoClick }) => {
  return (
    <div key={option.name} className={cx(
      styles.checkboxWrapper,
      { [styles.checkboxWrapperSelected]: checked, [theme]: checked }
    )}>
      <input
        type="checkbox"
        value={option.value}
        name={option.name}
        id={option.value}
        checked={checked}
        onChange={(e) => onChange(e, option)}
      />
      <label htmlFor={option.value} className={cx(styles.checkbox, { [styles.checkboxSelected]: checked })}>
        <span className={styles.label}>{option.name}</span>
      </label>
      {checked && <InfoIcon onClick={() => handleInfoClick(option)} />}
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
