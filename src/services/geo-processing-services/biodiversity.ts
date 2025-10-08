import { CRFS_CONFIG, GEOPROCESSING_SERVICES_URLS } from 'constants/geo-processing-services';
import { GetCrfData, JobInfo, JsonGeometry } from 'types/services-types';
import {
    addZcoordToRings, getJobInfo, jobTimeProfiling, setSpeciesJSONGeometryRings
} from 'utils/geo-processing-services';

const { inputGeometryKey, outputParamKey } =
  CRFS_CONFIG;

export function getCrfData({ dataset, aoiFeatureGeometry }: GetCrfData) {
  return new Promise((resolve, reject) => {
    const JSONGeometry: JsonGeometry = aoiFeatureGeometry.toJSON();
    const rings = addZcoordToRings(JSONGeometry.rings);

    getJobInfo(GEOPROCESSING_SERVICES_URLS[dataset], {
      [inputGeometryKey]: setSpeciesJSONGeometryRings(
        rings
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
