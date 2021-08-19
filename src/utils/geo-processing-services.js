import { loadModules } from 'esri-loader';

export function getGeoProcessor(url) {
  return new Promise((resolve, reject) => {
    loadModules(["esri/tasks/Geoprocessor"]).then(([Geoprocessor]) => {
      resolve(new Geoprocessor({ url }));
    }).catch(error => reject(error))
  });
}

export function createFeatureSet(defaultJsonFeatureSet) {
  return new Promise((resolve, reject) => {
    loadModules(["esri/tasks/support/FeatureSet"]).then(([FeatureSet]) => {
      resolve(FeatureSet.fromJSON(defaultJsonFeatureSet));
    }).catch(error => reject(error))
  });
}