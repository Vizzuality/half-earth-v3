import React from 'react';
import PropTypes from 'prop-types';

import { WDPALayers } from 'constants/protected-areas';
import MultipleActiveLayers from 'components/multiple-active-layers';

import styles from 'styles/themes/checkboxes-theme.module';

const ProtectedAreasLayers = ({ handleLayerToggle, activeLayers }) => {

  const toggleLayer = (layersPassed, option) => {
    handleLayerToggle(option.title)
  }

  const alreadyChecked = WDPALayers.reduce((acc, option) => ({ 
    ...acc, [option.value]: activeLayers.some(layer => layer.title === option.title) 
  }), {});

  return (
    <MultipleActiveLayers
      options={WDPALayers}
      alreadyChecked={alreadyChecked}
      handleClick={toggleLayer}
      theme={styles.protectedAreas}
      title='Conservation Areas'
      description='Protections classified according to their management objectives.'
    />
  )}

ProtectedAreasLayers.propTypes = {
  handleLayerToggle: PropTypes.func,
  activeLayers: PropTypes.array
};

ProtectedAreasLayers.defaultProps = {
  handleLayerToggle: () => {},
  activeLayers: []
};

export default ProtectedAreasLayers;