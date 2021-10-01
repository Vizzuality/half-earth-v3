import { loadModules } from 'esri-loader';
import { LAYERS_URLS } from 'constants/layers-urls';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

function getFeatures({ url, whereClause = "", outFields = ["*"], returnGeometry = false, outSpatialReference = LOCAL_SPATIAL_REFERENCE, geometry = null }) {
  return new Promise((resolve, reject) => {
    loadModules(["esri/tasks/QueryTask", "esri/rest/support/Query"]).then(([QueryTask, Query]) => {
      var queryTask = new QueryTask({
        url
      });
      var query = new Query();
      query.outFields = outFields;
      query.where = whereClause;
      if (geometry) { query.geometry = geometry }
      query.returnGeometry = returnGeometry;
      query.outSpatialReference = outSpatialReference;
      queryTask.execute(query).then(function(results){
          if (results && results.features && results.features.length > 0) {
            resolve(results.features);
          }
          resolve(null);
      });
    }).catch(error => reject(error));
  })
}


function getLayer({slug, outFields= ["*"]}) {
  return loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
    console.log('featurelayer', new FeatureLayer({
      url: LAYERS_URLS[slug],
      outFields: ["WDPA_ID"]
    }))
    return new FeatureLayer({
      url: LAYERS_URLS[slug],
      outFields
    })
  });
}

export default {
  getFeatures,
  getLayer
}