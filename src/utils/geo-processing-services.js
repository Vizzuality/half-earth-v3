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
    loadModules(["esri/rest/support/FeatureSet"]).then(([FeatureSet]) => {
      resolve(FeatureSet.fromJSON(defaultJsonFeatureSet));
    }).catch(error => reject(error))
  });
}

export function getDefaultJsonFeatureSet(metadata, inputGeometryKey) {
  return new Promise((resolve, reject) => {
    try {
      resolve(metadata.parameters.find(p => p.name === inputGeometryKey).defaultValue)
    } catch (error) {
      reject(error)
    }
  });
}

export function jobTimeProfiling(jobInfo, jobStart) {
  const jobStatusTime = Date.now();
  console.log(jobInfo.jobStatus);
  const miliseconds = Math.abs(jobStart - jobStatusTime);
  console.log('TIME ELLAPSED ', miliseconds/1000, ' SECONDS');
}