import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import postRobot from 'post-robot';

import { loadModules } from '@esri/react-arcgis';

import { BIODIVERSITY_FACETS_LAYER, LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import { 
  layerManagerToggle,
  layerManagerOpacity
} from 'utils/layer-manager-utils';
import { layersConfig } from 'constants/mol-layers-configs';
import { createLayer, addLayer } from 'utils/layer-manager-utils';

import Component from './map-iframe-component.jsx';
import mapStateToProps from './map-iframe-selectors';

import ownActions from './map-iframe-actions.js';
const actions = { ...ownActions };

const handleMapLoad = (map, view, activeLayers, handleGlobeUpdating) => {
  const { layers } = map;
  const gridLayer = layers.items.find(l => l.id === BIODIVERSITY_FACETS_LAYER);
  // set the outFields for the BIODIVERSITY_FACETS_LAYER
  // to get all the attributes available
  gridLayer.outFields = ["*"];

  // This fix has been added as a workaround to a bug introduced on v4.12
  // The bug was causing the where clause of the mosaic rule to not work
  // It will be probably fixed on v4.13
  const humanImpactLayer = layers.items.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
  loadModules(["esri/config"]).then(([esriConfig]) => {
    esriConfig.request.interceptors.push({
      urls: `${humanImpactLayer.url}/exportImage`,
      before: function (params) {
        if(params.requestOptions.query.mosaicRule) {
          params.requestOptions.query.mosaicRule = JSON.stringify(humanImpactLayer.mosaicRule.toJSON());
        }
      }
    });
  })

  const biodiversityLayerIDs = activeLayers
    .filter(({ category }) => category === "Biodiversity")
    .map(({ id }) => id);

  const biodiversityLayers = layersConfig
    .filter(({ slug }) => biodiversityLayerIDs.includes(slug));

  biodiversityLayers.forEach(layer => { createLayer(layer).then(arcgisLayer => addLayer(arcgisLayer, map, view, handleGlobeUpdating)) });
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
  const handleGlobeUpdating = (updating) => props.setDataGlobeSettings({ isGlobeUpdating: updating })
  
  return <Component
    handleLayerToggle={toggleLayer}
    handleZoomChange={handleZoomChange}
    onLoad={(map, view) => handleMapLoad(map, view, props.activeLayers, handleGlobeUpdating)}
    {...props}/>
}

export default connect(mapStateToProps, actions)(dataGlobeContainer);