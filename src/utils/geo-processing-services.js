import { loadModules } from 'esri-loader';
import { LAYERS_URLS } from 'constants/layers-urls';
import {
  ELU_LOOKUP_TABLE,
} from 'constants/layers-slugs';
import { AOIS_HISTORIC } from 'constants/analyze-areas-constants';
import EsriFeatureService from 'services/esri-feature-service';
import { getCrfData } from 'services/geo-processing-services/biodiversity';
import { getCrfData as getContextualData } from 'services/geo-processing-services/contextual-data';
import {
  WDPA_LIST,
  WDPA_PERCENTAGE,
  POPULATION,
  LOOKUP_TABLES,
  HUMAN_PRESSURES,
  ECOLOGICAL_LAND_UNITS,
  CONTEXTUAL_DATA_TABLES,
  LAND_PRESSURES_LOOKUP,
  LAND_PRESSURES_LABELS_SLUGS
} from 'constants/geo-processing-services';


import { PRECALCULATED_LAYERS_CONFIG } from 'constants/analyze-areas-constants';

export function getJobInfo(url, params) {
  return new Promise((resolve, reject) => {
    loadModules(["esri/rest/geoprocessor"]).then(async ([geoprocessor]) => {
      const jobInfo = await geoprocessor.submitJob(url, params)
      resolve(jobInfo);
    }).catch(error => reject(error))
  });
}

export function jobTimeProfiling(jobStart) {
  const jobStatusTime = Date.now();
  const miliseconds = Math.abs(jobStart - jobStatusTime);
  console.info('TIME ELLAPSED ', miliseconds / 1000, ' SECONDS');
}

export function getEluData(data) {
  const eluCode = data[CONTEXTUAL_DATA_TABLES[ECOLOGICAL_LAND_UNITS]].value.features[0].attributes.MAJORITY;
  return new Promise((resolve, reject) => {
    EsriFeatureService.getFeatures({
      url: LAYERS_URLS[ELU_LOOKUP_TABLE],
      whereClause: `elu_code = '${eluCode}'`,
    }).then((features) => {
      const eluData = features[0].attributes;
      const { lc_type: landCover, cr_type: climateRegime } = eluData;
      resolve({ landCover, climateRegime });
    }).catch((getFeaturesError) => {
      reject(getFeaturesError)
    })
  })
}

const landPressuresLookup = LAND_PRESSURES_LOOKUP.reduce(
  (acc, current, i) => {
    acc[i + 1] = current;
    return acc;
  }, {}
);
console.log('land', landPressuresLookup)
function getAreaPressures(data) {
  if (data[CONTEXTUAL_DATA_TABLES[HUMAN_PRESSURES]].value.features.length < 1) return {};
  return data[CONTEXTUAL_DATA_TABLES[HUMAN_PRESSURES]].value.features.reduce((acc, value) => ({
    ...acc,
    [landPressuresLookup[value.attributes.SliceNumber]]: value.attributes.percentage_land_encroachment
  }), {});
}

const getAreaPopulation = (data) => data[CONTEXTUAL_DATA_TABLES[POPULATION]].value.features[0].attributes.SUM;

const getProtectedAreasList = (data) => (
  data[CONTEXTUAL_DATA_TABLES[WDPA_LIST]].value.features.map(f => ({
    NAME: f.attributes.ORIG_NA,
    NAME_0: f.attributes.NAME_0,
    AREA_KM: f.attributes.AREA_KM,
    GOV_TYP: f.attributes.GOV_TYP,
    DESIG: f.attributes.DESIG_E,
    IUCN_CA: f.attributes.IUCN_CA,
    DESIG_T: f.attributes.DESIG_T,
  }))
)

const getPercentage = (data) => data[CONTEXTUAL_DATA_TABLES[WDPA_PERCENTAGE]].value.features[0] && data[CONTEXTUAL_DATA_TABLES[WDPA_PERCENTAGE]].value.features[0].attributes.percentage_protected;

export function getContextData(geometry) {
  return new Promise((resolve, reject) => {
    getContextualData(geometry).then(async data => {
      const pressures = getAreaPressures(data);
      const population = getAreaPopulation(data);
      const elu = await getEluData(data);
      const protectedAreasList = getProtectedAreasList(data);
      const percentage = getPercentage(data);
      resolve({
        elu,
        pressures,
        population,
        protectedAreasList,
        percentage
      });
    }).catch((error) => {
      reject(error)
    })
  })
}

export function getSpeciesData(crfName, geometry) {
  return new Promise((resolve, reject) => {
    getCrfData({
      dataset: crfName,
      aoiFeatureGeometry: geometry
    }).then((response) => {
      const { data } = response;
      const crfSlices = data.value.features.reduce((acc, f) => ({
        ...acc,
        [f.attributes.SliceNumber]: {
          sliceNumber: f.attributes.SliceNumber,
          presencePercentage: f.attributes.per_global
        }
      }), {});
      const ids = data.value.features.map(f => f.attributes.SliceNumber);
      EsriFeatureService.getFeatures({
        url: LAYERS_URLS[LOOKUP_TABLES[crfName]],
        whereClause: `SliceNumber IN (${ids.toString()})`,
      }).then((features) => {
        const result = features
          .map((f) => ({
            category: crfName,
            has_image: f.attributes.has_image,
            sliceNumber: f.attributes.SliceNumber,
            name: f.attributes.scientific_name,
            globalProtectedArea: f.attributes.wdpa_km2,
            globaldRangeArea: f.attributes.range_area_km2,
            globalProtectedPercentage: f.attributes.percent_protected,
            protectionTarget: f.attributes.conservation_target,
            conservationConcern: f.attributes.conservation_concern || 0,
            presenceInArea: crfSlices[f.attributes.SliceNumber].presencePercentage
          }))
          .filter(f => f.name !== null)
        resolve(result);
      }).catch((error) => {
        reject(error)
      });
    });
  })
}

