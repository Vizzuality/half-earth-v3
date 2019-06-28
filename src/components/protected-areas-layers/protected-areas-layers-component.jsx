import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import MultipleActiveLayers from 'components/multiple-active-layers';
import { WDPALayers, PROTECTED_AREAS_COLOR, COMMUNITY_AREAS_COLOR } from 'constants/protected-areas';

import styles from './protected-areas-layers-styles.module';

const ProtectedAreasLayers = ({ handleLayerToggle, activeLayers, map }) => {
  const { layers } = map;

  // Paint Protected Areas on a different that default color
  useEffect(() => {
    const groupLayer = layers.items.find(l => l.title === 'Protected areas');
    const VTLLayer = groupLayer.layers.items.find(l => l.title === 'WDPA pro vectortile');

    const paintProperties = VTLLayer.getPaintProperties('WDPA_poly_Latest');

    paintProperties['fill-color'] = PROTECTED_AREAS_COLOR;
    paintProperties['fill-outline-color'] = PROTECTED_AREAS_COLOR;

    VTLLayer.setPaintProperties('WDPA_poly_Latest', paintProperties);
  }, [])

  // Paint Community Areas on a different that default color
  useEffect(() => {
    const groupLayer = layers.items.find(l => l.title === 'Community areas');
    const VTLLayer = groupLayer.layers.items.find(l => l.title === 'Community areas vector');

    const paintProperties = VTLLayer.getPaintProperties('WDPA_poly_Latest/1');

    paintProperties['fill-color'] = COMMUNITY_AREAS_COLOR;
    paintProperties['fill-outline-color'] = COMMUNITY_AREAS_COLOR;

    VTLLayer.setPaintProperties('WDPA_poly_Latest/1', paintProperties);
  }, [])

  const toggleLayer = (layers, option) => {
    handleLayerToggle(option.id);
  }

  const alreadyChecked = WDPALayers.reduce((acc, option) => ({ 
    ...acc, [option.value]: activeLayers.some(layer => layer.id === option.id) 
  }), {});

  return (
    <MultipleActiveLayers
      options={WDPALayers}
      alreadyChecked={alreadyChecked}
      handleClick={toggleLayer}
      theme={styles}
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