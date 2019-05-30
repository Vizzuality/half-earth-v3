import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './radio-group-styles.module.scss';

const RARITY = 'Rarity';
const RICHNESS = 'Richness';

const RadioGroup = ({ options, title, defaultSelection, handleLayerToggle }) => {
  const [selectedOption, setSelectedOption] = useState(defaultSelection);
  const [toggle, setToggle] = useState(RARITY);
  
  const toggleRarityRichness = () => {
    setToggle(toggle === RARITY ? RICHNESS : RARITY);
  }

  const isSelected = (option) => selectedOption && selectedOption.value === option.value;

  return (
    <>
      {options.map(option => (
        <div key={option.value} className={cx(
          styles.radioOption, 
          { [styles.radioOptionSelected]: isSelected(option) }
        )}>
          <>
            <input 
              type="radio"
              name={title}
              id={option.value}
              value={option.value}
              defaultChecked={isSelected(option)}
              onChange={() => {
                handleLayerToggle("All marine fishing types")
                setSelectedOption(option)} 
              } 
            />
            <label htmlFor={option.value} className={styles.radioInput}>
              {option.value}
            </label>          
          </>
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