import { useEffect } from 'react';
import {
  LABELS_LAYERS,
  BOUNDARIES_LAYERS
} from 'constants/layers-groups';
import { layersConfig as MOLLayersConfig } from 'constants/mol-layers-configs';
import { setLayerOrder, setOpacity } from 'utils/arcgis-layer-manager-utils';
import { createLayer, addLayerToMap } from 'utils/layer-manager-utils';

const ArcgisLayerManager = ({ map, activeLayers, userConfig, customFunctions }) => {
  // Map prop is inherited from Webscene component
  // reference: https://github.com/Esri/react-arcgis#advanced-usage
  const userConfigLayerGroups = { labels: LABELS_LAYERS, boundaries: BOUNDARIES_LAYERS };
  const { layers } = map;
  const { items } = layers;

  console.log('userConfig',userConfig)
  console.log(activeLayers)
  console.log(items.map(i => i.title))
  // Active layers will be always checked and added to the map if they are not
  useEffect(() => {
    const checkCreateLayers = async () => {
      const addLayer = async (layer) => {
        const newLayer = await createLayer(layer);
        addLayerToMap(newLayer, map);
      };

      activeLayers.forEach((layer) => {
        const isLayerInMap = items.some((l) => l.title === layer.title);
        if (!isLayerInMap) {
          const layerWithConfig = MOLLayersConfig[layer.title] || layer;
          addLayer(layerWithConfig);
        }
      });
    }

    if (activeLayers && activeLayers.length) {
      checkCreateLayers();
    }
  }, [activeLayers]);

  useEffect(() => {
    const disabledUserLayers =
      userConfig &&
      Object.keys(userConfig.layers).filter(
        (layerGroupKey) => !userConfig.layers[layerGroupKey]
      );

    items.forEach((sceneLayer) => {
      const isVisible = activeLayers.some(
        (activeLayer) => activeLayer.title === sceneLayer.title
      );
      sceneLayer.visible = isVisible;
      // Show only active layers
      if (isVisible) {
        setOpacity(sceneLayer, activeLayers);
      }

      // Hide user config disabled layers (not serialized)
      if (disabledUserLayers.length) {
        Object.keys(userConfig.layers).forEach((layerGroupKey) => {
          if (disabledUserLayers.includes(layerGroupKey)) {
            if (
              userConfigLayerGroups[layerGroupKey].includes(sceneLayer.title)
            ) {
              sceneLayer.visible = false;
            }
          }
        });
      }

      // Apply visibility for customFunctions (not serialized)
      if (customFunctions) {
        customFunctions.forEach((fn) => fn({ layer: sceneLayer, isVisible }));
      }
    });
    setLayerOrder(activeLayers, map);
  }, [activeLayers, userConfig]);

  return null
}

export default ArcgisLayerManager;
