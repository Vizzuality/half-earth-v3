import { useEffect } from 'react';

import { setLayersVisibility } from 'utils/arcgis-layer-manager-utils';
import { addActiveLayersToScene } from 'utils/layer-manager-utils';

import { layersConfig } from 'constants/mol-layers-configs';

function ArcgisLayerManager({ map, activeLayers, customFunctions }) {
  const { layers } = map;
  const { items: sceneLayers } = layers;
  // Active layers will be always checked and added to the map if they are not
  useEffect(() => {
    // Add not already created activeLayers to the map
    addActiveLayersToScene(activeLayers, layersConfig, map);
    // setLayersOrder(activeLayers, map);
    setLayersVisibility(activeLayers, sceneLayers, customFunctions);
  }, [activeLayers]);

  return null;
}

export default ArcgisLayerManager;
