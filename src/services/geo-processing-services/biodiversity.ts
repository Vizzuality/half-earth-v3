import { CRFS_CONFIG, GEOPROCESSING_SERVICES_URLS } from 'constants/geo-processing-services';
import { GetCrfData, JobInfo, JsonGeometry } from 'types/services-types';
import {
    getJobInfo, jobTimeProfiling, setSpeciesJSONGeometryRings
} from 'utils/geo-processing-services';

const { basePath, inputRasterKey, inputGeometryKey, outputParamKey, inputTestGeometryKey } =
  CRFS_CONFIG;

export function getCrfData({ dataset, aoiFeatureGeometry }: GetCrfData) {
  return new Promise((resolve, reject) => {
    const JSONGeometry: JsonGeometry = aoiFeatureGeometry.toJSON();
    console.log(JSONGeometry.rings[0]);

    // convert the rings from 102100 to 4326
    // const convertedRings = convertRingsTo4326(JSONGeometry.rings[0]);
    // console.log('convertedRings', convertedRings);
    getJobInfo(GEOPROCESSING_SERVICES_URLS[dataset], {
      // [inputRasterKey]: `${basePath}/${dataset}.crf`,
      [inputTestGeometryKey]: setSpeciesJSONGeometryRings(
        //addZcoordToRings(JSONGeometry.rings)
        JSONGeometry.rings[0]
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
