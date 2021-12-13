import { getJobInfo, setSpeciesJSONGeometryRings, addZcoordToRings, jobTimeProfiling } from 'utils/geo-processing-services';

import {
  CONTEXTUAL_DATA,
  GEOPROCESSING_SERVICES_URLS,
  CONTEXTUAL_DATA_SERVICE_CONFIG
 } from 'constants/geo-processing-services';

const {
  inputGeometryKey,
  outputTablesKeys,
  inputRasterKeyPairs,
} = CONTEXTUAL_DATA_SERVICE_CONFIG;

export function getCrfData(aoiFeatureGeometry) {
  return new Promise((resolve, reject) => {
    const JSONGeometry = aoiFeatureGeometry.toJSON();
    getJobInfo(
      GEOPROCESSING_SERVICES_URLS[CONTEXTUAL_DATA],
      {
        ...inputRasterKeyPairs,
        [inputGeometryKey]: setSpeciesJSONGeometryRings(addZcoordToRings(JSONGeometry.rings))
      }
    ).then(jobInfo => {
      const JOB_START = Date.now();
      const jobId = jobInfo.jobId;
      jobInfo.waitForJobCompletion(jobId).then(() => {
        outputTablesKeys.forEach((outputTable) => {
          jobInfo.fetchResultData(outputTable).then((data) => {
            console.log(outputTable,data)
            jobTimeProfiling(jobInfo, JOB_START);
            resolve({jobInfo,jobId,data})
          })
        })
      }).catch(error => {
        jobTimeProfiling(jobInfo, JOB_START);
          console.log('jobCompletion error', error)
      })
    }).catch(error => {
      console.log('job submission error' , error)
    })
  })
}
