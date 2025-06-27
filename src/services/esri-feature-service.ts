import { LAYER_OPTIONS, LAYER_TITLE_TYPES } from 'constants/dashboard-constants.js';
import { LAYERS_URLS } from 'constants/layers-urls';
import { LOCAL_SPATIAL_REFERENCE } from 'constants/scenes-constants';
import { AddFeature, GetFeatures, GetLayer } from 'types/services-types';
import {
    PROTECTED_AREA_EEWWF_FEATURE_ID, PROTECTED_AREA_FEATURE_URL, PROTECTED_AREA_GIN_FEATURE_URL,
    PROTECTED_AREA_GUY_FEATURE_URL, PROTECTED_AREA_LIB_FEATURE_URL, PROTECTED_AREA_SLE_FEATURE_URL,
    REGION_RANGE_MAP_URL
} from 'utils/dashboard-utils';

import CSVLayer from '@arcgis/core/layers/CSVLayer';
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
  orderByFields = [],
  signal = null,
}: GetFeatures) {
  return new Promise((resolve) => {
    const layer = new FeatureLayer({
      url,
    });

    const featureQuery = layer.createQuery();
    featureQuery.outFields = outFields;
    featureQuery.where = whereClause;
    featureQuery.orderByFields = orderByFields;
    // if (geometry) {
    //   featureQuery.geometry = geometry;
    // }
    // featureQuery.returnGeometry = returnGeometry;
    featureQuery.outSpatialReference = outSpatialReference;
    layer
      .queryFeatures(featureQuery, { signal })
      .then((results) => {
        // TODO: TS-TODO: Type results.
        if (results && results.features && results.features.length > 0) {
          resolve(results.features);
        }
        resolve(null);
      })
      .catch((err) => {
        err;
        resolve(null);
      });
  });
}

function getVectorTileLayer(url, id, countryISO) {
  return new VectorTileLayer({
    url,
    id,
  });
}

async function getFeatureLayer(portalItemId, countryISO, id, classType = null) {
  let definitionExpression = countryISO ? `GID_0 = '${countryISO}'` : '';

  if (
    id === 'GUY-zone5-spi' ||
    id === 'GUY-zone3-spi' ||
    id === 'GUY-zone3-shi' ||
    id === 'GUY-zone5-shi' ||
    countryISO === 'EE'
  ) {
    definitionExpression = '';
  }

  if (classType === 'INT') {
    // const className = classType === 'INT' ? 'Intervention' : 'Landscape';
    definitionExpression = `class = 'Intervention'`;
  }
  if (classType === 'LND') {
    // const className = classType === 'INT' ? 'Intervention' : 'Landscape';
    definitionExpression = `class = 'Landscape'`;
  }
  const featureLayer = new FeatureLayer({
    portalItem: {
      id: portalItemId,
    },
    outFields: ['*'],
    definitionExpression,
    id: id ?? LAYER_OPTIONS.PROVINCES,
  });

  await featureLayer.load();
  return featureLayer;
}

function getFeatureOccurenceLayer(
  portalItemId,
  scientificName,
  id,
  type,
  countryISO
) {
  let isoFilter = `iso3 = '${countryISO}'`;
  if (countryISO === 'EE') {
    isoFilter = `iso3 in ('BRA', 'MEX', 'PER',  'VNM', 'MDG')`;
  }
  return new FeatureLayer({
    portalItem: {
      id: portalItemId,
    },
    outFields: ['*'],
    definitionExpression: `species = '${scientificName}' and source = '${type}' and ${isoFilter}`,
    id,
  });
}

function getFeaturePrivateOccurenceLayer(
  portalItemId,
  scientificName,
  id,
  study_name
) {
  return new FeatureLayer({
    portalItem: {
      id: portalItemId,
    },
    outFields: ['*'],
    definitionExpression: `scientificname = '${scientificName}' and study_name = '${study_name}'`,
    id,
  });
}

function getCSVLayer() {
  return new CSVLayer({
    // needs to be public accesible URL for csv file
    url: 'https://raw.githubusercontent.com/MapofLife/half-earth-v3/refs/heads/develop/src/assets/data/drc_speciesRecords.csv', // URL to your CSV file
    latitudeField: 'lat', // Name of the latitude column
    longitudeField: 'long', // Name of the longitude column
    id: 'POINT_OBSERVATIONS',
  });
}

function getGeoJsonLayer(scientificname, id, countryISO = 'CD') {
  return new GeoJSONLayer({
    url: `https://storage.googleapis.com/cdn.mol.org/eow_demo/occ/${countryISO}_${scientificname}.geojson`,
    id,
  });
}

async function getXYZLayer(scientificname, id, type, taxa = null) {
  const url = `${REGION_RANGE_MAP_URL}?species=${scientificname}&taxa=${taxa}`;

  const response = await fetch(url);
  const data = await response.json();
  let urlTemplate;

  if (type === LAYER_TITLE_TYPES.EXPERT_RANGE_MAPS) {
    urlTemplate = data['range map'].tile_url;
  } else if (type === LAYER_TITLE_TYPES.POINT_OBSERVATIONS) {
    urlTemplate = data['refined map'].tile_url;
  } else if (type === LAYER_TITLE_TYPES.TREND) {
    urlTemplate = data.trend.tile_url;
  }

  return new WebTileLayer({
    urlTemplate,
    id,
  });
}

function getMVTSource(scientificname) {
  return {
    type: 'vector',
    tiles: [
      'https://production-dot-tiler-dot-map-of-life.appspot.com/0.x/tiles/regions/regions/{proj}/{z}/{x}/{y}.pbf?region_id=1673cab0-c717-4367-9db0-5c63bf26944d',
    ],
  };
}

function getTileLayer(url, id) {
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

async function addProtectedAreaLayer(id, countryISO = 'COD') {
  let featurePortalId = PROTECTED_AREA_FEATURE_URL;

  switch (countryISO) {
    case 'LBR':
      featurePortalId = PROTECTED_AREA_LIB_FEATURE_URL;
      break;
    case 'GIN':
      featurePortalId = PROTECTED_AREA_GIN_FEATURE_URL;
      break;
    case 'SLE':
      featurePortalId = PROTECTED_AREA_SLE_FEATURE_URL;
      break;
    case 'GUY-FM':
    case 'GUY':
      featurePortalId = PROTECTED_AREA_GUY_FEATURE_URL;
      break;
    case 'EE':
      featurePortalId = PROTECTED_AREA_EEWWF_FEATURE_ID;
      break;
    default:
      break;
  }

  const featureLayer = new FeatureLayer({
    portalItem: {
      id: featurePortalId,
    },
    outFields: ['*'],
    id: id ?? LAYER_OPTIONS.PROTECTED_AREAS,
  });

  await featureLayer.load(); // Ensure the layer is loaded

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
  getCSVLayer,
  getFeatureOccurenceLayer,
  getFeaturePrivateOccurenceLayer,
};
