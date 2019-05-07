export const layerManagerToggle = (event, targetId, activeLayers, callback) => {
const id = event.target.getAttribute(targetId);
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