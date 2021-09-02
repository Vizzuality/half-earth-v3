import React from 'react';
import cx from 'classnames';

import styles from './radio-button-styles.module.scss';

const RadioButton = ({ option, checked, onChange, theme, id }) => {
  return (
    <div className={cx(styles.radioButton, theme)}>
      <input
        id={id}
        type="radio"
        name={option.name}
        value={option.value}
        checked={checked}
        onChange={() => onChange(option)}
        readOnly
      />
      <label htmlFor={id} className={styles.radioInput}>
        {option.name}
      </label>
    </div>
  );
}

export default RadioButton;