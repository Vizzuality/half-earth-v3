import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { ReactComponent as SwitchIcon } from 'icons/switch.svg';

import styles from './radio-group-styles.module.scss';

const RARITY = 'rarity';
const RICHNESS = 'richness';

const RadioGroup = ({ activeLayers, options, title, handleSimpleLayerToggle, handleExclusiveLayerToggle, handleInfoClick }) => {

  const optionsLayers = [];
  options.forEach(option => {
    Object.keys(option.layers).forEach(variant => {
      optionsLayers.push({
        layerId: option.layers[variant],
        variant,
        option
      });
    });
  });
  const selectedLayersIds = activeLayers.map(l => l.id);
  const selected = optionsLayers.find(o => selectedLayersIds.includes(o.layerId));
  const selectedLayer = selected && selected.layerId;
  const variant = (selected && selected.variant) || RARITY;
  const isRarityActive = variant === RARITY;

  const isSelected = (option) => !!(activeLayers.find(l => l.id === option.layers[variant]));

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
                  handleExclusiveLayerToggle(option.layers[variant], selectedLayer);
                }
              }}
            />
            <label htmlFor={option.value} className={styles.radioInput}>
              {option.name}
            </label>
          </>
          {isSelected(option) && (
            <div className={styles.toggle}>
              <InfoIcon className={styles.icon} onClick={() => handleInfoClick(option, variant)} />
              <button type="button" className={styles.button} onClick={() => {
                const changeVariantType = isRarityActive ? RICHNESS : RARITY;
                handleExclusiveLayerToggle(option.layers[changeVariantType], selectedLayer);
              }}>
                <span className={styles.variant}>
                  {variant}
                </span>
                <SwitchIcon className={cx({ [styles.reverseSwitchIcon]: !isRarityActive })} />
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
