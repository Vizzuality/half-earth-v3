import {
  getJobInfo,
  setSpeciesJSONGeometryRings,
  addZcoordToRings,
} from 'utils/geo-processing-services';

import {
  CONTEXTUAL_DATA,
  GEOPROCESSING_SERVICES_URLS,
  CONTEXTUAL_DATA_SERVICE_CONFIG,
} from 'constants/geo-processing-services';

import { GetCrfDataProps, JobInfoProps } from './types';

const { inputGeometryKey, outputTablesKeys, inputRasterKeyPairs } =
  CONTEXTUAL_DATA_SERVICE_CONFIG;

export function getCrfData(aoiFeatureGeometry: GetCrfDataProps) {
  return new Promise((resolve, reject) => {
    const JSONGeometry = aoiFeatureGeometry.toJSON();
    getJobInfo(GEOPROCESSING_SERVICES_URLS[CONTEXTUAL_DATA], {
      ...inputRasterKeyPairs,
      [inputGeometryKey]: setSpeciesJSONGeometryRings(
        addZcoordToRings(JSONGeometry.rings)
      ),
    })
      .then((jobInfo: JobInfoProps) => {
        const { jobId } = jobInfo;
        jobInfo
          .waitForJobCompletion(jobId)
          .then(async () => {
            const promises = outputTablesKeys.map((outputTable) =>
              jobInfo
                .fetchResultData(outputTable)
                .then((data) => ({ [outputTable]: data }))
            );
            const dataArray = await Promise.all(promises);
            const data = dataArray.reduce(
              (acc, current) => ({
                ...acc,
                ...current,
              }),
              {}
            );
            resolve(data);
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
