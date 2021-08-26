import { getGeoProcessor, createFeatureSet, getDefaultJsonFeatureSet, jobTimeProfiling } from 'utils/geo-processing-services';

import { SAMPLE_SERVICE_CONFIG, SIMPLE_SAMPLE_SERVICE_CONFIG, PROTECTED_PERCENTAGE_CONFIG } from 'constants/geo-processing-services';

const { 
    url,
    basePath,
    inputRasterKey,
    inputGeometryKey,
    // inputFeatureServiceNameKey,
    outputParamKey,
  } = PROTECTED_PERCENTAGE_CONFIG;

export function getCrfData({ crfName, aoiFeatureGeometry, isMultidimensional = true }) {
    return new Promise((resolve, reject) => {
      getGeoProcessor(url).then(GP => {
        fetch(`${url}?f=pjson`).then(response => response.json()).then(async metadata => {
          const defaultJsonFeatureSet = await getDefaultJsonFeatureSet(metadata, inputGeometryKey);
          const defaultFeatureSet = await createFeatureSet(defaultJsonFeatureSet);
            GP.submitJob({
              [inputRasterKey]: `${basePath}/${crfName}.crf`,
            //   [inputFeatureServiceNameKey]: 'esto_que_es',
              [inputGeometryKey]: defaultFeatureSet.set({
                hasZ: defaultFeatureSet.hasZ,
                geometryType: "polygon",
                features: [{ geometry: aoiFeatureGeometry, attributes: { OBJECTID: 1 } }]
              })
            }).then((jobInfo) => {
              const JOB_START = Date.now();
              jobTimeProfiling(jobInfo, JOB_START);
              const jobId = jobInfo.jobId;
              GP.waitForJobCompletion(jobId).then(() => {
                GP.getResultData(jobId, outputParamKey).then((data) => {
                  jobTimeProfiling(jobInfo, JOB_START);
                  console.log(`${crfName} DATA`,data)
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