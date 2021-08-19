import { getGeoProcessor, createFeatureSet } from 'utils/geo-processing-services';

import { ZONAL_STATISTICS_AS_TABLE_CONFIG } from 'constants/geo-processing-services';

const { 
  url,
  basePath,
  inputRasterKey,
  inputGeometryKey,
  inputMultidimensionKey,
  outputParamKey,
} = ZONAL_STATISTICS_AS_TABLE_CONFIG;

export function getCrfData({ crfName, aoiFeatureGeometry, isMultidimensional = true }) {
  return new Promise((resolve, reject) => {
    getGeoProcessor(url).then(GP => {
      console.log(GP)
      fetch(`${url}?f=pjson`).then(response => response.json()).then(data => {
        console.log('metadata', data)
        createFeatureSet(data.parameters.find(p => p.name === inputGeometryKey).defaultValue).then(defaultFeatureSet => {
          GP.submitJob({
            [inputRasterKey]: `${basePath}/${crfName}.crf`,
            [inputMultidimensionKey]: isMultidimensional,
            [inputGeometryKey]: defaultFeatureSet.set({
              hasZ: defaultFeatureSet.hasZ,
              geometryType: "polygon",//correctedGeometry.type,
              features: [{ geometry: aoiFeatureGeometry, attributes: { OBJECTID: 1 } }]
            })
          }).then((jobInfo) => {
            console.log('jobInfo',jobInfo)
            const jobId = jobInfo.jobId;
            GP.waitForJobCompletion(jobId).then(() => {
              GP.getResultData(jobId, outputParamKey).then((data) => {
                console.log('data',data)
                 resolve({jobInfo,jobId,data})
               })
             }).catch(error => {
               console.log('jobCompletion error', error)
             })
          }).catch(error => {
            console.log('job submission' , error)
          })
        });
      })
    })
  })
}