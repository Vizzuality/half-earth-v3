import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER, GRAPHIC_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import { gridCellDefaultStyles } from 'constants/landscape-view-constants';
import { connect } from 'react-redux';
import actions from 'redux_modules/country-extent';
import { simplePictureMarker } from 'utils/graphic-layer-utils';
import mapPinIcon from 'icons/map_pin.svg'

import {
  createGraphic,
  createGraphicLayer,
  createPolygonGeometry
} from 'utils/graphic-layer-utils';

const CountryBorderLayer = props => {
  const { view, spatialReference, countryISO, setCountryExtentLoading, setCountryExtentReady, setCountryExtentError, isCountryMode } = props;

  const [countryLayer, setCountryLayer] = useState(null);
  const [borderGraphic, setBorderGraphic] = useState(null);
  const [countryPinMarker, setCountryPinMarker] = useState(null);

  //Create the graphics layer on mount
  useEffect(() => {
    loadModules(["esri/Graphic","esri/layers/GraphicsLayer"]).then(([Graphic, GraphicsLayer]) => {
        const _borderGraphic = createGraphic(Graphic, gridCellDefaultStyles);
        const _countryPinMarker = new Graphic({
          symbol: simplePictureMarker(mapPinIcon, { height: 24, width: 24, yoffset: -10 }),
          visible: !isCountryMode
        });
        const graphicsLayer = createGraphicLayer(GraphicsLayer, [_borderGraphic, _countryPinMarker], GRAPHIC_LAYER);
        setBorderGraphic(_borderGraphic);
        setCountryPinMarker(_countryPinMarker);
        view.map.add(graphicsLayer);
      })
  }, [])

  const queryCountryData = () => {
    const query = countryLayer.createQuery();
    query.where = `GID_0 = '${countryISO}'`;
    query.outSpatialReference = spatialReference;
    setCountryExtentLoading();
    countryLayer.queryFeatures(query)
      .then(async function(results){
        const { features } = results;
        const { geometry } = features[0];
        view.goTo(geometry);
        const borderPolygon = await createPolygonGeometry(geometry);
        if (borderGraphic) { 
          borderGraphic.geometry = borderPolygon;
          countryPinMarker.geometry = geometry;
        };
        setCountryExtentReady(geometry.extent);
      })
      .catch((error) => {
        setCountryExtentError()
        console.warn(error);
      });
  };

  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _countryLayer = new FeatureLayer({
        url: LAYERS_URLS[COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER]
      });
      _countryLayer.outFields = ['*'];
      setCountryLayer(_countryLayer)
    });
  }, []);

  useEffect(() => {
    if (countryLayer && countryISO && borderGraphic && spatialReference && countryPinMarker) {
      queryCountryData();
    }
  }, [countryLayer, countryISO, borderGraphic, spatialReference, countryPinMarker]);

  useEffect(() => {
    if (borderGraphic && !countryISO) {
      borderGraphic.geometry = null;
      countryPinMarker.geometry = null;

    }
  },[countryISO])

  useEffect(() => {
    if(countryPinMarker) {
      countryPinMarker.visible = !isCountryMode;
    }
  }, [isCountryMode]);

  return null
}

export default connect(null, actions)(CountryBorderLayer);