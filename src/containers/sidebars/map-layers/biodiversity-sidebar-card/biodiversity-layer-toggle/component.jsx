import React, { useState } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import Dropdown from 'components/dropdown';
import LayerTools from 'components/layer-toggle/layers-tools';
import RadioButton from 'components/radio-button';

import styles from './styles.module.scss';

function BiodiversityLayerToggle({
  title,
  variant,
  onChange,
  isChecked,
  onInfoClick,
  activeLayers,
  onOpacityClick,
  onBringToBackClick,
  onBringToFrontClick,
  layers,
}) {
  const [selectedLayer, setSelectedLayer] = useState(layers[0]);
  // const key = `radio-button-${title}-${layer.value}-${variant}`;
  const key = `radio-button-${title}-test-${variant}`;
  return (

    <div className={cx(
      styles.container,
      { [styles.checked]: isChecked },
    )}
    >
      <div className={styles.radioOption}>
        <RadioButton
          id={key}
          name={title}
          option="test"
          checked={isChecked}
          onChange={onChange}
        />
      </div>

      {isChecked && (
        <LayerTools
          option="test"
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

BiodiversityLayerToggle.propTypes = {
  options: PropTypes.arrayOf({}),
};

BiodiversityLayerToggle.defaultProps = {
  options: [],
};

export default BiodiversityLayerToggle;
