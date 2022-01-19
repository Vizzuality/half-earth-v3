import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { MASK_LAYER } from 'constants/layers-slugs';
import { MASK_STYLES, GRID_CELL_STYLES } from 'constants/graphic-styles';
import { createGraphic, createGraphicLayer } from 'utils/graphic-layer-utils';

const MaskAndOutlineGraphicLayer = props => {
  const { view, geometry } = props;
  const [graphicsLayer, setGraphicsLayer] = useState(null);

  // Create graphic layer to store the mask and outline
  useEffect(() => {
    loadModules(["esri/layers/GraphicsLayer"]).then(([GraphicsLayer]) => {
      const _graphicsLayer = createGraphicLayer(GraphicsLayer, [], MASK_LAYER);
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
        const outlineGraphic = createGraphic(Graphic, GRID_CELL_STYLES, geometry);
        graphicsLayer.graphics = [maskGraphic, outlineGraphic];
      });
    }
  }, [graphicsLayer, geometry]);

  return null
}

export default MaskAndOutlineGraphicLayer;
