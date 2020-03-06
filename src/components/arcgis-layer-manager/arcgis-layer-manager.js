import { useEffect } from 'react';
import { setLayerOrder, setOpacity } from 'utils/arcgis-layer-manager-utils';

const ArcgisLayerManager = ({ map, activeLayers, customFunctions }) => {
  // Map prop is inherited from Webscene component
  // reference: https://github.com/Esri/react-arcgis#advanced-usage
  
  const { layers } = map;
  const { items } = layers;
  
  useEffect(() => {
    items.forEach(sceneLayer => {
      const isVisible = activeLayers.some(activeLayer => activeLayer.title === sceneLayer.title)
      if (isVisible) {
        sceneLayer.visible = true;
        setOpacity(sceneLayer, activeLayers);
      } else {
        sceneLayer.visible = false;
      }
      customFunctions && customFunctions.forEach(fn => fn({ layer: sceneLayer, isVisible }))
    })
    setLayerOrder(activeLayers, map);
  }, [activeLayers])

  return null
}

export default ArcgisLayerManager;