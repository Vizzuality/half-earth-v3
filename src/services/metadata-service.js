import { loadModules } from 'esri-loader';
import { METADATA_SERVICE_URL } from 'constants/layers-urls';

function getMetadata(slug) {
  return new Promise((resolve, reject) => {
    loadModules(['esri/tasks/QueryTask', 'esri/rest/support/Query']).then(([QueryTask, Query]) => {
      const queryTask = new QueryTask({
        url: METADATA_SERVICE_URL,
      });
      const query = new Query();
      query.outFields = ['*'];
      query.where = `layerSlug = '${slug}'`;
      queryTask.execute(query).then((results) => {
        if (results && results.features && results.features.length > 0) {
          resolve(results.features[0].attributes);
        }
        resolve(null);
      });
    }).catch((error) => reject(error));
  });
}

export default {
  getMetadata,
};
