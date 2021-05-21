import React from 'react';
import cx from 'classnames';

import styles from './radio-button-styles.module.scss';

const RadioButton = ({ text, value, checked, onClick, name, theme, id }) => {
  return (
    <div className={cx(styles.radioButton, theme)}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onClick={onClick}
        readOnly
      />
      <label htmlFor={id} className={styles.radioInput}>
        {text}
      </label>
    </div>
  );
}

export default RadioButton;