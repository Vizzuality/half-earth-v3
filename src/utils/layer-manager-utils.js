export const layerManagerToggle = (layerId, activeLayers, callback) => {
  const id = layerId;
  const isActive = activeLayers && activeLayers.some(l => l.id === id);
  if (isActive) {
    const updatedLayers = activeLayers.filter(l => l.id !== id)
    callback({activeLayers: updatedLayers })
  } else {
    activeLayers ?
    callback({ activeLayers: [ ...activeLayers, { id }] }) :
    callback({ activeLayers: [ { id }] })
  }
}

export const exclusiveLayersToggle = (layerToActivate, layerToRemove, activeLayers, callback) => {
  const layerAfterRemove = layerToRemove ? activeLayers.filter(l => l.id !== layerToRemove) : activeLayers;
  callback({activeLayers: [...layerAfterRemove, {id: layerToActivate}]});
}

export const layerManagerVisibility = (layerId, visible, activeLayers, callback) => {
  const id = layerId;
  const isActive = activeLayers && activeLayers.some(l => l.id === id);
  if (isActive && visible) return;
  if (isActive && !visible) {
    const updatedLayers = activeLayers.filter(l => l.id !== id);
    callback({activeLayers: updatedLayers });
  } else {
    activeLayers ?
    callback({ activeLayers: [ ...activeLayers, { id }] }) :
    callback({ activeLayers: [ { id }] })
  }
}

export const layerManagerOpacity = (layerId, opacity, activeLayers, callback) => {
  const updatedLayers = activeLayers.filter(l => l.id !== layerId);
  callback({ activeLayers: [ ...updatedLayers, { id: layerId, opacity } ] })
}
