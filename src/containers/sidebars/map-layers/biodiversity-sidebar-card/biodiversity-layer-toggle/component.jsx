import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import LayerTools from 'components/layer-toggle/layers-tools';
import RadioButton from 'components/radio-button';

import styles from './styles.module.scss';

function BiodiversityLayerToggle({
  activeLayers,
  layers,
  layerToggleAnalytics,
  onBringToBackClick,
  onBringToFrontClick,
  onInfoClick,
  onOpacityClick,
  onChange,
  title,
  variant,
}) {
  const [selectedLayer, setSelectedLayer] = useState(layers[0]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const newChecked = activeLayers.some((layer) => layer.title === selectedLayer.value);
    setIsChecked(newChecked);
    if (newChecked) { layerToggleAnalytics(selectedLayer.value); }
  }, [activeLayers]);

  const key = `radio-button-${title}-${selectedLayer.value}-${variant}`;

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
          option={selectedLayer}
          checked={isChecked}
          onChange={onChange}
          biodiversityToggle
          groupedOptions={GROUPED_OPTIONS}
          setSelectedLayer={setSelectedLayer}
        />
      </div>
      {isChecked && (
        <LayerTools
          option={selectedLayer}
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
