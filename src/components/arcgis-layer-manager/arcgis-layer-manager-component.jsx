const ArcgisLayerManager = ({ map, activeLayers }) => {
  // Map prop is inherited from Webscene component
  // reference: https://github.com/Esri/react-arcgis#advanced-usage
  const { layers } = map;
  layers.items.forEach(mapLayer => {
    const setActive = activeLayers && activeLayers.some(activeLayer => activeLayer.id === mapLayer.id);
    mapLayer.layers && mapLayer.layers.items && mapLayer.layers.items.forEach(layer => {
      const setActive = activeLayers && activeLayers.some(activeLayer => activeLayer.id === layer.id);
      layer.visible = !!setActive;
      mapLayer.visible = !!setActive;
    })
    mapLayer.visible = !!setActive;
  })
  return null
}

export default ArcgisLayerManager;