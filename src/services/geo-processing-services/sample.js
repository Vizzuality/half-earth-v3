import { getGeoProcessor, createFeatureSet, getDefaultJsonFeatureSet, jobTimeProfiling } from 'utils/geo-processing-services';

import {
  CRFS_CONFIG,
  GEOPROCESSING_SERVICES_URLS
 } from 'constants/geo-processing-services';

const {
    basePath,
    inputRasterKey,
    inputGeometryKey,
    outputParamKey,
  } = CRFS_CONFIG;

export function getCrfData({ dataset, aoiFeatureGeometry }) {
    return new Promise((resolve, reject) => {
      getGeoProcessor(GEOPROCESSING_SERVICES_URLS[dataset]).then(GP => {
        fetch(`${GEOPROCESSING_SERVICES_URLS[dataset]}?f=pjson`).then(response => response.json()).then(async metadata => {
          const defaultJsonFeatureSet = await getDefaultJsonFeatureSet(metadata, inputGeometryKey);
          const defaultFeatureSet = await createFeatureSet(defaultJsonFeatureSet);
            GP.submitJob({
              [inputRasterKey]: `${basePath}/${dataset}.crf`,
              [inputGeometryKey]: defaultFeatureSet.set({
                hasZ: defaultFeatureSet.hasZ,
                geometryType: "polygon",
                features: [{ geometry: aoiFeatureGeometry, attributes: { OBJECTID: 1 } }]
              })
            }).then((jobInfo) => {
              const JOB_START = Date.now();
              const jobId = jobInfo.jobId;
              GP.waitForJobCompletion(jobId).then(() => {
                GP.getResultData(jobId, outputParamKey).then((data) => {
                  jobTimeProfiling(jobInfo, JOB_START);
                   resolve({jobInfo,jobId,data})
                 })
               }).catch(error => {
                jobTimeProfiling(jobInfo, JOB_START);
                 console.log('jobCompletion error', error)
               })
            }).catch(error => {
              console.log('job submission' , error)
            })
        })
      })
    })
  }