import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import RadioButton from 'components/radio-button';
import LayerTools from 'components/layer-toggle/layers-tools';
import styles from './styles.module.scss';

const RadioGroup = ({
  theme,
  title,
  option,
  variant,
  onChange,
  isChecked,
  onInfoClick,
  activeLayers,
  onOpacityClick,
  onBringToBackClick,
  onBringToFrontClick,
}) => {
    const key = `radio-button-${title}-${option.value}-${variant}`;
    return console.log(`radio-button-${title}-${option.value}-${variant}`, isChecked) || (
      <div className={cx(
        theme,
        styles.container,
        { [styles.checked]:isChecked}
        )}>
        <div
          key={key}
          className={styles.radioOption}
        >
          <RadioButton
            id={key}
            name={title}
            option={option}
            checked={isChecked}
            onChange={onChange}
          />
        </div>
        {isChecked && (
          <LayerTools 
            option={option}
            onInfoClick={onInfoClick}
            activeLayers={activeLayers}
            onOpacityClick={onOpacityClick}
            onBringToBackClick={onBringToBackClick}
            onBringToFrontClick={onBringToFrontClick}
          />
        )}
      </div>
    );
};


RadioGroup.propTypes = {
  options: PropTypes.array
};

RadioGroup.defaultProps = {
  options: []
};

export default RadioGroup;
