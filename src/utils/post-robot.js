export const attachPostRobotListeners = (postRobot, actions) => {
  const { flyToLocation, toggleLayer, setLayerOpacity } = actions;
  postRobot.on('mapFlyToCoordinates', event => {
    const { center = [], zoom = 1 } = event.data;
    if (center.length || zoom) {
      flyToLocation(center, zoom);
      return { done: true };
    }
    return { done: false };
  });
  postRobot.on('setMapLayers', event => {
    const { layers = [] } = event.data;
    layers.forEach(layerId => toggleLayer(layerId));
    return { done: true };
  });
  postRobot.on('setLayersOpacity', event => {
    const { layers = [] } = event.data;
    layers.forEach(layer => setLayerOpacity(layer.id, layer.opacity));
    return { done: true };
  });
}