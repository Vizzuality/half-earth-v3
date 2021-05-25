import { useEffect, useState } from 'react';
import { addSignedPledgeToMap } from 'utils/constant-contact-layers-utils';
import postRobot from 'post-robot';

import {
  layerManagerToggle,
  layerManagerOpacity
} from 'utils/layer-manager-utils';
import {
  layersConfig
} from 'constants/layers-config';

const PostRobotManagerContainer = ({ map, view, activeLayers, listeners, handlePostRobotUpdates }) => {

  const [postRobotEvents, setPostRobotEvents] = useState([])

  useEffect(() => {
    if (listeners) attachPostRobotListeners();
  }, [activeLayers]);

  const toggleLayer = async (layerTitle, activeLayers) => {
    const layerConfig = layersConfig[layerTitle];
    if (!layerConfig) return;
    layerManagerToggle(layerTitle, activeLayers, handlePostRobotUpdates);
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

    const layerToggleListener = postRobot.on('setMapLayer', event => { // [ 'Pledges', 'Biodiversity-facets', ... ]
      const { layer = '' } = event.data;
      toggleLayer(layer, activeLayers);
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