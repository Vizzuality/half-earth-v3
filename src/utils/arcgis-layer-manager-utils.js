import { includes } from 'lodash';
import { LEGEND_FREE_LAYERS } from 'constants/layers-groups';

export const setLayersOrder = (activeLayers, map) => {
  const { layers } = map;
  const { items } = layers;
  const activeLayersIds = activeLayers.filter((l) => !includes(LEGEND_FREE_LAYERS, l.title)).map((l) => l.title);
  const visibleLayers = items.reduce((acc, layer) => (
    !layer.visible ? { ...acc } : { ...acc, [layer.title]: layer }
  ), {});
  const reversedLayers = [...activeLayersIds].reverse();
  reversedLayers.forEach((layer, i) => {
    map.reorder(visibleLayers[layer], i);
  });
};

const setOpacity = (layer, activeLayers) => {
  const activeLayer = activeLayers.find((o) => o.title === layer.title);
  if (activeLayer) {
    layer.opacity = activeLayer.opacity !== undefined ? activeLayer.opacity : 1;
  }
};

export const setLayersVisibility = (activeLayers, sceneLayers, customFunctions) => {
  sceneLayers.forEach((sceneLayer) => {
    const isVisible = activeLayers.some(
      (activeLayer) => activeLayer.title === sceneLayer.title,
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
  });
};
