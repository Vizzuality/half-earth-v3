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

export const layerManagerOpacity = (layerTitle, opacity, activeLayers, callback) => {
  const setOpacity = (layer) => layer.title === layerTitle ? { ...layer, opacity } : layer;
  callback({ activeLayers: [ ...activeLayers.map(setOpacity) ]});
};

export const layerManagerOrder = (datasets, activeLayers, callback) => {
  const updatedLayers = activeLayers.filter(({ title }) => LEGEND_FREE_LAYERS.some(layer => layer === title));
  datasets.forEach((d) => { updatedLayers.push(activeLayers.find(({ title }) => d === title )) });
  callback({ activeLayers: updatedLayers });
};

export const createLayer = (layer) => {
  return loadModules(["esri/layers/WebTileLayer"]).then(([WebTileLayer]) => {
    const { url, slug } = layer;
    const tileLayer = new WebTileLayer({
      urlTemplate: url,
      title: slug,
      id: slug,
      opacity: DEFAULT_OPACITY
    })
    return tileLayer;
  });
}

export const addLayer = (layer, map, view, handleGlobeUpdating) => {
  handleGlobeUpdating(true);
  map.add(layer)
  handleLayerRendered(view, layer, handleGlobeUpdating);
}

export const handleLayerRendered = (view, layer, handleGlobeUpdating) => {
  view.whenLayerView(layer).then(mapLayerView => {
    mapLayerView.watch("updating", updating => {
      if(!updating) { handleGlobeUpdating(false) }
    })
  })
}