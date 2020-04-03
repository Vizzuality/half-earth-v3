import { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import { createGraphicLayer } from 'utils/graphic-layer-utils';

const createGraphic = (Graphic, geometry) => {
  return new Graphic({
    geometry,
    symbol: {
      type: "polygon-3d",
      symbolLayers: [
        {
          type: "fill",
          material: {
            color: [15, 43, 59, 1]
          },
          outline: {
            color: [216, 216, 216, 1],
            size: 0.5
          }
        }
      ]
    }
  });
}

const MaskCountryManager = props => {
  const { viewLocal, spatialReference, countryISO, countryExtent, isCountryMode } = props;
  const [countryLayer, setCountryLayer] = useState(null);
  const [graphicsLayer, setGraphicsLayer] = useState(null);

  const queryCountryData = (countryLayer, countryISO, spatialReference, countryExtent, graphicsLayer) => {
    loadModules(['esri/geometry/Polygon',"esri/Graphic"]).then(([Polygon, Graphic]) => {
      
      const extentGeometry = Polygon.fromExtent(countryExtent.clone().expand(1.2));
      const query = countryLayer.createQuery();
      query.where = `GID_0 <> '${countryISO}'`;
      query.outSpatialReference = spatialReference;
      query.geometry = extentGeometry;
  
      countryLayer.queryFeatures(query)
        .then(async function(results){
          const { features } = results;
          const geometries = features.map(gc => gc.geometry);
          const graphics = geometries.map(geo => createGraphic(Graphic, geo));
          graphicsLayer.graphics = graphics;
          graphicsLayer.visible = isCountryMode;
        })
        .catch((error) => {
          console.warn(error);
        });
      });
  };

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
        const _graphicsLayer = createGraphicLayer(GraphicsLayer, [], 'mask-layer');
        _graphicsLayer.visible = isCountryMode;
        setGraphicsLayer(_graphicsLayer);  
        viewLocal.map.layers.add(_graphicsLayer);
      })
  }, []);

  useEffect(() => {
    if(graphicsLayer) {
      graphicsLayer.visible = isCountryMode;
    }
  }, [isCountryMode]);

  useEffect(() => {
    if (countryLayer && countryISO  && spatialReference && countryExtent && graphicsLayer) {
      graphicsLayer.graphics = [];
      queryCountryData(countryLayer, countryISO, spatialReference, countryExtent, graphicsLayer);
    }
  }, [countryExtent]);

  useEffect(() => {
    if (graphicsLayer && !countryISO) {
      graphicsLayer.graphics = [];
    }
  },[countryISO]);

  return null
}

export default MaskCountryManager;
