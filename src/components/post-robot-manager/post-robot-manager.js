import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import postRobot from 'post-robot';
import { getCoordsFromZipAndCountry } from 'utils/locator-utils';
import { createPointGraphic, createGraphicLayer, simplePictureMarker } from 'utils/graphic-layer-utils';
import signedPledgeLightIcon from 'images/my_pledge.png'
import { SIGNED_PLEDGE_GRAPHIC_LAYER } from 'constants/layers-slugs';
import {
  layerManagerToggle,
  layerManagerOpacity
} from 'utils/layer-manager-utils';
import {
  handleLayerCreation
} from 'utils/layer-manager-utils';
import {
  layersConfig
} from 'constants/mol-layers-configs';

const PostRobotManagerContainer = ({ map, view, activeLayers, listeners, handlePostRobotUpdates }) => {

  const [postRobotEvents, setPostRobotEvents] = useState([])

  useEffect(() => {
    if (listeners) attachPostRobotListeners();
  }, [activeLayers]);

  const toggleLayer = async (layerTitle, activeLayers) => {
    const layerConfig = layersConfig[layerTitle];
    await handleLayerCreation(layerConfig, map);
    layerManagerToggle(layerTitle, activeLayers, handlePostRobotUpdates);
  }

  const addSignedPledgeToMap = (map, view, ZIP, countryCode) => {
    console.log('addSignedPledgeToMap')
    loadModules(["esri/layers/GraphicsLayer", "esri/Graphic", "esri/tasks/Locator"]).then(([
      GraphicsLayer,
      Graphic,
      Locator
    ]) => {
      getCoordsFromZipAndCountry(Locator, ZIP, countryCode).then(data => {
        console.log(data)
          const { x, y } = data;
          const signedPledgeLight = simplePictureMarker(signedPledgeLightIcon);
          const pointGraphic = createPointGraphic(Graphic, signedPledgeLight, x, y);
          const signedPledgeGraphicLayer = createGraphicLayer(GraphicsLayer, pointGraphic, SIGNED_PLEDGE_GRAPHIC_LAYER);
          map.add(signedPledgeGraphicLayer);
          view.goTo({ center: [x, y] });
      }, (error) => {console.warn(error)})
  })
  }


  const attachPostRobotListeners = () => {

    postRobotEvents.length && postRobotEvents.forEach(eventListener => eventListener.cancel());

    const flyListener = postRobot.on('mapFlyToCoordinates', event => {
      const { center = [], zoom = 1 } = event.data; // { center: [4, 5], zoom: 8 }
      if (center.length || zoom) {
        view.goTo({ center, zoom });
        return { done: true };
      }
      return { done: false };
    });

    const layerToggleListener = postRobot.on('setMapLayers', event => { // [ 'Pledges', 'Biodiversity-facets', ... ]
      const { layers = [] } = event.data;
      layers.forEach(layerId => toggleLayer(layerId, activeLayers));
      return { done: true };
    });

    const layerOpacityListener = postRobot.on('setLayersOpacity', event => { // [ { id: 'Pledges', opacity: 1 }, { id: 'Biodiversity', opacity: 0.6 } ] 
      const { layers = [] } = event.data;
      layers.forEach(layer => layerManagerOpacity(layer.id, layer.opacity, activeLayers, handlePostRobotUpdates));
      return { done: true };
    });

    const featuredPledgeListener = postRobot.on('setFeaturedPledge', event => { // { zip: 15002, country: SP }
      const { layer = {} } = event.data;
      addSignedPledgeToMap(map, view, layer.zip, layer.country)
      return { done: true };
    });


    setPostRobotEvents([flyListener, layerToggleListener, layerOpacityListener, featuredPledgeListener]);
  }

  return null;
}

export default PostRobotManagerContainer;