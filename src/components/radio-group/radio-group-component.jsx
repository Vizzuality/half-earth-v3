import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './radio-group-styles.module.scss';

const RARITY = 'rarity';
const RICHNESS = 'richness';

const RadioGroup = ({ options, title, defaultSelection, handleSimpleLayerToggle, handleExclusiveLayerToggle }) => {
  const [selectedOption, setSelectedOption] = useState(defaultSelection);
  const [toggle, setToggle] = useState(RARITY);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const prevSelection = useRef();

  // useEffect(() => {
  //   selectedLayer && handleSimpleLayerToggle(selectedLayer[toggle])
  // }, [toggle, selectedLayer])

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
              // onChange={() => {
              //   isSelected(option) ? setSelectedOption(null) : setSelectedOption(option)
              // }}
              onClick={() => {
                //selecciona o deselecciona si estaba seleccionada
                // setSelectedLayer(option.layers)
                if (option.layers[toggle] === prevSelection.current) {
                  console.log('REMOVING SAME LAYER', option.layers[toggle])
                  handleSimpleLayerToggle(option.layers[toggle]);
                  prevSelection.current = null;
                } else {
                  handleExclusiveLayerToggle(option.layers[toggle], prevSelection.current)
                  prevSelection.current = option.layers[toggle];
                }
              }}
              defaultChecked={isSelected(option)}
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