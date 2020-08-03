import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER, COUNTRY_MASK_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import { MASK_STYLES } from 'constants/graphic-styles';
import { createGraphic, createGraphicLayer } from 'utils/graphic-layer-utils';

const queryCountryData = (countryLayer, countryISO, extent, graphicsLayer, spatialReference) => {
  loadModules(['esri/geometry/Polygon',"esri/Graphic", "esri/geometry/geometryEngine"]).then(([Polygon, Graphic, geometryEngine]) => {
    const extentGeometry = Polygon.fromExtent(extent.clone().expand(1.1));
    const maskGraphic = createGraphic(Graphic, MASK_STYLES, extentGeometry);
    graphicsLayer.graphics = [maskGraphic];

    const query = countryLayer.createQuery();
    query.outSpatialReference = spatialReference;
    query.geometry = extentGeometry;

    countryLayer.queryFeatures(query)
    .then(async function(results){
        const { features } = results;
        const countryGeometry = features.find(({ attributes }) => attributes.GID_0 === countryISO).geometry;
        const maskGeometry = await geometryEngine.difference(extentGeometry, countryGeometry);
        const maskGraphic = createGraphic(Graphic, MASK_STYLES, maskGeometry);
        graphicsLayer.graphics = [maskGraphic];
      })
      .catch((error) => {
        console.warn(error);
      });
    });
};

const CountryMaskLayer = props => {
  const { view, countryISO, extent, spatialReference } = props;
  const [countryLayer, setCountryLayer] = useState(null);
  const [graphicsLayer, setGraphicsLayer] = useState(null);

  // Add country borders layer to the state
  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _countryLayer = new FeatureLayer({
        url: LAYERS_URLS[COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER]
      });
      _countryLayer.outFields = ['*'];
      setCountryLayer(_countryLayer);
    });
  }, []);

  // Create graphic layer to store the mask
  useEffect(() => {
    loadModules(["esri/layers/GraphicsLayer"]).then(([GraphicsLayer]) => {
        const _graphicsLayer = createGraphicLayer(GraphicsLayer, [], COUNTRY_MASK_LAYER);
        setGraphicsLayer(_graphicsLayer);
        view.map.layers.add(_graphicsLayer);
      })
  }, []);

  useEffect(() => {
    if (countryLayer && countryISO && extent && graphicsLayer) {
      queryCountryData(countryLayer, countryISO, extent, graphicsLayer, spatialReference);
    }
  }, [countryLayer, extent, countryISO, graphicsLayer]);

  return null
}

export default CountryMaskLayer;
