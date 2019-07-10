import { LEGEND_FREE_LAYERS } from 'constants/layers-groups';
import { loadModules } from '@esri/react-arcgis';

const DEFAULT_OPACITY = 0.6;

export const layerManagerToggle = (layerTitle, activeLayers, callback, category) => {
  const title = layerTitle;
  const isActive = activeLayers && activeLayers.some(l => l.title === title);
  if (isActive) {
    const updatedLayers = activeLayers.filter(l => l.title !== title);
    callback({activeLayers: updatedLayers });
  } else {
    activeLayers
      ? callback({ activeLayers: [{ title, category, opacity: DEFAULT_OPACITY }].concat(activeLayers) })
      : callback({ activeLayers: [ { title, category, opacity: DEFAULT_OPACITY }] });
  }
};

export const exclusiveLayersToggle = (layerToActivate, layerToRemove, activeLayers, callback, category) => {
  const layersAfterRemove = layerToRemove ? activeLayers.filter(l => l.title !== layerToRemove) : activeLayers;
  callback({ activeLayers: [{ title: layerToActivate, category, opacity: DEFAULT_OPACITY }].concat(layersAfterRemove)})
};

export const layerManagerVisibility = (layerId, visible, activeLayers, callback) => {
  const id = layerId;
  const isActive = activeLayers && activeLayers.some(l => l.id === id);
  if (isActive && visible) return;
  if (isActive && !visible) {
    const updatedLayers = activeLayers.filter(l => l.id !== id);
    callback({activeLayers: updatedLayers });
  } else {
    activeLayers
      ? callback({ activeLayers: [{ id, opacity: DEFAULT_OPACITY }].concat(activeLayers) })
      : callback({ activeLayers: [ { id, opacity: DEFAULT_OPACITY }] });
  }
};

export const layerManagerOpacity = (layerId, opacity, activeLayers, callback) => {
  const setOpacity = (layer) => layer.id === layerId ? { ...layer, opacity } : layer;
  callback({ activeLayers: [ ...activeLayers.map(setOpacity) ]});
};

export const layerManagerOrder = (datasets, activeLayers, callback) => {
  const updatedLayers = activeLayers.filter(({ id }) => LEGEND_FREE_LAYERS.some(layer =>layer === id));
  datasets.forEach((d) => { updatedLayers.push(activeLayers.find(({ id }) => d === id )) });
  callback({ activeLayers: updatedLayers });
};

export const createLayer = (layer, map) => {
  return loadModules(["esri/layers/WebTileLayer"]).then(([WebTileLayer]) => {
    const { url, title, slug } = layer;
    const tileLayer = new WebTileLayer({
      urlTemplate: url,
      title: slug,
      id: slug,
      opacity: DEFAULT_OPACITY
    })
    map.add(tileLayer);
  });
}