export const getPrecalculatedSpeciesData = (crfName, jsonSlices) => {
  const data = JSON.parse(jsonSlices);
  return new Promise((resolve, reject) => {
    const crfSlices = data.reduce((acc, f) => ({
      ...acc,
      [f.SliceNumber]: {
        sliceNumber: f.SliceNumber,
        presencePercentage: f.per_global
      }
    }), {});
    const ids = data.map(f => f.SliceNumber);
    EsriFeatureService.getFeatures({
      url: LAYERS_URLS[LOOKUP_TABLES[crfName]],
      whereClause: `SliceNumber IN (${ids.toString()})`,
    }).then((features) => {
      const result = features
        .map((f) => {
          let newCommonName = null;
          try {
            const val = f.attributes.common_name_array;
            if (val) {
              newCommonName = JSON.parse(f.attributes.common_name_array.replaceAll(/\\/g, ''));
            }
          } catch (error) {
            console.error('error parsing species', error, 'value', f.attributes.common_name_array)
          }
          return ({
            category: crfName,
            isFlagship: f.attributes.is_flagship,
            has_image: f.attributes.has_image,
            sliceNumber: f.attributes.SliceNumber,
            name: f.attributes.scientific_name,
            commonName: newCommonName,
            globalProtectedArea: f.attributes.wdpa_km2,
            globaldRangeArea: f.attributes.range_area_km2,
            globalProtectedPercentage: f.attributes.percent_protected,
            protectionTarget: f.attributes.conservation_target,
            conservationConcern: f.attributes.conservation_concern,
            presenceInArea: crfSlices[f.attributes.SliceNumber].presencePercentage
          })
        })
        .filter(f => f.name !== null)
      resolve(result);
    }).catch((error) => {
      reject(error)
    });
  })
}

const getAreaName = (data, config) => {
  if (!config) return null;
  return config.subtitle ? `${data[config.name]}, (${data[config.subtitle]})` : data[config.name];
}

export const getPrecalculatedContextualData = (data, layerSlug, includeProtectedAreasList = false, includeAllData = false) => {

  const pressures = {};
  Object.keys(LAND_PRESSURES_LABELS_SLUGS).forEach(key => {
    pressures[key] = data[LAND_PRESSURES_LABELS_SLUGS[key]];
  });

  return ({
    elu: {
      climateRegime: data.climate_regime_majority,
      landCover: data.land_cover_majority
    },
    area: data.AREA_KM2,
    areaName: getAreaName(data, PRECALCULATED_LAYERS_CONFIG[layerSlug]),
    pressures,
    population: data.population_sum,
    ...(includeProtectedAreasList && { ...data.protectedAreasList }),
    protectionPercentage: data.percentage_protected,
    ...(includeAllData && { ...data }),
  })
};

export const getAoiFromDataBase = (id) => {
  return new Promise((resolve, reject) => {
    EsriFeatureService.getFeatures({
      url: LAYERS_URLS[AOIS_HISTORIC],
      whereClause: `hash_id = '${id}'`
    }).then((features) => {
      resolve(features)
    }).catch(error => reject(error))
  })
}

export const addZcoordToRings = (rings) => rings[0].map(r => [...r, 0]);

export const setSpeciesJSONGeometryRings = (rings) => ({
  "displayFieldName": "",
  "hasZ": true,
  "fieldAliases": {
    "OBJECTID": "OBJECTID",
    "Name": "Name",
    "Text": "Text",
    "IntegerValue": "Integer Value",
    "DoubleValue": "Double Value",
    "DateTime": "Date Time",
    "Shape_Length": "Shape_Length",
    "Shape_Area": "Shape_Area"
  },
  "geometryType": "esriGeometryPolygon",
  "spatialReference": {
    "wkid": 102100,
    "latestWkid": 3857
  },
  "fields": [
    {
      "name": "OBJECTID",
      "type": "esriFieldTypeOID",
      "alias": "OBJECTID"
    },
    {
      "name": "Name",
      "type": "esriFieldTypeString",
      "alias": "Name",
      "length": 255
    },
    {
      "name": "Text",
      "type": "esriFieldTypeString",
      "alias": "Text",
      "length": 255
    },
    {
      "name": "IntegerValue",
      "type": "esriFieldTypeInteger",
      "alias": "Integer Value"
    },
    {
      "name": "DoubleValue",
      "type": "esriFieldTypeDouble",
      "alias": "Double Value"
    },
    {
      "name": "DateTime",
      "type": "esriFieldTypeDate",
      "alias": "Date Time",
      "length": 8
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
  "features": [
    {
      "attributes": {
        "OBJECTID": 1,
        "Name": null,
        "Text": null,
        "IntegerValue": null,
        "DoubleValue": null,
        "DateTime": null,
      },
      "geometry": {
        "hasZ": true,
        "rings": [rings]
      }
    }
  ]
})
