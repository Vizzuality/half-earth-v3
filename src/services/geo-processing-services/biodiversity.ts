import {
  getJobInfo,
  setSpeciesJSONGeometryRings,
  addZcoordToRings,
  jobTimeProfiling,
} from 'utils/geo-processing-services';

import { GetCrfData, JobInfo, JsonGeometry } from 'types/services-types';

import {
  CRFS_CONFIG,
  GEOPROCESSING_SERVICES_URLS,
} from 'constants/geo-processing-services';

const { basePath, inputRasterKey, inputGeometryKey, outputParamKey } =
  CRFS_CONFIG;

export function getCrfData({ dataset, aoiFeatureGeometry }: GetCrfData) {
  return new Promise((resolve, reject) => {
    const JSONGeometry: JsonGeometry = aoiFeatureGeometry.toJSON();
    getJobInfo(GEOPROCESSING_SERVICES_URLS[dataset], {
      [inputRasterKey]: `${basePath}/${dataset}.crf`,
      [inputGeometryKey]: setSpeciesJSONGeometryRings(
        addZcoordToRings(JSONGeometry.rings)
      ),
    })
      .then((jobInfo: JobInfo) => {
        const JOB_START = Date.now();
        const { jobId } = jobInfo;
        jobInfo
          .waitForJobCompletion(jobId)
          .then(() => {
            jobInfo.fetchResultData(outputParamKey).then((data) => {
              jobTimeProfiling(JOB_START);
              resolve({ jobInfo, jobId, data });
            });
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
