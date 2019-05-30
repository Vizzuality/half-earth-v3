export const layerManagerToggle = (layerTitle, activeLayers, callback) => {
  const title = layerTitle;
    const isActive = activeLayers && activeLayers.some(l => l.title === title);
    if (isActive) {
      const updatedLayers = activeLayers.filter(l => l.title !== title)
      callback({activeLayers: updatedLayers })
    } else {
      activeLayers ?
      callback({ activeLayers: [ ...activeLayers, { title }] }) :
      callback({ activeLayers: [ { title }] })
    }
  }