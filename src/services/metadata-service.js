import { loadModules } from 'esri-loader';
import {
  METADATA_SERVICE_URL,
  DEV_METADATA_SERVICE_URL
} from 'constants/layers-urls';
const SERVICE_URL = process.env.NODE_ENV === "development" ? DEV_METADATA_SERVICE_URL : METADATA_SERVICE_URL;

function getMetadata(slug) {
  return new Promise((resolve, reject) => {
    loadModules(["esri/tasks/QueryTask", "esri/tasks/support/Query"]).then(([QueryTask, Query]) => {
      var queryTask = new QueryTask({
        url: SERVICE_URL
      });
      var query = new Query();
      query.outFields = ["*"];
      query.where = `layerSlug = '${slug}'`;
      queryTask.execute(query).then(function(results){
          if (results && results.features && results.features.length > 0) {
            resolve(results.features[0].attributes);
          }
          resolve(null);
      });
    }).catch(error => reject(error));
  })
}

export default {
  getMetadata
}