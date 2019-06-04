import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './radio-group-styles.module.scss';

const RARITY = 'rarity';
const RICHNESS = 'richness';

const RadioGroup = ({ options, title, defaultSelection, handleSimpleLayerToggle, handleExclusiveLayerToggle }) => {
  const [selectedOption, setSelectedOption] = useState(defaultSelection);
  const [toggle, setToggle] = useState(RARITY);
  const prevSelection = useRef();

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
              onChange={() => {
                isSelected(option) ? setSelectedOption(null) : setSelectedOption(option)
              }}
              onClick={() => {
                if (option.layers[toggle] === prevSelection.current) {
                  handleSimpleLayerToggle(option.layers[toggle]);
                  prevSelection.current = null;
                  setSelectedOption(null);
                } else {
                  handleExclusiveLayerToggle(option.layers[toggle], prevSelection.current)
                  prevSelection.current = option.layers[toggle];
                }
              }}
              defaultChecked={() => isSelected(option)}
            />
            <label htmlFor={option.value} className={styles.radioInput}>
              {option.name}
            </label>
          </>
          {isSelected(option) && (
            <div className={styles.toggle}>
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  const changeToggleType = toggle === RARITY ? RICHNESS : RARITY;
                  handleExclusiveLayerToggle(option.layers[changeToggleType], prevSelection.current)
                  prevSelection.current = option.layers[changeToggleType];
                  toggleRarityRichness();
                }}>
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