import { useEffect } from 'react';
import { layersConfig  } from 'constants/mol-layers-configs';
import { setLayerOrder, setOpacity, updateSceneLayersBasedOnUserConfig } from 'utils/arcgis-layer-manager-utils';
import { addActiveLayersToScene } from 'utils/layer-manager-utils';

const ArcgisLayerManager = ({ map, activeLayers, userConfig, customFunctions }) => {
  // Map prop is inherited from Webscene component
  // reference: https://github.com/Esri/react-arcgis#advanced-usage
  const { layers } = map;
  const { items: sceneLayers } = layers;

  // Active layers will be always checked and added to the map if they are not
  useEffect(() => {
    // Add not already created activeLayers to the map
    addActiveLayersToScene(activeLayers, layersConfig, map);
    // Display layers in the correct order
    setLayerOrder(activeLayers, map);
  }, [activeLayers]);

  useEffect(() => {

      sceneLayers.forEach((sceneLayer) => {
      const isVisible = activeLayers.some(
        (activeLayer) => activeLayer.title === sceneLayer.title
      );
      sceneLayer.visible = isVisible;
      // Show only active layers
      if (isVisible) {
        setOpacity(sceneLayer, activeLayers);
      }

      // Apply visibility for customFunctions (not serialized)
      if (customFunctions) {
        customFunctions.forEach((fn) => fn({ layer: sceneLayer, isVisible }));
      }
    });
  }, [activeLayers]);

  useEffect(() => {
    // We need to update layers visibility based on user config
    // This state is not to be shared hence not part of the activeLayers
    updateSceneLayersBasedOnUserConfig(userConfig, sceneLayers)
  }, [activeLayers, userConfig])

  return null
}

export default ArcgisLayerManager;
