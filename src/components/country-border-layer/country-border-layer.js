import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER, GRAPHIC_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import { GRID_CELL_STYLES } from 'constants/graphic-styles';
import { connect } from 'react-redux';
import actions from 'redux_modules/country-extent';

import {
  createGraphic,
  createGraphicLayer,
  createPolygonGeometry
} from 'utils/graphic-layer-utils';

const CountryBorderLayer = props => {
  const { view, spatialReference, countryISO, sceneMode } = props;

  const [countryLayer, setCountryLayer] = useState(null);
  const [borderGraphic, setBorderGraphic] = useState(null);

  //Create the graphics layer on mount
  useEffect(() => {
    loadModules(["esri/Graphic","esri/layers/GraphicsLayer"]).then(([Graphic, GraphicsLayer]) => {
        const _borderGraphic = createGraphic(Graphic, GRID_CELL_STYLES);
        const graphicsLayer = createGraphicLayer(GraphicsLayer, [_borderGraphic], GRAPHIC_LAYER);
        setBorderGraphic(_borderGraphic);
        view.map.add(graphicsLayer);
      })
  }, [])

  const queryCountryData = () => {
    const query = countryLayer.createQuery();
    query.where = `GID_0 = '${countryISO}'`;
    query.outSpatialReference = spatialReference;
    countryLayer.queryFeatures(query)
      .then(async function(results){
        const { features } = results;
        const { geometry } = features[0];
        if (borderGraphic) { 
          sceneMode === 'data' && view.goTo({target: geometry});
          borderGraphic.geometry = await createPolygonGeometry(geometry);
        };
      })
  };

  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _countryLayer = new FeatureLayer({
        url: LAYERS_URLS[COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER]
      });
      setCountryLayer(_countryLayer)
    });
  }, []);

  useEffect(() => {
    if (countryLayer && countryISO && borderGraphic) {
      queryCountryData();
    }
  }, [countryLayer, countryISO, borderGraphic]);

  useEffect(() => {
    if (borderGraphic && !countryISO) {
      borderGraphic.geometry = null;
    }
  },[countryISO])

  return null
}

export default connect(null, actions)(CountryBorderLayer);