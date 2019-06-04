import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as InfoIcon } from 'icons/info.svg';
import InfoModal from 'components/modal';

import styles from './radio-group-styles.module.scss';

const RARITY = 'Rarity';
const RICHNESS = 'Richness';

const RadioGroup = ({ options, title, defaultSelection }) => {
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
              onChange={() => setSelectedOption(option)} 
            />
            <label htmlFor={option.value} className={styles.radioInput}>
              {option.value}
            </label>          
          </>
          {isSelected(option) && (
            <div className={styles.toggle}>
              <InfoModal />
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