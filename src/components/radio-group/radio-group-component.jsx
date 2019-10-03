import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import RadioButton from './radio-button/radio-button';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { ReactComponent as SwitchIcon } from 'icons/switch.svg';
import Tutorial from 'components/tutorial'
import { isMobile } from 'constants/responsive';
import { RARITY_RICHNESS_TUTORIAL } from 'constants/tutorial';

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
  const selectedLayersIds = activeLayers.map(l => l.title);
  const selected = optionsLayers.find(o => selectedLayersIds.includes(o.layerId));
  const selectedLayer = selected && selected.layerId;
  const variant = (selected && selected.variant) || RARITY;
  const isRarityActive = variant === RARITY;

  const isOnMobile = isMobile();

  const isSelected = (option) => !!(activeLayers.find(l => l.title === option.layers[variant]));
  const isLastSelected = (option) => {
    const firstSelectedLayer = activeLayers.find(layer => layer.category === "Biodiversity");
    return firstSelectedLayer && firstSelectedLayer.title === option.layers[variant];
  }

  const renderRadioButton = option => (
    <div key={option.value} className={cx(
      styles.radioOption,
      { [styles.radioOptionSelected]: isSelected(option) }
    )}>
      <RadioButton
        key={option.value}
        name={title}
        value={option.value}
        checked={isSelected(option)}
        onClick={() => {
          if (isSelected(option)) {
            handleSimpleLayerToggle(option.layers[variant]);
          } else {
            handleExclusiveLayerToggle(option.layers[variant], selectedLayer);
          }
        }}
        text={option.name}
      />
      {isSelected(option) && (
        <div className={styles.toggle}>
          <InfoIcon
            className={styles.icon}
            onClick={() => handleInfoClick(option, variant)}
            data-tip
            data-for='infoLayerButtonId'
            data-effect='solid'
            data-delay-show={0}
          />
          <button type="button" className={styles.button} onClick={() => {
            const changeVariantType = isRarityActive ? RICHNESS : RARITY;
            handleExclusiveLayerToggle(option.layers[changeVariantType], selectedLayer);
          }}>
            <span className={styles.variant}>
              {variant}
            </span>
            <SwitchIcon className={cx({ [styles.reverseSwitchIcon]: !isRarityActive })} />
          </button>
          <ReactTooltip id='infoLayerButtonId' className='infoTooltipStyle'>
            Click to read the info of this layer
          </ReactTooltip>
        </div>
      )}
    </div>
  )

  return (
    <>
      {options.map(option => (
        isLastSelected(option) ? (
          <Tutorial
            key={option.value}
            position='top-right'
            tutorialID={RARITY_RICHNESS_TUTORIAL}
            showTutorial={!isOnMobile && isSelected(option)}
          >
            {renderRadioButton(option)}
          </Tutorial>
        ) : (
          <>{renderRadioButton(option)}</>
        )
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
