import { loadModules } from 'esri-loader';

import EsriFeatureService from 'services/esri-feature-service';
export const TESTING_SPECIES_NAME = 49;
export const SPECIES_RANGE_SERVICE_URL = 'https://hepportal.arcgis.com/server/rest/services/GetSpeciesRangeClippedmapService/GPServer/GetSpeciesRangeInExtent';
export const SPECIES_RANGE_SERVICE_CRF = 'hummingbirds_binary_Subset.crf';
// export const testingPolygonService = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/unique_square/FeatureServer/0'
// export const testingPolygonService = 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/square_test/FeatureServer/0'
export const input_fs = 'custom_polygon';
const TESTING_POLYGONS_URLS = {
  AMAZON_SMALL_SQUARE: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/square_test/FeatureServer/0',
  USA_BIG_SQUARE: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/rectangulo_usa/FeatureServer/0',
  GALICIA: 'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/unique_square/FeatureServer/0'
}

export function getGeoProcessor(url) {
  return new Promise((resolve, reject) => {
    loadModules(["esri/tasks/Geoprocessor"]).then(([Geoprocessor]) => {
      resolve(new Geoprocessor({ url }));
    }).catch(error => reject(error))
  });
}

export function getServiceMetadata(url) {
  return new Promise((resolve, reject) => {
    loadModules(["esri/request"]).then(([esriRequest]) => {
      esriRequest(url, { query: { f: 'json' } }).then(response => {
        return resolve(response.data);
      });
    }).catch(error => reject(error))
  });
}


export function getTestingPolygon() {
  return new Promise((resolve, reject) => {
    EsriFeatureService.getFeatures({
      url: TESTING_POLYGONS_URLS.AMAZON_SMALL_SQUARE,
      returnGeometry: true
    }).then((features) => {
      resolve(features)
    })
  });
}

export function getSpeciesRangeTiff(species_name, aoiFeature) {
  return new Promise((resolve, reject) => {
    getGeoProcessor(SPECIES_RANGE_SERVICE_URL).then(GP => {
      GP.submitJob({
        species_name,
        biodiversity_crf: SPECIES_RANGE_SERVICE_CRF,
        custom_polygon: {
          "displayFieldName": "",
          "geometryType": "esriGeometryPolygon",
          "spatialReference": {
           "wkid": 4326,
           "latestWkid": 4326
          },
          "fields": [
           {
            "name": "OBJECTID",
            "type": "esriFieldTypeOID",
            "alias": "OBJECTID"
           },
           {
            "name": "Shape_Length",
            "type": "esriFieldTypeDouble",
            "alias": "Shape_Length"
           },
           {
            "name": "Shape_Area",
            "type": "esriFieldTypeDouble",
            "alias": "Shape_Area"
           }
          ],
          "features": aoiFeature,
          "exceededTransferLimit": false
         },
      }).then((jobInfo) => {
        const jobId = jobInfo.jobId;
        GP.waitForJobCompletion(jobId).then(() => {
          GP.getResultData(jobId, 'range_extent').then((data) => {
             resolve({jobInfo,jobId,data})
           })
         }).catch(error => {
           console.log('jobCompletion error', error)
         })
      }).catch(error => {
        console.log('job submission' , error)
      })
    })
  })
}


export default {
  getSpeciesRangeTiff
}