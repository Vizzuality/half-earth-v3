import React from 'react';
import PropTypes from 'prop-types';

import MultipleActiveLayers from 'components/multiple-active-layers';

import styles from './protected-areas-layers-styles.module';

const ProtectedAreasLayers = ({ options, handleLayerToggle, activeLayers }) => {
  const toggleLayer = (layers, option) => {
    handleLayerToggle(option.id);
  }

  const alreadyChecked = options.reduce((acc, option) => ({ 
    ...acc, [option.value]: activeLayers.some(layer => layer.id === option.id) 
  }), {});

  return (
    <MultipleActiveLayers
      options={options}
      alreadyChecked={alreadyChecked}
      handleClick={toggleLayer}
      theme={styles.overrideCheckbox}
      title='Land use pressures'
      description='Human pressures causing habitat loss and accelerating species extinction.'
      activeLayers={activeLayers}
    />
  )}

ProtectedAreasLayers.propTypes = {
  map: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.array,
  handleLayerToggle: PropTypes.func,
  activeLayers: PropTypes.array
};

ProtectedAreasLayers.defaultProps = {
  map: {},
  title: '',
  description: '',
  options: [],
  handleLayerToggle: () => {},
  activeLayers: []
};

export default ProtectedAreasLayers;