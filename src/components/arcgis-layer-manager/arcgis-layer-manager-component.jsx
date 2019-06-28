const ArcgisLayerManager = ({ map, activeLayers }) => {
  // Map prop is inherited from Webscene component
  // reference: https://github.com/Esri/react-arcgis#advanced-usage
  const { layers } = map;

  const setOpacity = (layer) => {
    const l = activeLayers.find(o => o.id === layer.id);
    if (l) { layer.opacity = l.opacity !== undefined ? l.opacity : 1 };
  }

  layers.items.forEach(mapLayer => {
    const setActive = activeLayers && activeLayers.some(activeLayer => activeLayer.id === mapLayer.id);
    mapLayer.layers && mapLayer.layers.items && mapLayer.layers.items.forEach(layer => {
      const setActive = activeLayers && activeLayers.some(activeLayer => activeLayer.id === layer.id);
      setOpacity(layer);
      layer.visible = !!setActive;
      mapLayer.visible = !!setActive;
    })
    setOpacity(mapLayer);    
    mapLayer.visible = !!setActive;
  })
  return null
}

export default ArcgisLayerManager;