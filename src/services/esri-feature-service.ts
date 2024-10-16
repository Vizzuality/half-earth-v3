import { LAYERS_URLS } from 'constants/layers-urls';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';
import { AddFeature, GetFeatures, GetLayer } from 'types/services-types';
import {
    LAYER_OPTIONS, PROTECTED_AREA_FEATURE_URL, PROTECTED_AREA_VECTOR_URL,
    PROVINCE_FEATURE_LAYER_URL, PROVINCE_VECTOR_URL
} from 'utils/dashboard-utils.js';

import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
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

function getVectorTileLayer(url, id){
  return new VectorTileLayer({
    url,
    id,
  });
}

function getFeatureLayer(url, id){
  return new FeatureLayer({
    url,
    outFields: ['*'],
    id,
  });
}

function getGeoJsonLayer(scientificname, id){
  return new GeoJSONLayer({
    url: `https://storage.googleapis.com/cdn.mol.org/eow_demo/occ/${scientificname}.geojson`,
    id,
  });
}

async function getXYZLayer(scientificname, id){
  const response = await fetch(`https://next-api-dot-map-of-life.appspot.com/2.x/species/drc_rangemap?scientificname=${scientificname}`);
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

function addProvinceLayer(){
  const featureLayer = getFeatureLayer(PROVINCE_FEATURE_LAYER_URL, LAYER_OPTIONS.PROVINCES);
  const vectorTileLayer = getVectorTileLayer(PROVINCE_VECTOR_URL, LAYER_OPTIONS.PROVINCES_VECTOR);
  const groupLayer = new GroupLayer({
    layers: [featureLayer, vectorTileLayer],
    id: LAYER_OPTIONS.PROVINCES
  });

  return { groupLayer, featureLayer, vectorTileLayer };
}

function addProtectedAreaLayer(){
  const featureLayer = getFeatureLayer(PROTECTED_AREA_FEATURE_URL, LAYER_OPTIONS.PROTECTED_AREAS);
  const vectorTileLayer = getVectorTileLayer(PROTECTED_AREA_VECTOR_URL, LAYER_OPTIONS.PROTECTED_AREAS_VECTOR);

  const groupLayer = new GroupLayer({
    layers: [featureLayer],
    id: LAYER_OPTIONS.PROTECTED_AREAS,
  });

  return { groupLayer, featureLayer, vectorTileLayer };
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
  addProvinceLayer,
  addProtectedAreaLayer,
};
