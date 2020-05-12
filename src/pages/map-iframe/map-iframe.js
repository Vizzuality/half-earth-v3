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
import { createLayer, addLayerToMap, handleLayerCreation } from 'utils/layer-manager-utils';
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

const handleMapLoad = (map, view, activeLayers, setDataGlobeSettings, listeners) => {

  const biodiversityLayerIDs = activeLayers
    //.filter(({ category }) => category === "Biodiversity")
    .map(({ title }) => title);

  biodiversityLayerIDs.forEach(layerName => {
      const layerConfig = layersConfig[layerName];
      const newLayer = createLayer(layerConfig);
      addLayerToMap(newLayer, map);
    });

    const toggleLayer = async layerTitle => {
        const layerConfig = layersConfig[layerTitle];
        await handleLayerCreation(layerConfig, map);
        layerManagerToggle(layerTitle, activeLayers, setDataGlobeSettings);
      }

    const attachPostRobotListeners = () => {
      // postRobot.on('mapFlyToCoordinates', event => {
      //   console.log('Changing location')
      //   const { center = [], zoom = 1 } = event.data; // { center: [4, 5], zoom: 8 }
      //   if (center.length || zoom) {
      //     flyToLocation(center, zoom);
      //     return { done: true };
      //   }
      //   return { done: false };
      // });
      postRobot.on('setMapLayers', event => { // [ 'Pledges', 'Biodiversity-facets', ... ]
        const { layers = [] } = event.data;
        layers.forEach(layerId => toggleLayer(layerId));
        return { done: true };
      });
      // postRobot.on('setLayersOpacity', event => { // [ { id: 'Pledges', opacity: 1 }, { id: 'Biodiversity', opacity: 0.6 } ] 
      //   const { layers = [] } = event.data;
      //   layers.forEach(layer => setLayerOpacity(layer.id, layer.opacity));
      //   return { done: true };
      // });
    }

    if(listeners) attachPostRobotListeners();
}


const dataGlobeContainer = props => {
  
  // const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, props.setDataGlobeSettings, props.activeCategory);
  // const setLayerOpacity = (layerId, opacity) => layerManagerOpacity(layerId, opacity, props.activeLayers, props.setDataGlobeSettings);
  // const flyToLocation = (center, zoom) => console.log('updating location to', center, zoom) || props.setDataGlobeSettings({ center, zoom });
  // const handleZoomChange = props.setDataGlobeSettings;
  
  return <Component
    // handleLayerToggle={toggleLayer}
    // handleZoomChange={handleZoomChange}
    onLoad={(map, view) => handleMapLoad(map, view, props.activeLayers, props.setDataGlobeSettings, props.listeners)}
    {...props}/>
}

export default connect(mapStateToProps, actions)(dataGlobeContainer);