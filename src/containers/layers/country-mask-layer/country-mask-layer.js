/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import countriesGeometriesActions from 'redux_modules/countries-geometries';

import { createGraphic, createGraphicLayer } from 'utils/graphic-layer-utils';

import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

import { MASK_STYLES } from 'constants/graphic-styles';
import { MASK_LAYER } from 'constants/layers-slugs';

import mapStateToProps from './country-mask-layer-selectors';

function CountryMaskLayer(props) {
  const { view, countryBorder, countryMask, setCountryMaskReady, countryISO } =
    props;
  const [graphicsLayer, setGraphicsLayer] = useState(null);

  // Create graphic layer to store the mask
  useEffect(() => {
    const _graphicsLayer = createGraphicLayer(GraphicsLayer, [], MASK_LAYER);
    setGraphicsLayer(_graphicsLayer);
    view.map.layers.add(_graphicsLayer);
  }, []);

  useEffect(() => {
    if (graphicsLayer && countryBorder) {
      if (countryMask) {
        graphicsLayer.graphics = [countryMask];
      } else {
        const expandedExtent = countryBorder.extent.clone().expand(1000);
        const maskGeometry = geometryEngine.difference(
          expandedExtent,
          countryBorder
        );
        const maskGraphic = createGraphic(Graphic, MASK_STYLES, maskGeometry);
        graphicsLayer.graphics = [maskGraphic];
        setCountryMaskReady({ iso: countryISO, mask: maskGraphic });
      }
    }
  }, [graphicsLayer, countryBorder]);

  return null;
}

export default connect(
  mapStateToProps,
  countriesGeometriesActions
)(CountryMaskLayer);
