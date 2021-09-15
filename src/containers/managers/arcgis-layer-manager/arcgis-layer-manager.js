import { useEffect } from 'react';
import { layersConfig } from 'constants/mol-layers-configs';
import { setLayersVisibility, updateSceneLayersBasedOnUserConfig } from 'utils/arcgis-layer-manager-utils';
import { addActiveLayersToScene } from 'utils/layer-manager-utils';

const ArcgisLayerManager = ({ map, activeLayers, userConfig, customFunctions }) => {
  const { layers } = map;
  const { items: sceneLayers } = layers;
  // Active layers will be always checked and added to the map if they are not
  useEffect(() => {
    // Add not already created activeLayers to the map
    addActiveLayersToScene(activeLayers, layersConfig, map);
    // setLayersOrder(activeLayers, map);
    setLayersVisibility(activeLayers, sceneLayers, customFunctions)
  }, [activeLayers]);

  useEffect(() => {
    // We need to update layers visibility based on user config
    // This state is not to be shared hence not part of the activeLayers
    updateSceneLayersBasedOnUserConfig(userConfig, sceneLayers)
  }, [activeLayers, userConfig])

  return null
}

export default ArcgisLayerManager;
