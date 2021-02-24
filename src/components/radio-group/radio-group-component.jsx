import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import RadioButton from './radio-button/radio-button';
import styles from './radio-group-styles.module.scss';

const RadioGroup = ({
  radioOptions,
  title,
  handleSimpleLayerToggle,
  handleExclusiveLayerToggle,
  handleInfoClick,
  variant,
  defaultValue,
  selectedLayerType
}) => {
  const selectedLayer = radioOptions.find((o) => o.selected);
  const selectedLayerId = selectedLayer && selectedLayer.layer;

  useEffect(() => {
    if (defaultValue && !selectedLayer) {
      const defaultOption = radioOptions.find(o => o.value === defaultValue);
      if (defaultOption) {
        handleSimpleLayerToggle(defaultOption.layer);
      }
    }
  }, []);

  useEffect(() => {
    console.log('v', 'variantChanged', selectedLayerType)
  }, [selectedLayerType]);

  const renderRadioButton = (option) => {
    const key =`radio-button-${title}-${option.value}-${variant}`;
    return (
      <div
        key={key}
        className={cx(styles.radioOption, {
          [styles.radioOptionSelected]: option.selected
        })}
      >
        <RadioButton
          name={title}
          value={option.value}
          checked={option.selected}
          id={key}
          onClick={() => {
            if (option.selected || !selectedLayerId) {
              handleSimpleLayerToggle(option.layer, option.selected);
            } else {
              handleExclusiveLayerToggle(option.layer, selectedLayerId);
            }
          }}
          text={option.name}
        />
        {option.selected && (
          <div className={styles.toggle}>
            <InfoIcon
              className={styles.icon}
              onClick={() => handleInfoClick(option, variant)}
              data-tip
              data-for="infoLayerButtonId"
              data-effect="solid"
              data-delay-show={0}
            />
            <ReactTooltip id="infoLayerButtonId" className="infoTooltipStyle">
              Click to read the info of this layer
            </ReactTooltip>
          </div>
        )}
      </div>
    );
  };
  return radioOptions.map(renderRadioButton);
};


RadioGroup.propTypes = {
  options: PropTypes.array,
  multiple: PropTypes.boolean
};

RadioGroup.defaultProps = {
  options: [],
  multiple: false
};

export default RadioGroup;
