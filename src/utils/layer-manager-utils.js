import { LEGEND_FREE_LAYERS } from 'constants/layers-groups';
import { loadModules } from '@esri/react-arcgis';
import { WDPALayers } from 'constants/protected-areas';
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';

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

export const createLayer = (layer, map) => {
  return loadModules(["esri/layers/WebTileLayer"]).then(([WebTileLayer]) => {
    const { url, slug } = layer;
    const tileLayer = new WebTileLayer({
      urlTemplate: url,
      title: slug,
      id: slug,
      opacity: DEFAULT_OPACITY
    })
    map.add(tileLayer);
  });
}

export const handleLayerRendered = (view, layer, handleGlobeUpdating) => {
  view.whenLayerView(layer).then(mapLayerView => {
    mapLayerView.watch("updating", updating => {
      if(!updating) { handleGlobeUpdating(false) }
    })
  })
}

export const getToggledLayer = (layers, option) => {
  return layers.reduce((wantedLayer, currentLayer) => {
    if(wantedLayer) return wantedLayer;
    if(currentLayer.title === option.id) return currentLayer;
    if(currentLayer.layers) return currentLayer.layers.items.find(layer => layer.title === option.id);
    return wantedLayer;
  }, null)
}

export const toggleWDPALayer = (activeLayers, option, handleGlobeUpdating, view, map, handleLayerToggle) => {
  const layerNotRendered = !activeLayers.some(layer => layer.title === option.id);

  const alreadyChecked = WDPALayers.reduce((acc, option) => ({
    ...acc, [option.value]: activeLayers.some(layer => layer.title === option.title)
  }), {});
  
  const layerToggled = getToggledLayer(map.layers.items, option);
  
  if (layerNotRendered) {
    handleGlobeUpdating(true);
  }

  handleLayerToggle(option.id);
  handleLayerRendered(view, layerToggled, handleGlobeUpdating);

  const isLayerActive = alreadyChecked[option.value];
  if (isLayerActive) addLayerAnalyticsEvent({ slug: option.slug })
  else removeLayerAnalyticsEvent({ slug: option.slug });
}