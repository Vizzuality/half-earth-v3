import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import InfoModal from 'components/modal';
import { layersConfig } from 'constants/mol-layers-configs';

import styles from './radio-group-styles.module.scss';

const RARITY = 'rarity';
const RICHNESS = 'richness';

const RadioGroup = ({ activeLayers, options, title, handleSimpleLayerToggle, handleExclusiveLayerToggle }) => {
  const selectedLayersTitles = activeLayers
        .map(l => layersConfig.find(lc => lc.slug === l.id))
        .filter(l => l)
        .map(l => l.title);

  const optionsLayers = [];
  options.forEach(option => {
    Object.keys(option.layers).forEach(variant => {
      optionsLayers.push({
        layerTitle: option.layers[variant],
        variant,
        option
      });
    });
  });

  const selected = optionsLayers.find(o => selectedLayersTitles.includes(o.layerTitle));
  const selectedOption = selected && selected.option;
  const selectedLayer = selected && selected.layerTitle;
  const variant = (selected && selected.variant) || RARITY;

  // this must be of boolean type!
  const isSelected = (option) => !!(selectedOption && selectedOption.value === option.value);

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
              onClick={() => {
                if (isSelected(option)) {
                  handleSimpleLayerToggle(option.layers[variant]);
                } else {
                  handleExclusiveLayerToggle(option.layers[variant], selectedLayer);
                }
              }}
              checked={isSelected(option)}
            />
            <label htmlFor={option.value} className={styles.radioInput}>
              {option.name}
            </label>
          </>
          {isSelected(option) && (
            <div className={styles.toggle}>
              <InfoModal />
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  const changeVariant = variant === RARITY ? RICHNESS : RARITY;
                  handleExclusiveLayerToggle(option.layers[changeVariant], selectedLayer);
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
