import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as InfoIcon } from 'icons/info.svg';

import styles from './checkbox-styles.module.scss';

const Checkbox = ({ option, onChange, checked, theme }) => {
  return (
    <div key={option.name} className={cx(
      styles.checkboxWrapper, 
      { [styles.checkboxWrapperSelected]: checked },
      theme
    )}>
      <input 
        type="checkbox"
        value={option.value}
        name={option.name}
        id={option.value}
        defaultChecked={checked}
        onChange={(e) => onChange(e, option)} 
      />
      <label htmlFor={option.value} className={styles.checkbox}>
        {option.name}
      </label>
      {checked && <InfoIcon onClick={() => console.log('info')} />}
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