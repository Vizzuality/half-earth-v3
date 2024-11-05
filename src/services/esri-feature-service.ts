import { LAYERS_URLS } from 'constants/layers-urls';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';
import { AddFeature, GetFeatures, GetLayer } from 'types/services-types';
import {
    EXPERT_RANGE_MAP_URL, LAYER_OPTIONS, LAYER_TITLE_TYPES, PROTECTED_AREA_FEATURE_URL,
    PROTECTED_AREA_GIN_FEATURE_URL, PROTECTED_AREA_LIB_FEATURE_URL, TREND_MAP_URL
} from 'utils/dashboard-utils.js';

import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
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

function getVectorTileLayer(url, id, countryISO){
  return new VectorTileLayer({
    url,
    id,
  });
}

function getFeatureLayer(portalItemId, countryISO, id){
  return new FeatureLayer({
    portalItem: {
      id: portalItemId,
    },
    outFields: ['*'],
    definitionExpression: `GID_0 = '${countryISO}'`,
    id: id ?? LAYER_OPTIONS.PROVINCES
  });
}

function getGeoJsonLayer(scientificname, id, countryISO = 'CD'){
  return new GeoJSONLayer({
    url: `https://storage.googleapis.com/cdn.mol.org/eow_demo/occ/${countryISO}_${scientificname}.geojson`,
    id,
  });
}

async function getXYZLayer(scientificname, id, type){
  let url;

  if(type === LAYER_TITLE_TYPES.EXPERT_RANGE_MAPS){
    url = `${EXPERT_RANGE_MAP_URL}?scientificname=${scientificname}`;
  } else if(type === LAYER_TITLE_TYPES.TREND){
    url = `${TREND_MAP_URL}?scientificname=${scientificname}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return new WebTileLayer({
    urlTemplate: data.url,
    id,
  });
}

function getMVTSource(scientificname){
  return  {
    type: 'vector',
    tiles: [
      'https://production-dot-tiler-dot-map-of-life.appspot.com/0.x/tiles/regions/regions/{proj}/{z}/{x}/{y}.pbf?region_id=1673cab0-c717-4367-9db0-5c63bf26944d'
    ]
  };
}

function getTileLayer(url, id){
  return new TileLayer({
    url,
    id,
    visible: true,
  });
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

function addProtectedAreaLayer(id, countryISO = 'COD'){
  let featurePortalId = PROTECTED_AREA_FEATURE_URL;

  if(countryISO === 'LBR'){
    featurePortalId = PROTECTED_AREA_LIB_FEATURE_URL;
  }else if(countryISO === 'GIN'){
    featurePortalId = PROTECTED_AREA_GIN_FEATURE_URL;
  }

  const featureLayer = new FeatureLayer({
    portalItem: {
      id: featurePortalId,
    },
    outFields: ['*'],
    id: id ?? LAYER_OPTIONS.PROTECTED_AREAS
  });

  return featureLayer;
}

export default {
  getFeatures,
  getLayer,
  addFeature,
  getFeatureLayer,
  getGeoJsonLayer,
  getVectorTileLayer,
  getXYZLayer,
  getTileLayer,
  getMVTSource,
  addProtectedAreaLayer,
};
