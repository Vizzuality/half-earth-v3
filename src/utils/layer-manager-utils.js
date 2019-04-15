export const layerManagerToggle = (event, targetId, activeLayers, query, callback) => {
const id = event.target.getAttribute(targetId);
    const isActive = activeLayers && activeLayers.some(l => l.id === id);
    if (isActive) {
      const updatedLayers = activeLayers.filter(l => l.id !== id)
      callback({ query: { ...query, activeLayers: updatedLayers }})
    } else {
      activeLayers ?
      callback({ query: {...query, activeLayers: [ ...activeLayers, { id }] }}) :
      callback({ query: {...query, activeLayers: [ { id }] }})
    }
  }