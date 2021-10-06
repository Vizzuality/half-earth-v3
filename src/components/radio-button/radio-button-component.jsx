import React from 'react';
import cx from 'classnames';

import styles from './radio-button-styles.module.scss';

const RadioButton = ({ option, checked, onChange, theme, id, disabled }) => {
  return (
    <div className={cx(
        theme,
        styles.radioButton,
        {[styles.disabled]: disabled}
      )} 
      onClick={(e) => {
        e.preventDefault()
        onChange(option)
      }}
    >
      <input
        id={id}
        type="radio"
        name={option.name}
        value={option.value}
        checked={checked}
        readOnly
      />
      <label htmlFor={id} className={styles.radioInput}>
        {option.name}
      </label>
    </div>
  );
}

export default RadioButton;