import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import postRobot from 'post-robot';

import { loadModules } from 'esri-loader';

import { LAND_HUMAN_PRESSURES_IMAGE_LAYER, PLEDGES_LAYER } from 'constants/layers-slugs';
import { PLEDGES_LAYER_URL } from 'constants/layers-urls';
import { 
  layerManagerToggle,
  layerManagerOpacity
} from 'utils/layer-manager-utils';
import { layersConfig } from 'constants/mol-layers-configs';
import { createLayer, addLayerToMap } from 'utils/layer-manager-utils';

import Component from './map-iframe-component.jsx';
import mapStateToProps from './map-iframe-selectors';
import pledgeLightIcon from 'icons/pledge.svg'

import ownActions from './map-iframe-actions.js';
import { handleLayerCreation } from '../../utils/layer-manager-utils.js';
const actions = { ...ownActions };

const pledgeLight = {
  type: "point-3d", // autocasts as new PointSymbol3D()
  symbolLayers: [
    {
      type: "icon", // autocasts as new IconSymbol3DLayer()
      resource: {
        href: pledgeLightIcon // move the pledge icon to contentful?
      },
      size: 15
    }
  ]
};

const handleMapLoad = (map, view, activeLayers, isPledgesActive) => {

  // This fix has been added as a workaround to a bug introduced on v4.12
  // The bug was causing the where clause of the mosaic rule to not work
  // It will be probably fixed on v4.13
  const layerConfig = layersConfig[LAND_HUMAN_PRESSURES_IMAGE_LAYER];
  const humanImpactLayer = handleLayerCreation(layerConfig, map);
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

  // pledges layer
  loadModules([
    'esri/layers/FeatureLayer'
  ]).then(([
    FeatureLayer
  ]) => {
    const layer = new FeatureLayer({
      url: PLEDGES_LAYER_URL,
      renderer: {
        type: 'simple',
        symbol: pledgeLight
      },
      featureReduction: { type: 'selection' }
    });
    
    layer.visible = activeLayers.find(l => l.title === PLEDGES_LAYER) || isPledgesActive === 'true';
    map.add(layer);
  })

  const biodiversityLayerIDs = activeLayers
    .filter(({ category }) => category === "Biodiversity")
    .map(({ id }) => id);

  biodiversityLayerIDs.forEach(layerName => {
      const layerConfig = layersConfig[layerName];
      const newLayer = createLayer(layerConfig);
      addLayerToMap(newLayer, map);
    });
}

const dataGlobeContainer = props => {
  const attachPostRobotListeners = () => {
    postRobot.on('mapFlyToCoordinates', event => {
      const { center = [], zoom = 1 } = event.data; // { center: [4, 5], zoom: 8 }
      if (center.length || zoom) {
        flyToLocation(center, zoom);
        return { done: true };
      }
      return { done: false };
    });
    postRobot.on('setMapLayers', event => { // [ 'Pledges', 'Biodiversity-facets', ... ]
      const { layers = [] } = event.data;
      layers.forEach(layerId => toggleLayer(layerId));
      return { done: true };
    });
    postRobot.on('setLayersOpacity', event => { // [ { id: 'Pledges', opacity: 1 }, { id: 'Biodiversity', opacity: 0.6 } ] 
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
    onLoad={(map, view) => handleMapLoad(map, view, props.activeLayers, props.isPledgesActive)}
    {...props}/>
}

export default connect(mapStateToProps, actions)(dataGlobeContainer);