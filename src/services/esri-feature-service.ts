import { LAYERS_URLS } from 'constants/layers-urls';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';
import { AddFeature, GetFeatures, GetLayer } from 'types/services-types';

import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import {
    addFeatures, applyEdits, IQueryFeaturesResponse, queryFeatures
} from '@esri/arcgis-rest-feature-layer';

function getFeatures({
  url,
  whereClause = '',
  outFields = ['*'],
  returnGeometry = false,
  outSpatialReference = {
    wkid: LOCAL_SPATIAL_REFERENCE,
  },
  geometry = null,
}: GetFeatures) {
  return new Promise((resolve) => {
    const layer = new FeatureLayer({
      url,
    });

    const featureQuery = layer.createQuery();
    featureQuery.outFields = outFields;
    featureQuery.where = whereClause;
    if (geometry) {
      featureQuery.geometry = geometry;
    }
    featureQuery.returnGeometry = returnGeometry;
    featureQuery.outSpatialReference = outSpatialReference;
    layer.queryFeatures(featureQuery).then((results) => {
      // TODO: TS-TODO: Type results.
      if (results && results.features && results.features.length > 0) {
        resolve(results.features);
      }
      resolve(null);
    });
  });
}

function getGeoJsonLayer(scientificname){
  return new GeoJSONLayer({
    url: `https://storage.googleapis.com/cdn.mol.org/eow_demo/occ/${scientificname}.geojson`
  });
}

function getXYZLayer(){
  return new WebTileLayer({
    urlTemplate: 'https://earthengine.googleapis.com/v1/projects/map-of-life/maps/974cd092f1d222cd5ad9f26eaeaaa974-20d1f1ec2257362d28e5de6dcf970908/tiles/{z}/{x}/{y}'
  })
}


function getLayer({ slug, outFields = ['*'] }: GetLayer) {
  return new FeatureLayer({
    url: LAYERS_URLS[slug],
    outFields,
  });
}

function addFeature({ url, features }: AddFeature) {
  return queryFeatures({
    url,
    where: `aoiId = '${features.attributes.aoiId}'`,
    // eslint-disable-next-line consistent-return
  }).then((feat: IQueryFeaturesResponse) => {
    const existingFeature = feat.features && feat.features[0];
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
        features: [features],
      }).catch((error) => console.error('e', error));
    }
  });
}

export default {
  getFeatures,
  getLayer,
  addFeature,
  getGeoJsonLayer,
  getXYZLayer,
};
