import { includes } from 'lodash';
import { LEGEND_FREE_LAYERS } from 'constants/layers-groups';
import { USER_CONFIG_LAYER_GROUPS } from 'constants/layers-groups';

export const setLayersOrder = (activeLayers, map) => {
  const { layers } = map;
  const { items } = layers;
  const activeLayersIds = activeLayers.filter(l => !includes(LEGEND_FREE_LAYERS, l.title)).map(l => l.title);
  const visibleLayers = items.reduce((acc, layer) => (
    !layer.visible ? {...acc} : { ...acc, [layer.title]: layer}
    ), {});
    const reversedLayers = [...activeLayersIds].reverse();
    const baseLayersNumber = Object.keys(visibleLayers).length - Object.keys(activeLayersIds).length;
  reversedLayers.forEach((layer, i) => {
    map.reorder(visibleLayers[layer], i + baseLayersNumber);
  })
}

const setOpacity = (layer, activeLayers) => {
  const l = activeLayers.find(o => o.title === layer.title);
  if (l) { layer.opacity = l.opacity !== undefined ? l.opacity : 1 };
}

export const setLayersVisibility = (activeLayers, sceneLayers, customFunctions) => {
  sceneLayers.forEach((sceneLayer) => {
    const isVisible = activeLayers.some(
      (activeLayer) => activeLayer.title === sceneLayer.title
    );
    sceneLayer.visible = isVisible;
    // Show only active layers
    if (isVisible) {
      setOpacity(sceneLayer, activeLayers);
    }
    // Apply visibility for customFunctions (not serialized)
    if (customFunctions) {
      customFunctions.forEach((fn) => fn({ layer: sceneLayer, isVisible }));
    }
  })
}


export const updateSceneLayersBasedOnUserConfig = (userConfig, sceneLayers) => {
  if (userConfig) {
    sceneLayers.forEach(sceneLayer => {
      Object.keys(userConfig.layers).forEach((layerGroupKey) => {
        if (
          USER_CONFIG_LAYER_GROUPS[layerGroupKey].includes(sceneLayer.title)
        ) {
          sceneLayer.visible = userConfig.layers[layerGroupKey];
        }
      });
    })
  }
}
