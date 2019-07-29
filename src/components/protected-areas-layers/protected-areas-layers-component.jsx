import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import MultipleActiveLayers from 'components/multiple-active-layers';

import { handleLayerRendered } from 'utils/layer-manager-utils';
import { WDPALayers, PROTECTED_AREAS_COLOR, COMMUNITY_AREAS_COLOR } from 'constants/protected-areas';
import { PROTECTED_AREAS_VECTOR_TILE_LAYER, PROTECTED_AREAS_LAYER_GROUP, COMMUNITY_AREAS_LAYER_GROUP, COMMUNITY_AREAS_VECTOR_TILE_LAYER } from 'constants/layers-slugs';

import styles from './protected-areas-layers-styles.module';

const ProtectedAreasLayers = ({ handleGlobeUpdating, handleLayerToggle, activeLayers, map, view, addLayerAnalyticsEvent, removeLayerAnalyticsEvent }) => {
  const { layers } = map;

  // Paint Protected Areas on a different that default color
  useEffect(() => {
    const groupLayer = layers.items.find(l => l.title === PROTECTED_AREAS_LAYER_GROUP);
    const VTLLayer = groupLayer.layers.items.find(l => l.title === PROTECTED_AREAS_VECTOR_TILE_LAYER);

    const paintProperties = VTLLayer.getPaintProperties('WDPA_poly_Latest');

    paintProperties['fill-color'] = PROTECTED_AREAS_COLOR;
    paintProperties['fill-outline-color'] = PROTECTED_AREAS_COLOR;

    VTLLayer.setPaintProperties('WDPA_poly_Latest', paintProperties);
  }, [])

  // Paint Community Areas on a different that default color
  useEffect(() => {
    const groupLayer = layers.items.find(l => l.title === COMMUNITY_AREAS_LAYER_GROUP);
    const VTLLayer = groupLayer.layers.items.find(l => l.title === COMMUNITY_AREAS_VECTOR_TILE_LAYER);

    const paintProperties = VTLLayer.getPaintProperties('WDPA_poly_Latest/1');

    paintProperties['fill-color'] = COMMUNITY_AREAS_COLOR;
    paintProperties['fill-outline-color'] = COMMUNITY_AREAS_COLOR;

    VTLLayer.setPaintProperties('WDPA_poly_Latest/1', paintProperties);
  }, [])

  const toggleLayer = (layersPassed, option) => {
    const layerNotRendered = !activeLayers.some(layer => layer.title === option.id);

    const layerToggled = layers.items.reduce((wantedLayer, currentLayer) => {
      if(currentLayer.title === option.id) return currentLayer;
      if(currentLayer.layers) return currentLayer.layers.items.find(layer => layer.title === option.id);
      return wantedLayer;
    }, null)
    
    if (layerNotRendered) {
      handleGlobeUpdating(true);
    }

    handleLayerToggle(option.id);
    handleLayerRendered(view, layerToggled, handleGlobeUpdating);

    const isLayerActive = alreadyChecked[option.value];
    if (isLayerActive) addLayerAnalyticsEvent({ slug: option.slug })
    else removeLayerAnalyticsEvent({ slug: option.slug });
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