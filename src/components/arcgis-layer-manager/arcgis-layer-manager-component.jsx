import { includes } from 'lodash';
import { LEGEND_FREE_LAYERS } from 'constants/layers-groups';

const ArcgisLayerManager = ({ map, activeLayers }) => {
  // Map prop is inherited from Webscene component
  // reference: https://github.com/Esri/react-arcgis#advanced-usage
  const { layers } = map;

  const setLayerOrder = activeLayers => {
    const activeLayersIds = activeLayers.filter(l => !includes(LEGEND_FREE_LAYERS, l.title)).map(l => l.title);
    const visibleLayers = layers.items.reduce((acc, layer) => {
      const subLayers = layer.layers;
      const isSublayerActive = subLayers && subLayers.items.some(l => includes(activeLayersIds, l.title))
      const layerKeyValue = isSublayerActive 
        ? {[subLayers.items.filter(l => includes(activeLayersIds, l.title))[0].title]: layer}
        : {[layer.title]: layer}
      return {...acc, ...layerKeyValue}
    }, {});
    const reversedLayers = [...activeLayersIds].reverse();
    reversedLayers.forEach((layer, i) => {
      map.reorder(visibleLayers[layer], i + LEGEND_FREE_LAYERS.length);
    })
  }

  const setOpacity = (layer) => {
    const l = activeLayers.find(o => o.title === layer.title);
    if (l) { layer.opacity = l.opacity !== undefined ? l.opacity : 1 };
  }

  setLayerOrder(activeLayers);
  layers.items.forEach(mapLayer => {
    const setActive = activeLayers && activeLayers.some(activeLayer => activeLayer.title === mapLayer.title);
    mapLayer.layers && mapLayer.layers.items && mapLayer.layers.items.forEach(layer => {
      const setActive = activeLayers && activeLayers.some(activeLayer => activeLayer.title === layer.title);
      setOpacity(layer);
      layer.visible = !!setActive;
      mapLayer.visible = !!setActive;
    })
    setOpacity(mapLayer);
    // Set group layers as visible to allow sublayers to be visible
    if (mapLayer.type === "group") {
      mapLayer.visible = true
    } else {
      mapLayer.visible = !!setActive;
    }
  })
  return null
}

export default ArcgisLayerManager;