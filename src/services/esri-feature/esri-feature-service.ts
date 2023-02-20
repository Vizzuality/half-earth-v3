import { loadModules } from 'esri-loader';

import {
  addFeatures,
  queryFeatures,
  applyEdits,
} from '@esri/arcgis-rest-feature-layer';

import { LAYERS_URLS } from 'constants/layers-urls';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';

import { AddFeatureProps, GetFeauturesProps, GetLayerProps } from './types';

const { REACT_APP_ARGISJS_API_VERSION } = process.env;

function getFeatures({
  url,
  whereClause = '',
  outFields = ['*'],
  returnGeometry = false,
  outSpatialReference = LOCAL_SPATIAL_REFERENCE,
  geometry = null,
}: GetFeauturesProps) {
  return new Promise((resolve, reject) => {
    if (
      REACT_APP_ARGISJS_API_VERSION &&
      parseFloat(REACT_APP_ARGISJS_API_VERSION) > 4.21
    ) {
      loadModules(['esri/layers/FeatureLayer'])
        .then(([FeatureLayer]) => {
          const layer = new FeatureLayer({
            url,
          });

          const query = layer.createQuery();
          query.outFields = outFields;
          query.where = whereClause;
          if (geometry) {
            query.geometry = geometry;
          }
          query.returnGeometry = returnGeometry;
          query.outSpatialReference = outSpatialReference;
          layer.queryFeatures(query).then((results) => {
            console.log({ features: results.features[0] });
            if (results && results.features && results.features.length > 0) {
              resolve(results.features);
            }
            resolve(null);
          });
        })
        .catch((error) => reject(error));
    } else {
      loadModules(['esri/tasks/QueryTask', 'esri/rest/support/Query'])
        .then(([QueryTask, Query]) => {
          const queryTask = new QueryTask({
            url,
          });
          const query = new Query();
          query.outFields = outFields;
          query.where = whereClause;
          if (geometry) {
            query.geometry = geometry;
          }
          query.returnGeometry = returnGeometry;
          query.outSpatialReference = outSpatialReference;
          queryTask.execute(query).then((results) => {
            if (results && results.features && results.features.length > 0) {
              resolve(results.features);
            }
            resolve(null);
          });
        })
        .catch((error) => reject(error));
    }
  });
}

function getLayer({ slug, outFields = ['*'] }: GetLayerProps) {
  return loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
    return new FeatureLayer({
      url: LAYERS_URLS[slug],
      outFields,
    });
  });
}

function addFeature({ url, features }: AddFeatureProps) {
  return queryFeatures({
    url,
    where: `aoiId = '${features.attributes.aoiId}'`,
    // eslint-disable-next-line consistent-return
  }).then((feat) => {
    const existingFeature = (feat as any).features && (feat as any).features[0];
    if (existingFeature) {
      // Only update if the name is different
      if (
        existingFeature.attributes.areaName !== features.attributes.areaName
      ) {
        // The name edit is not working right now on the table (probably an online config problem)
        return applyEdits({
          url,
          updates: [
            {
              attributes: {
                OBJECTID: existingFeature.attributes.OBJECTID,
                areaName: features.attributes.areaName,
              },
            },
          ],
        }).catch((error) => console.error('e', error));
      }
    } else {
      return addFeatures({
        url,
        features,
      }).catch((error) => console.error('e', error));
    }
  });
}

export default {
  getFeatures,
  getLayer,
  addFeature,
};
