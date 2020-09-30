import { LEGEND_FREE_LAYERS } from 'constants/layers-groups';
import { intersection } from 'lodash';
import { loadModules } from 'esri-loader';
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import { DEFAULT_OPACITY, LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

export const batchLayerManagerToggle = (layerNamesArray, activeLayers, callback, category) => {
  const activeLayersNamesArray = activeLayers ? activeLayers.map(l => l.title) : [];
  const areActive = activeLayers && intersection(layerNamesArray, activeLayersNamesArray).length > 0;
  if (areActive) {
    const updatedLayers = layerNamesArray.reduce((acc, title) => {
      removeLayerAnalyticsEvent({ slug: title });
      return [...acc.filter(l => l.title !== title)];
    }, activeLayers);
    callback({activeLayers: updatedLayers });
  } else {
    const layersToAdd = layerNamesArray.map(title => {
      addLayerAnalyticsEvent({ slug: title });
      return { title, category, opacity: DEFAULT_OPACITY }
    });
    activeLayers
      ? callback({ activeLayers: layersToAdd.concat(activeLayers) })
      : callback({ activeLayers: layersToAdd });
  }
}

export const layerManagerToggle = (layerTitle, activeLayers, callback, category) => {
  const title = layerTitle;
  const isActive = activeLayers && activeLayers.some(l => l.title === title);
  if (isActive) {
    const updatedLayers = activeLayers.filter(l => l.title !== title);
    callback({activeLayers: updatedLayers });
    removeLayerAnalyticsEvent({ slug: title });
  } else if (category === LAYERS_CATEGORIES.LAND_PRESSURES) {
    const groupLayer = activeLayers.find(l => l.category === LAYERS_CATEGORIES.LAND_PRESSURES);
    const groupOpacity = groupLayer && groupLayer.opacity;
    addLayerAnalyticsEvent({ slug: title })
    activeLayers
      ? callback({ activeLayers: [{ title, category, opacity: groupOpacity || DEFAULT_OPACITY }].concat(activeLayers) })
      : callback({ activeLayers: [ { title, category, opacity: groupOpacity || DEFAULT_OPACITY }] });
  } else {
    addLayerAnalyticsEvent({ slug: title });
    activeLayers
      ? callback({ activeLayers: [{ title, category, opacity: DEFAULT_OPACITY }].concat(activeLayers) })
      : callback({ activeLayers: [ { title, category, opacity: DEFAULT_OPACITY }] });
  }
};

export const addLayerToActiveLayers = async (
  slug,
  activeLayers,
  callback,
  category
) => {
  addLayerAnalyticsEvent({ slug });
  const newActiveLayer = [{ title: slug, opacity: DEFAULT_OPACITY, category }];
  return callback({
    activeLayers: activeLayers
      ? newActiveLayer.concat(activeLayers)
      : newActiveLayer
  });
};

export const replaceLayerFromActiveLayers = (
  slugToRemove,
  slugToAdd,
  activeLayers,
  callback,
  category
) => {
  addLayerAnalyticsEvent({ slug: slugToAdd });
  removeLayerAnalyticsEvent({ slug: slugToRemove });
  const filteredLayers = activeLayers.filter((layer) => layer.title !== slugToRemove);
  return callback({
    activeLayers: [
      { title: slugToAdd, category, opacity: DEFAULT_OPACITY },
      ...filteredLayers
    ]
  });
};
export const layerManagerVisibility = (layerTitle, visible, activeLayers, callback) => {
  const title = layerTitle;
  const isActive = activeLayers && activeLayers.some(l => l.title === title);
  if (isActive && visible) return;
  if (isActive && !visible) {
    const updatedLayers = activeLayers.filter(l => l.title !== title);
    callback({activeLayers: updatedLayers });
  } else {
    activeLayers
      ? callback({ activeLayers: [{ title, opacity: DEFAULT_OPACITY }].concat(activeLayers) })
      : callback({ activeLayers: [ { title, opacity: DEFAULT_OPACITY }] });
  }
};

export const batchLayerManagerOpacity = (layerNamesArray, opacity, activeLayers, callback) => {
  const setOpacity = (layer) => layerNamesArray.includes(layer.title) ? { ...layer, opacity } : layer;
  callback({ activeLayers: [ ...activeLayers.map(setOpacity) ]});
};

export const layerManagerOpacity = (layerTitle, opacity, activeLayers, callback) => {
  const setOpacity = (layer) => layer.title === layerTitle ? { ...layer, opacity } : layer;
  callback({ activeLayers: [ ...activeLayers.map(setOpacity) ]});
};

export const layerManagerOrder = (legendLayers, activeLayers, callback) => {
  const updatedLayers = activeLayers.filter(({ title }) => LEGEND_FREE_LAYERS.some(layer => layer === title));
  legendLayers.forEach((d) => { updatedLayers.push(activeLayers.find(({ title }) => d === title )) });
  callback({ activeLayers: updatedLayers });
};

export const createLayer = layerConfig => {
  const { url, slug, type } = layerConfig;
  const layerType = type || 'WebTileLayer';
  return loadModules([`esri/layers/${layerType}`]).then(([layer]) => {
    return new layer({
      url: url,
      urlTemplate: url,
      title: slug,
      id: slug,
      opacity: DEFAULT_OPACITY
    })
  });
}
export const addLayerToMap = (mapLayer, map) => new Promise((resolve, reject) => {
  map.add(mapLayer);
  resolve(mapLayer);
});
export const findLayerInMap = (layerTitle, map) => map.layers.items.find(l => l.title === layerTitle);
export const isLayerInMap = (layerConfig, map) => map.layers.items.some(l => l.title === layerConfig.slug);

export const activateLayersOnLoad = (map, activeLayers, config) => {
  const activeLayerIDs = activeLayers.map(({ title }) => title);

    activeLayerIDs.forEach(async layerName => {
      const layerConfig = config[layerName];
      if (layerConfig) {
        const newLayer = await createLayer(layerConfig, map);
        newLayer.outFields = ["*"];
        addLayerToMap(newLayer, map);
      }
    });
}
