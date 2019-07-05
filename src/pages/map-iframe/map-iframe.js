import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import postRobot from 'post-robot';

import { BIODIVERSITY_FACETS_LAYER } from 'constants/biodiversity';
import { 
  layerManagerToggle,
  layerManagerOpacity
} from 'utils/layer-manager-utils';
import { layersConfig } from 'constants/mol-layers-configs';
import { createLayer } from 'utils/layer-manager-utils';

import Component from './map-iframe-component.jsx';
import mapStateToProps from './map-iframe-selectors';

import ownActions from './map-iframe-actions.js';
const actions = { ...ownActions };

const handleMapLoad = (map, view, activeLayers) => {
  const { layers } = map;
  const gridLayer = layers.items.find(l => l.id === BIODIVERSITY_FACETS_LAYER);
  // set the outFields for the BIODIVERSITY_FACETS_LAYER
  // to get all the attributes available
  gridLayer.outFields = ["*"];

  const biodiversityLayerIDs = activeLayers
    .filter(({ category }) => category === "Biodiversity")
    .map(({ id }) => id);

  const biodiversityLayers = layersConfig
    .filter(({ slug }) => biodiversityLayerIDs.includes(slug));

  biodiversityLayers.forEach(layer => createLayer(layer, map));
}

const dataGlobeContainer = props => {
  const attachPostRobotListeners = () => {
    postRobot.on('mapFlyToCoordinates', event => {
      const { center = [], zoom = 1 } = event.data;
      if (center.length || zoom) {
        flyToLocation(center, zoom);
        return { done: true };
      }
      return { done: false };
    });
    postRobot.on('setMapLayers', event => {
      const { layers = [] } = event.data;
      layers.forEach(layerId => toggleLayer(layerId));
      return { done: true };
    });
    postRobot.on('setLayersOpacity', event => {
      const { layers = [] } = event.data;
      layers.forEach(layer => setLayerOpacity(layer.id, layer.opacity));
      return { done: true };
    });
  }

  useEffect(() => {
    if(props.listeners) attachPostRobotListeners();
  }, []);

  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, props.setDataGlobeSettings, props.activeCategory);
  const setLayerOpacity = (layerId, opacity) => layerManagerOpacity(layerId, opacity, props.activeLayers, props.setDataGlobeSettings);
  const flyToLocation = (center, zoom) => props.setDataGlobeSettings({ center, zoom });
  const handleZoomChange = props.setDataGlobeSettings;
  
  return <Component
    handleLayerToggle={toggleLayer}
    handleZoomChange={handleZoomChange}
    onLoad={(map, view) => handleMapLoad(map, view, props.activeLayers)}
    {...props}/>
}

export default connect(mapStateToProps, actions)(dataGlobeContainer);