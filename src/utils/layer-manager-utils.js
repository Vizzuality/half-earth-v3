import { FIREFLY_LAYER } from 'constants/base-layers';
import { BIODIVERSITY_FACETS_LAYER } from 'constants/biodiversity';
import { loadModules } from '@esri/react-arcgis';

const DEFAULT_OPACITY = 0.6;

export const layerManagerToggle = (layerId, activeLayers, callback, category) => {
  const id = layerId;
  const isActive = activeLayers && activeLayers.some(l => l.id === id);
  if (isActive) {
    const updatedLayers = activeLayers.filter(l => l.id !== id);
    callback({activeLayers: updatedLayers });
  } else {
    activeLayers
      ? callback({ activeLayers: [{ id, category, opacity: DEFAULT_OPACITY }].concat(activeLayers) })
      : callback({ activeLayers: [ { id, category, opacity: DEFAULT_OPACITY }] });
  }
};

export const exclusiveLayersToggle = (layerToActivate, layerToRemove, activeLayers, callback, category) => {
  const layersAfterRemove = layerToRemove ? activeLayers.filter(l => l.id !== layerToRemove) : activeLayers;
  callback({ activeLayers: [{ id: layerToActivate, category, opacity: DEFAULT_OPACITY }].concat(layersAfterRemove)})
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
  const updatedLayers = activeLayers.filter(({ id }) => id === FIREFLY_LAYER || id === BIODIVERSITY_FACETS_LAYER);
  datasets.forEach((d) => { updatedLayers.push(activeLayers.find(({ id }) => d === id )) });
  callback({ activeLayers: updatedLayers });
};

export const createLayer = (layer, map) => {
  return loadModules(["esri/layers/WebTileLayer"]).then(([WebTileLayer]) => {
    const { url, title, slug } = layer;
    const tileLayer = new WebTileLayer({
      urlTemplate: url,
      title: title,
      id: slug,
      opacity: DEFAULT_OPACITY
    })
    map.add(tileLayer);
  });
}