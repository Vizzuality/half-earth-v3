import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER, GRAPHIC_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import { gridCellDefaultStyles } from 'constants/landscape-view-constants';

import {
  createGraphic,
  createGraphicLayer,
  createPolygonGeometry
} from 'utils/graphic-layer-utils';

const CountryBorderLayer = props => {
  const { view, countryISO } = props;

  const [countryLayer, setCountryLayer] = useState(null);
  const [borderGraphic, setBorderGraphic] = useState(null);

  //Create the graphics layer on mount
  useEffect(() => {
    loadModules(
      [
        "esri/Graphic",
        "esri/layers/GraphicsLayer"
      ]).then(([Graphic, GraphicsLayer]) => {
        const _borderGraphic = createGraphic(Graphic, gridCellDefaultStyles);
        const graphicsLayer = createGraphicLayer(GraphicsLayer, _borderGraphic, GRAPHIC_LAYER);
        setBorderGraphic(_borderGraphic);
        view.map.add(graphicsLayer);
      })
  }, [])

  const queryCountryData = () => {
    const query = countryLayer.createQuery();
    query.where = `GID_0 = '${countryISO}'`;
    countryLayer.queryFeatures(query)
      .then(async function(results){
        const { features } = results;
        const { geometry } = features[0];
        const borderPolygon = await createPolygonGeometry(geometry);
        if (borderGraphic) { borderGraphic.geometry = borderPolygon };
        view.goTo(geometry);
      })
      .catch((error) => {
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
    if (countryLayer) {
      queryCountryData();
    }
  }, [countryLayer, countryISO, borderGraphic]);


  return null
}

export default CountryBorderLayer;