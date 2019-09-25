import React from 'react';
import PropTypes from 'prop-types';

import MultipleActiveLayers from 'components/multiple-active-layers';

import { usePaintLayer } from 'hooks/esri';
import { toggleWDPALayer } from 'utils/layer-manager-utils';
import { WDPALayers, PROTECTED_AREAS_COLOR, COMMUNITY_AREAS_COLOR } from 'constants/protected-areas';
import { PROTECTED_AREAS_VECTOR_TILE_LAYER, PROTECTED_AREAS_LAYER_GROUP, COMMUNITY_AREAS_LAYER_GROUP, COMMUNITY_AREAS_VECTOR_TILE_LAYER } from 'constants/layers-slugs';

import styles from './protected-areas-layers-styles.module';

const ProtectedAreasLayers = ({ handleGlobeUpdating, handleLayerToggle, activeLayers, map, view, addLayerAnalyticsEvent, removeLayerAnalyticsEvent }) => {
  const { layers } = map;
  
  // Paint areas on different than default colors
  const protectedGroupLayer = layers.items.find(l => l.title === PROTECTED_AREAS_LAYER_GROUP);
  const communityGroupLayer = layers.items.find(l => l.title === COMMUNITY_AREAS_LAYER_GROUP);
  const ProtectedVTLLayer = protectedGroupLayer.layers.items.find(l => l.title === PROTECTED_AREAS_VECTOR_TILE_LAYER);
  const CommunityVTLLayer = communityGroupLayer.layers.items.find(l => l.title === COMMUNITY_AREAS_VECTOR_TILE_LAYER);

  usePaintLayer(ProtectedVTLLayer, 'WDPA_poly_Latest', PROTECTED_AREAS_COLOR);
  usePaintLayer(CommunityVTLLayer, 'WDPA_poly_Latest/1', COMMUNITY_AREAS_COLOR);

  const toggleLayer = (layersPassed, option) => {
    toggleWDPALayer(activeLayers, option, handleGlobeUpdating, view, map, handleLayerToggle);
  }

  const alreadyChecked = WDPALayers.reduce((acc, option) => ({ 
    ...acc, [option.value]: activeLayers.some(layer => layer.title === option.title) 
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