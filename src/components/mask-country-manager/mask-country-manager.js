import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER, COUNTRY_MASK_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import { MASK_STYLES } from 'constants/graphic-styles';
import { createGraphic, createGraphicLayer } from 'utils/graphic-layer-utils';

const queryCountryData = (countryLayer, countryISO, spatialReference, countryExtent, graphicsLayer, isCountryMode) => {
  loadModules(['esri/geometry/Polygon',"esri/Graphic", "esri/geometry/geometryEngine"]).then(([Polygon, Graphic, geometryEngine]) => {
    const extentGeometry = Polygon.fromExtent(countryExtent.clone().expand(1.02));
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

const MaskCountryManager = props => {
  const { viewLocal, spatialReference, countryISO, countryExtent, isCountryMode, sceneMode } = props;
  const [countryLayer, setCountryLayer] = useState(null);
  const [graphicsLayer, setGraphicsLayer] = useState(null);

  useEffect(() => {
    loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
      const _countryLayer = new FeatureLayer({
        url: LAYERS_URLS[COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER]
      });
      _countryLayer.outFields = ['*'];
      setCountryLayer(_countryLayer);
    });
  }, []);

  useEffect(() => {
    loadModules(["esri/layers/GraphicsLayer"]).then(([GraphicsLayer]) => {
        const _graphicsLayer = createGraphicLayer(GraphicsLayer, [], COUNTRY_MASK_LAYER);
        setGraphicsLayer(_graphicsLayer);
        viewLocal.map.layers.add(_graphicsLayer);
      })
  }, []);

  useEffect(() => {
    if(graphicsLayer) {
      graphicsLayer.visible = isCountryMode;
    }
  }, [countryExtent, isCountryMode]);

  useEffect(() => {
    if (countryLayer && countryISO  && spatialReference && countryExtent && graphicsLayer && isCountryMode) {
      graphicsLayer.graphics = [];
      queryCountryData(countryLayer, countryISO, spatialReference, countryExtent, graphicsLayer, isCountryMode);
    }
  }, [countryExtent, isCountryMode]);

  useEffect(() => {
    if (graphicsLayer && (!countryISO || !isCountryMode)) {
      graphicsLayer.graphics = [];
    }
  },[countryISO, sceneMode]);

  return null
}

export default MaskCountryManager;
