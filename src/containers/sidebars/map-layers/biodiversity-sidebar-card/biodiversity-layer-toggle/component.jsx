import React, { useState } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import LayerTools from 'components/layer-toggle/layers-tools';
import RadioButton from 'components/radio-button';
import GroupSelect from 'components/select';

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
  const key = `radio-button-${title}-test-${variant}`;

  console.log({ selectedLayer });

  const parseGroupLayers = (group) => {
    return layers.filter((layer) => layer.group === group).map((layer) => {
      return {
        ...layer,
        label: layer.title,
      };
    });
  };

  const GROUPED_OPTIONS = [
    {
      label: 'mammals',
      options: parseGroupLayers('mammals'),
    },
    {
      label: 'birds',
      options: parseGroupLayers('birds'),
    },
    {
      label: 'amphibians',
      options: parseGroupLayers('amphibians'),
    },
    {
      label: 'plants',
      options: parseGroupLayers('plants'),
    },
    {
      label: 'invertebrates',
      options: parseGroupLayers('invertebrates'),
    },
    {
      label: 'reptils',
      options: parseGroupLayers('reptils'),
    },
  ];

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
        <GroupSelect
          groupedOptions={GROUPED_OPTIONS}
          onSelect={(l) => setSelectedLayer(l)}
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
