import {
    CONTEXTUAL_DATA, CONTEXTUAL_DATA_SERVICE_CONFIG, GEOPROCESSING_SERVICES_URLS
} from 'constants/geo-processing-services';
import { GetCrfData } from 'types/services-types';
import { getJobInfo, setSpeciesJSONGeometryRings } from 'utils/geo-processing-services';

const { inputGeometryKey, outputTablesKeys, inputRasterKeyPairs, inputTestGeometryKey } =
  CONTEXTUAL_DATA_SERVICE_CONFIG;

export function getCrfData(aoiFeatureGeometry: GetCrfData) {
  return new Promise((resolve, reject) => {
    const JSONGeometry = aoiFeatureGeometry.toJSON();
    getJobInfo(GEOPROCESSING_SERVICES_URLS[CONTEXTUAL_DATA], {
      ...inputRasterKeyPairs,
      [inputTestGeometryKey]: setSpeciesJSONGeometryRings(
        // addZcoordToRings(JSONGeometry.rings)
        JSONGeometry.rings[0]
      ),
    })
      .then((jobInfo) => {
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
