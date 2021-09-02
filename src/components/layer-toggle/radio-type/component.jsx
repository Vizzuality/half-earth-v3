import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import RadioButton from 'components/radio-button';
import LayerTools from 'components/layer-toggle/layers-tools';
import styles from './styles.module.scss';

const RadioGroup = ({
  title,
  option,
  variant,
  onClick,
  isChecked,
  onOpacityClick,
  onInfoClick,
  onBringToBackClick,
  onBringToFrontClick,
}) => {
    const key = `radio-button-${title}-${option.value}-${variant}`;
    return (
      <div className={cx(
        styles.container,
        { [styles.checked]:isChecked}
        )}>
        <div
          key={key}
          onClick={(e) => onClick(e,option)}
          className={styles.radioOption}
        >
          <RadioButton
            name={title}
            value={option.value}
            checked={isChecked}
            id={key}
            text={option.name}
          />
        </div>
        {isChecked && (
          <LayerTools 
            option={option}
            onInfoClick={onInfoClick}
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
