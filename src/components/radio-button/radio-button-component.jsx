import React from 'react';

import cx from 'classnames';

import GroupSelect from 'components/select';

import styles from './radio-button-styles.module.scss';

function RadioButton({
  option,
  checked,
  onChange,
  theme,
  id,
  disabled,
  biodiversityToggle,
  parseGroupOptions,
  setSelectedLayer,
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
      {!biodiversityToggle && (
        <label
          htmlFor={id}
          className={cx(styles.radioInput, theme && theme.radioLabel, {
            [theme && theme.checked]: checked,
          })}
        >
          {option.name}
        </label>
      )}
      {biodiversityToggle && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
          htmlFor={id}
          className={cx(styles.radioInput, theme && theme.radioLabel, {
            [theme && theme.checked]: checked,
          })}
        >
          <GroupSelect
            groupedOptions={parseGroupOptions()}
            onSelect={(l) => setSelectedLayer(l)}
          />
        </label>
      )}
    </div>
  );
}

export default RadioButton;
