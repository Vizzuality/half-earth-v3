import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MultipleActiveLayers from 'components/multiple-active-layers';
// Constants
import { layersConfig } from 'constants/mol-layers-configs';
import { usePaintLayer } from 'hooks/esri';
import { handleLayerRendered } from 'utils/layer-manager-utils';
import { WDPALayers, PROTECTED_AREAS_COLOR, COMMUNITY_AREAS_COLOR } from 'constants/protected-areas';
import { PROTECTED_AREAS_LAYERS } from 'constants/layers-groups';
// Utils
import { handleLayerCreation } from 'utils/layer-manager-utils';

import styles from './protected-areas-layers-styles.module';

const ProtectedAreasLayers = ({ handleGlobeUpdating, handleLayerToggle, activeLayers, map, view, addLayerAnalyticsEvent, removeLayerAnalyticsEvent }) => {
  const [layersObject, setLayer] = useState({})
  useEffect(() => {
    PROTECTED_AREAS_LAYERS.forEach(layerTitle => {
      const layerConfig = layersConfig.find(l => l.slug === layerTitle);
      const layer = handleLayerCreation(layerConfig, map);
      setLayer({ ...layersObject, [layerTitle]:layer });
    })
  }, []);
  
  // const { layers } = map;
  
  // // Paint areas on different than default colors
  // const protectedGroupLayer = layers.items.find(l => l.title === PROTECTED_AREAS_LAYER_GROUP);
  // const communityGroupLayer = layers.items.find(l => l.title === COMMUNITY_AREAS_LAYER_GROUP);
  // const ProtectedVTLLayer = protectedGroupLayer.layers.items.find(l => l.title === PROTECTED_AREAS_VECTOR_TILE_LAYER);
  // const CommunityVTLLayer = communityGroupLayer.layers.items.find(l => l.title === COMMUNITY_AREAS_VECTOR_TILE_LAYER);

  // usePaintLayer(ProtectedVTLLayer, 'WDPA_poly_Latest', PROTECTED_AREAS_COLOR);
  // usePaintLayer(CommunityVTLLayer, 'WDPA_poly_Latest/1', COMMUNITY_AREAS_COLOR);

  const toggleLayer = (layersPassed, option) => {
    console.log(layersPassed, option, activeLayers)
  //   const layerNotRendered = !activeLayers.some(layer => layer.title === option.id);

  //   const layerToggled = layers.items.reduce((wantedLayer, currentLayer) => {
  //     if(currentLayer.title === option.id) return currentLayer;
  //     if(currentLayer.layers) return currentLayer.layers.items.find(layer => layer.title === option.id);
  //     return wantedLayer;
  //   }, null)
    
  //   if (layerNotRendered) {
  //     handleGlobeUpdating(true);
  //   }

  //   handleLayerToggle(option.id);
  //   handleLayerRendered(view, layerToggled, handleGlobeUpdating);

  //   const isLayerActive = alreadyChecked[option.value];
  //   if (isLayerActive) addLayerAnalyticsEvent({ slug: option.slug })
  //   else removeLayerAnalyticsEvent({ slug: option.slug });
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