import React from 'react';

import cx from 'classnames';

import styles from './radio-button-styles.module.scss';

function RadioButton({
  option, checked, onChange, theme, id, disabled,
}) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role="button"
      tabIndex="0"
      className={cx(theme && theme.radioButton, styles.radioButton, {
        [styles.disabled]: disabled,
      })}
      onClick={(e) => {
        e.preventDefault();
        onChange(option);
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
      <label
        htmlFor={id}
        className={cx(styles.radioInput, theme && theme.radioLabel, {
          [theme && theme.checked]: checked,
        })}
      >
        {option.name}
      </label>
    </div>
  );
}

export default RadioButton;
