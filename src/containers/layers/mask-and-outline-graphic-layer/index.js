import { useEffect, useState } from 'react';

import { createGraphic, createGraphicLayer } from 'utils/graphic-layer-utils';

import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

import { MASK_STYLES, GRID_CELL_STYLES } from 'constants/graphic-styles';
import { MASK_LAYER } from 'constants/layers-slugs';

function MaskAndOutlineGraphicLayer(props) {
  const { view, geometry } = props;

  const [graphicsLayer, setGraphicsLayer] = useState(null);
  // Create graphic layer to store the mask and outline
  useEffect(() => {
    if (!graphicsLayer) {
      // eslint-disable-next-line no-underscore-dangle
      const _graphicsLayer = createGraphicLayer(GraphicsLayer, [], MASK_LAYER);
      setGraphicsLayer(_graphicsLayer);
      view.map.layers.add(_graphicsLayer);
    }
    return () => view.map.remove(graphicsLayer);
  }, [graphicsLayer]);

  useEffect(() => {
    if (graphicsLayer && geometry) {
      const expandedExtent = geometry.extent.clone().expand(1000);
      const maskGeometry = geometryEngine.difference(expandedExtent, geometry);
      const maskGraphic = createGraphic(Graphic, MASK_STYLES, maskGeometry);
      const outlineGraphic = createGraphic(Graphic, GRID_CELL_STYLES, geometry);
      graphicsLayer.graphics = [maskGraphic, outlineGraphic];
    }
  }, [graphicsLayer, geometry]);

  return null;
}

export default MaskAndOutlineGraphicLayer;
