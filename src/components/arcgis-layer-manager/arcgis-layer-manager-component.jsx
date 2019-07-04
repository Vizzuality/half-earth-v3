import { includes } from 'lodash';
import { LEGEND_FREE_LAYERS } from 'constants/layers-groups';

const ArcgisLayerManager = ({ map, activeLayers }) => {
  // Map prop is inherited from Webscene component
  // reference: https://github.com/Esri/react-arcgis#advanced-usage
  const { layers } = map;

  const setLayerOrder = activeLayers => {
    const activeLayersIds = activeLayers.filter(l => !includes(LEGEND_FREE_LAYERS, l.id)).map(l => l.id);
    const visibleLayers = layers.items.reduce((acc, layer) => {
      const subLayers = layer.layers;
      const isSublayerActive = subLayers && subLayers.items.some(l => includes(activeLayersIds, l.id))
      const layerKeyValue = isSublayerActive 
        ? {[subLayers.items.filter(l => includes(activeLayersIds, l.id))[0].id]: layer}
        : {[layer.id]: layer}
      return {...acc, ...layerKeyValue}
    }, {});
    const reversedLayers = [...activeLayersIds].reverse();
    reversedLayers.forEach((layer, i) => {
      map.reorder(visibleLayers[layer], i + LEGEND_FREE_LAYERS.length);
    })
  }

  const setOpacity = (layer) => {
    const l = activeLayers.find(o => o.id === layer.id);
    if (l) { layer.opacity = l.opacity !== undefined ? l.opacity : 1 };
  }

  setLayerOrder(activeLayers);
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