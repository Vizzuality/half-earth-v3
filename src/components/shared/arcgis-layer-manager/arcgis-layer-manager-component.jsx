const ArcgisLagerManager = ({ map, activeLayers }) => {
  // Map prop is inherited from Webscene component
  // reference: https://github.com/Esri/react-arcgis#advanced-usage
  const { layers } = map;
  layers.items.forEach(mapLayer => {
    const setActive = activeLayers && activeLayers.some(activeLayer => activeLayer.id === mapLayer.id);
    if (setActive) {
      mapLayer.visible = true;
    } else {
      mapLayer.visible = false;
    }
  })
  return null
}

export default ArcgisLagerManager;