import { loadModules } from 'esri-loader';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

function getFeatures({ url, whereClause = "", outFields = ["*"], returnGeometry = false, outSpatialReference = LOCAL_SPATIAL_REFERENCE }) {
  return new Promise((resolve, reject) => {
    loadModules(["esri/tasks/QueryTask", "esri/tasks/support/Query"]).then(([QueryTask, Query]) => {
      var queryTask = new QueryTask({
        url
      });
      var query = new Query();
      query.outFields = outFields;
      query.where = whereClause;
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

export default {
  getFeatures
}