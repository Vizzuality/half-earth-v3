import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import LayerTools from 'components/layer-toggle/layers-tools';
import RadioButton from 'components/radio-button';

import styles from './styles.module.scss';

function RadioGroup({
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
}) {
  const key = `radio-button-${title}-${option.value}-${variant}`;
  return (
    <div className={cx(styles.container, { [styles.checked]: isChecked })}>
      <div key={key} className={styles.radioOption}>
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
}

RadioGroup.propTypes = {
  option: PropTypes.shape().isRequired,
  title: PropTypes.string,
  variant: PropTypes.string,
  isChecked: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  activeLayers: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onInfoClick: PropTypes.func.isRequired,
  onOpacityClick: PropTypes.func,
  onBringToBackClick: PropTypes.func.isRequired,
  onBringToFrontClick: PropTypes.func.isRequired,
};

RadioGroup.defaultProps = {
  title: undefined,
  variant: undefined,
  activeLayers: [],
  onOpacityClick: () => {},
};

export default RadioGroup;
