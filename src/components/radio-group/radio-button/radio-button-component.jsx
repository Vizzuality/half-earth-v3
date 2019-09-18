import React from 'react';
import styles from './radio-button-styles.module.scss';

const RadioButton = ({ text, value, checked, onClick, name }) => {
  return (
    <div className={styles.radioButton}>
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        checked={checked}
        onClick={onClick}
      />
      <label htmlFor={value} className={styles.radioInput}>
        {text}
      </label>
    </div>
  )
}

export default RadioButton;