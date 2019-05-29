import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './checkbox-styles.module.scss';

const Checkbox = ({ option, onChange, checked }) => {
  return (
    <div key={option.name} className={cx(
      styles.checkboxWrapper, 
      { [styles.checkboxWrapperSelected]: checked }
    )}>
      <input 
        type="checkbox"
        value={option.name}
        name={option.name}
        id={option.name}
        defaultChecked={checked}
        onChange={onChange} 
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
  checked: PropTypes.bool
};

Checkbox.defaultProps = {
  options: [],
  onChange: () => {},
  checked: false
};