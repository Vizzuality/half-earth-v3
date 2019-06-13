export const layerManagerToggle = (layerId, activeLayers, callback, category) => {
  const id = layerId;
  const isActive = activeLayers && activeLayers.some(l => l.id === id);

  if (isActive) {
    const updatedLayers = activeLayers.filter(l => l.id !== id);
    callback({activeLayers: updatedLayers });
  } else {
    activeLayers
      ? callback({ activeLayers: [ ...activeLayers, { id, category }] })
      : callback({ activeLayers: [ { id, category }] });
  }
};

export const exclusiveLayersToggle = (layerToActivate, layerToRemove, activeLayers, callback, category) => {
  const layerAfterRemove = layerToRemove ? activeLayers.filter(l => l.id !== layerToRemove) : activeLayers;
  callback({activeLayers: [...layerAfterRemove, {id: layerToActivate, category}]});
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
      ? callback({ activeLayers: [ ...activeLayers, { id }] })
      : callback({ activeLayers: [ { id }] });
  }
};

export const layerManagerOpacity = (layerId, opacity, activeLayers, callback) => {
  const setOpacity = (layer) => layer.id === layerId ? { ...layer, opacity } : layer;
  callback({ activeLayers: [ ...activeLayers.map(setOpacity) ]});
};
