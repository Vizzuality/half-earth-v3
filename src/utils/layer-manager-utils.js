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