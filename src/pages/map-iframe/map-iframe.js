import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import postRobot from 'post-robot';

import { loadModules } from 'esri-loader';

import { PLEDGES_LAYER, SIGNED_PLEDGE_GRAPHIC_LAYER } from 'constants/layers-slugs';
import { PLEDGES_LAYER_URL } from 'constants/layers-urls';
import { 
  layerManagerToggle,
  layerManagerOpacity
} from 'utils/layer-manager-utils';
import { layersConfig } from 'constants/mol-layers-configs';
import { createLayer, addLayerToMap } from 'utils/layer-manager-utils';
import { getCoordsFromZipAndCountry } from 'utils/locator-utils';
import { createPointGraphic, createGraphicLayer, simplePictureMarker } from 'utils/graphic-layer-utils';

import Component from './map-iframe-component.jsx';
import mapStateToProps from './map-iframe-selectors';
import pledgeLightIcon from 'icons/pledge.svg'
import signedPledgeLightIcon from 'images/my_pledge.png'

import ownActions from './map-iframe-actions.js';
const actions = { ...ownActions };

const addSignedPledgeToMap = (map, view, signedPledgeZIP, signedPledgeCountry) => {
  loadModules(["esri/layers/GraphicsLayer", "esri/Graphic", "esri/tasks/Locator"]).then(([
    GraphicsLayer,
    Graphic,
    Locator
  ]) => {
    getCoordsFromZipAndCountry(Locator, signedPledgeZIP, signedPledgeCountry).then(data => {
        const { x, y } = data;
        const signedPledgeLight = simplePictureMarker(signedPledgeLightIcon);
        const pointGraphic = createPointGraphic(Graphic, signedPledgeLight, x, y);
        const signedPledgeGraphicLayer = createGraphicLayer(GraphicsLayer, pointGraphic, SIGNED_PLEDGE_GRAPHIC_LAYER);
        map.add(signedPledgeGraphicLayer);
        view.goTo({ center: [x, y] });
    }, (error) => {console.warn(error)})
})
}

const handleMapLoad = (map, view, activeLayers, isPledgesActive, signedPledgeZIP, signedPledgeCountry) => {


  // pledges layer
  loadModules([
    'esri/layers/FeatureLayer'
  ]).then(([
    FeatureLayer
  ]) => {
    const layer = new FeatureLayer({
      title: PLEDGES_LAYER,
      url: PLEDGES_LAYER_URL,
      renderer: {
        type: 'simple',
        symbol: simplePictureMarker(pledgeLightIcon)
      },
      featureReduction: { type: 'selection' }
    });
    
    layer.visible = activeLayers.find(l => l.title === PLEDGES_LAYER) || isPledgesActive === 'true';
    map.add(layer);
  })

  if (signedPledgeZIP && signedPledgeCountry) {
    addSignedPledgeToMap(map, view, signedPledgeZIP, signedPledgeCountry);
  }

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
    onLoad={(map, view) => handleMapLoad(map, view, props.activeLayers, props.isPledgesActive, props.signedPledgeZIP, props.signedPledgeCountry)}
    {...props}/>
}

export default connect(mapStateToProps, actions)(dataGlobeContainer);