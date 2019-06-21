const DEFAULT_OPACITY = 0.6;
export const layerManagerToggle = (layerId, activeLayers, callback, category) => {
  const id = layerId;
  const isActive = activeLayers && activeLayers.some(l => l.id === id);
  if (isActive) {
    const updatedLayers = activeLayers.filter(l => l.id !== id);
    callback({activeLayers: updatedLayers });
  } else {
    activeLayers
      ? callback({ activeLayers: [ ...activeLayers, { id, category, opacity: DEFAULT_OPACITY }] })
      : callback({ activeLayers: [ { id, category, opacity: DEFAULT_OPACITY }] });
  }
};

export const exclusiveLayersToggle = (layerToActivate, layerToRemove, activeLayers, callback, category) => {
  const layerAfterRemove = layerToRemove ? activeLayers.filter(l => l.id !== layerToRemove) : activeLayers;
  callback({activeLayers: [...layerAfterRemove, {id: layerToActivate, category, opacity: DEFAULT_OPACITY }]});
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
      ? callback({ activeLayers: [ ...activeLayers, { id, opacity: DEFAULT_OPACITY }] })
      : callback({ activeLayers: [ { id, opacity: DEFAULT_OPACITY }] });
  }
};

export const layerManagerOpacity = (layerId, opacity, activeLayers, callback) => {
  const setOpacity = (layer) => layer.id === layerId ? { ...layer, opacity } : layer;
  callback({ activeLayers: [ ...activeLayers.map(setOpacity) ]});
};
