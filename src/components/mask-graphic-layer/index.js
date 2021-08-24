import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { MASK_STYLES } from 'constants/graphic-styles';
import { createGraphic, createGraphicLayer } from 'utils/graphic-layer-utils';

const MaskGraphicLayer = props => {
  const { view, geometry } = props;
  const [graphicsLayer, setGraphicsLayer] = useState(null);

  // Create graphic layer to store the mask
  useEffect(() => {
    loadModules(["esri/layers/GraphicsLayer"]).then(([GraphicsLayer]) => {
      const _graphicsLayer = createGraphicLayer(GraphicsLayer, [], 'MASK_LAYER');
      setGraphicsLayer(_graphicsLayer);
      view.map.layers.add(_graphicsLayer);
    })
  }, []);

  useEffect(() => {
    if (graphicsLayer && geometry) {
      loadModules(["esri/Graphic", "esri/geometry/geometryEngine"]).then(async ([Graphic, geometryEngine]) => {
        const expandedExtent = geometry.extent.clone().expand(1000);
        const maskGeometry = await geometryEngine.difference(expandedExtent, geometry);
        const maskGraphic = createGraphic(Graphic, MASK_STYLES, maskGeometry);
        graphicsLayer.graphics = [maskGraphic];
      });
    }
  }, [graphicsLayer, geometry]);

  return null
}

export default MaskGraphicLayer;
