import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as InfoIcon } from 'icons/info.svg';

import styles from './radio-group-styles.module.scss';

const RARITY = 'rarity';
const RICHNESS = 'richness';

const RadioGroup = ({ activeLayers, options, title, handleSimpleLayerToggle, handleExclusiveLayerToggle, handleInfoClick }) => {

  const [variant, setVariant] = useState(RARITY);
  const prevSelection = useRef();
  const toggleRarityRichness = () => {
    setVariant(variant === RARITY ? RICHNESS : RARITY);
  }

  const isSelected = (option) => !!(activeLayers.find(l => l.id === option.layers[variant]))

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
              checked={isSelected(option)}
              onClick={() => {
                if (isSelected(option)) {
                  handleSimpleLayerToggle(option.layers[variant]);
                } else {
                  handleExclusiveLayerToggle(option.layers[variant], prevSelection.current);
                }
                prevSelection.current = option.layers[variant];
              }}
            />
            <label htmlFor={option.value} className={styles.radioInput}>
              {option.name}
            </label>
          </>
          {isSelected(option) && (
            <div className={styles.toggle}>
              <InfoIcon onClick={() => handleInfoClick(option, variant)} />
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  const changeVariantType = variant === RARITY ? RICHNESS : RARITY;
                  handleExclusiveLayerToggle(option.layers[changeVariantType], prevSelection.current);
                  prevSelection.current = option.layers[changeVariantType];
                  toggleRarityRichness();
                }}>
                {variant}
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
