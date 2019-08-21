import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import { setLayerOrder, setOpacity } from 'utils/arcgis-layer-manager-utils';

const ArcgisLayerManager = ({ map, activeLayers, isLandscapeMode }) => {
  // Map prop is inherited from Webscene component
  // reference: https://github.com/Esri/react-arcgis#advanced-usage
  
  const { layers } = map;
  setLayerOrder(activeLayers, map);

  layers.items.forEach(mapLayer => {
    const setActive = activeLayers && activeLayers.some(activeLayer => activeLayer.title === mapLayer.title);
    mapLayer.layers && mapLayer.layers.items && mapLayer.layers.items.forEach(layer => {
      const setActive = activeLayers && activeLayers.some(activeLayer => activeLayer.title === layer.title);
      setOpacity(layer, activeLayers);
      layer.visible = !!setActive;
      mapLayer.visible = !!setActive;
    })
    setOpacity(mapLayer, activeLayers);

    // Hide human_pressures_layer where they are not in landscape mode
    if(mapLayer.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER) {
      mapLayer.visible = isLandscapeMode && setActive;
    }
  })
  return null
}

export default ArcgisLayerManager;