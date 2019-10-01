import { includes } from 'lodash';
import { LEGEND_FREE_LAYERS } from 'constants/layers-groups';

export const setLayerOrder = (activeLayers, map) => {
  const { layers } = map;
  const layersToDisplay = layers.items
    .filter(l => !includes(LEGEND_FREE_LAYERS, l.title))
    .reduce((acc, layer) => ({...acc, [layer.title]: layer}), {});
  Object.keys(layersToDisplay).length > 0 && Object.keys(layersToDisplay).reverse().forEach((layer, i) => {
    map.reorder(layersToDisplay[layer], i + LEGEND_FREE_LAYERS.length);
  })
}

export const setOpacity = (layer, activeLayers) => {
  const l = activeLayers.find(o => o.title === layer.title);
  if (l) { layer.opacity = l.opacity !== undefined ? l.opacity : 1 };
}
