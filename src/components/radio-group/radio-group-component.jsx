import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './radio-group-styles.module.scss';

const RadioGroup = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <form className={styles.radioGroup}>
      {options.map(option => (
        <div key={option.value} className={styles.radioOption}>
          <label>
            <input type="radio" name="singleOption" value={option.value} checked={selectedOption.value === option.value} onChange={() => setSelectedOption(option)} />
            {option.value}
          </label>
        </div>
      ))}
    </form>
  )
}


RadioGroup.propTypes = {
  options: PropTypes.array
};

RadioGroup.defaultProps = {
  options: []
};

export default RadioGroup;