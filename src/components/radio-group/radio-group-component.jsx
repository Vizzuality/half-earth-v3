import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './radio-group-styles.module.scss';

const RARITY = 'Rarity';
const RICHNESS = 'Richness';

const RadioGroup = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [toggle, setToggle] = useState(RARITY);
  
  const toggleRarityRichness = () => {
    setToggle(toggle === RARITY ? RICHNESS : RARITY);
  }

  const isSelected = (option) => selectedOption.value === option.value;

  return (
    <>
      {options.map(option => (
        <div key={option.value} className={cx(
          styles.radioOption, 
          { [styles.radioOptionSelected]: isSelected(option) }
        )}>
          <div className={styles.radio}>
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
          {isSelected(option) && (
            <div className={styles.toggle}>
              <button 
                type="button"
                className={styles.button}
                onClick={toggleRarityRichness}>
                {toggle}
              </button>
            </div>
          )}
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