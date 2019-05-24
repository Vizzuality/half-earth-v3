import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './radio-group-styles.module.scss';

const RadioGroup = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const isSelected = (option) => selectedOption.value === option.value;

  return (
    <>
      {options.map(option => (
        <div key={option.value} className={styles.radioOption}>
          <input 
            type="radio"
            name="singleOption"
            id={option.value}
            value={option.value}
            defaultChecked={isSelected(option)}
            onChange={() => setSelectedOption(option)} 
          />
          <label htmlFor={option.value} className={styles.radioInput}>
            {option.value}
          </label>
        </div>
      ))}
    </>
  )
}


RadioGroup.propTypes = {
  options: PropTypes.array
};

RadioGroup.defaultProps = {
  options: []
};

export default RadioGroup;