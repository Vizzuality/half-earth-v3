import { includes } from 'lodash';
import { LEGEND_FREE_LAYERS } from 'constants/layers-groups';

export const setLayerOrder = (activeLayers, map) => {
  const { layers } = map;
  const activeLayersIds = activeLayers.filter(l => !includes(LEGEND_FREE_LAYERS, l.title)).map(l => l.title);
  const visibleLayers = layers.items.reduce((acc, layer) => {
    const subLayers = layer.layers;
    const isSublayerActive = subLayers && subLayers.items.some(l => includes(activeLayersIds, l.title))
    const layerKeyValue = isSublayerActive 
      ? {[subLayers.items.filter(l => includes(activeLayersIds, l.title))[0].title]: layer}
      : {[layer.title]: layer}
    return {...acc, ...layerKeyValue}
  }, {});
  const reversedLayers = [...activeLayersIds].reverse();
  reversedLayers.forEach((layer, i) => {
    map.reorder(visibleLayers[layer], i + LEGEND_FREE_LAYERS.length);
  })
}

export const setOpacity = (layer, activeLayers) => {
  const l = activeLayers.find(o => o.title === layer.title);
  if (l) { layer.opacity = l.opacity !== undefined ? l.opacity : 1 };
}

// export default ArcgisLayerManager;