import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
        value={option.name}
        name={option.name}
        id={option.name}
        defaultChecked={checked}
        onChange={(e) => onChange(e, option)} 
      />
      <label htmlFor={option.name} className={styles.checkbox}>
        {option.name}
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