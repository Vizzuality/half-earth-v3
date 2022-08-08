import { useEffect } from 'react';
import { CONSTANT_CONTACT_LAYERS } from 'constants/layers-groups';
import { simplePictureMarker } from 'utils/graphic-layer-utils';
import pledgeLightIcon from 'icons/pledge.svg';

function ConstantContactLayersContainer({
  map,
  activeLayers,
}) {
  useEffect(() => {
    const ccLayers = activeLayers && activeLayers.filter((l) => CONSTANT_CONTACT_LAYERS.some((title) => title === l.title));
    ccLayers.forEach((layer) => {
      const cc = map.findLayerById(layer.title);
      cc.renderer = {
        type: 'simple',
        symbol: simplePictureMarker(pledgeLightIcon),
      };
      cc.featureReduction = { type: 'selection' };
      cc.opacity = 1;
    });
  }, [activeLayers]);

  return null;
}

export default ConstantContactLayersContainer;
