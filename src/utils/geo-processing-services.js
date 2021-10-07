import { loadModules } from 'esri-loader';
import { LAYERS_URLS } from 'constants/layers-urls';
import orderBy from 'lodash/orderBy';
import {
  ELU_LOOKUP_TABLE,
  WDPA_LOOKUP_TABLE,
} from 'constants/layers-slugs';
import { AOIS_HISTORIC  } from 'constants/analyze-areas-constants';
import EsriFeatureService from 'services/esri-feature-service';
import { getCrfData } from 'services/geo-processing-services/sample';
import {
  POPULATION,
  LOOKUP_TABLES,
  HUMAN_PRESSURES,
  ECOLOGICAL_LAND_UNITS,
  PROTECTED_AREA_PERCENTAGE,
  PROTECTED_AREAS_INSIDE_AOI,
} from 'constants/geo-processing-services';


export function getGeoProcessor(url) {
  return new Promise((resolve, reject) => {
    loadModules(["esri/tasks/Geoprocessor"]).then(([Geoprocessor]) => {
      resolve(new Geoprocessor({ url }));
    }).catch(error => reject(error))
  });
}

export function createFeatureSet(defaultJsonFeatureSet) {
  return new Promise((resolve, reject) => {
    loadModules(["esri/rest/support/FeatureSet"]).then(([FeatureSet]) => {
      resolve(FeatureSet.fromJSON(defaultJsonFeatureSet));
    }).catch(error => reject(error))
  });
}

export function getDefaultJsonFeatureSet(metadata, inputGeometryKey) {
  return new Promise((resolve, reject) => {
    try {
      console.log(metadata)
      if (metadata.error) {
        reject(metadata.error)
      }else {
        resolve(metadata.parameters.find(p => p.name === inputGeometryKey).defaultValue)
      }
    } catch (error) {
      reject(error)
    }
  });
}

export function jobTimeProfiling(jobInfo, jobStart) {
  const jobStatusTime = Date.now();
  // console.log(jobInfo.jobStatus);
  const miliseconds = Math.abs(jobStart - jobStatusTime);
  console.log('TIME ELLAPSED ', miliseconds/1000, ' SECONDS');
}

export function getEluData(geometry) {
  return new Promise((resolve, reject) => {
    getCrfData({ 
      dataset: ECOLOGICAL_LAND_UNITS,
      aoiFeatureGeometry: geometry
    }).then(({jobInfo, jobId, data}) => {
      const eluCode = data.value.features[0].attributes.MAJORITY;
      EsriFeatureService.getFeatures({
        url: LAYERS_URLS[ELU_LOOKUP_TABLE],
        whereClause: `elu_code = '${eluCode}'`,
      }).then((features) => {
        const eluData = features[0].attributes;
        const {lc_type: landCover, cr_type: climateRegime } = eluData;
        resolve({elu:{landCover, climateRegime}});
      }).catch((getFeaturesError) => {
        console.error('getFeaturesError', getFeaturesError)
      })
    }).catch((error) => {
      console.error('error', error)
    })
  })
}

export function getPopulationData(geometry) {
  return new Promise((resolve, reject) => {
    getCrfData({ 
      dataset: POPULATION,
      aoiFeatureGeometry: geometry
    }).then(({data}) => {
      const population = data.value.features[0].attributes.SUM;
      resolve({population});
    }).catch((error) => {
      reject(error)
    })
  })
}

const landPressuresLookup = {
  1: 'irrigated agriculture',
  2: 'rainfed agriculture',
  3: 'rangelands',
  4: 'urban activities'
}

export function getLandPressuresData(geometry) {
  return new Promise((resolve, reject) => {
    getCrfData({ 
      dataset: HUMAN_PRESSURES,
      aoiFeatureGeometry: geometry
    }).then(({data}) => {
      if (!data.value.features.length > 0) resolve({});
      const pressures = data.value.features.reduce((acc, value) => ({
        ...acc,
        [landPressuresLookup[value.attributes.SliceNumber]]: value.attributes.percentage_land_encroachment
      }), {});
      resolve({pressures});
    }).catch((error) => {
      reject(error);
    })
  })
}

export function getPercentageProtectedData(geometry) {
  return new Promise((resolve, reject) => {
    getCrfData({ 
      dataset: PROTECTED_AREA_PERCENTAGE,
      aoiFeatureGeometry: geometry
    }).then(({jobInfo, jobId, data}) => {
      const protectionPercentage = data.value.features[0].attributes.MEAN;
      resolve({ protectionPercentage });
    }).catch((error) => {
      console.error('PROTECTED_AREA_PERCENTAGECrfError', error)
    })
  })
}

export function getProtectedAreasListData(geometry) {
  return new Promise((resolve, reject) => {
    getCrfData({ 
      dataset: PROTECTED_AREAS_INSIDE_AOI,
      aoiFeatureGeometry: geometry
    }).then(({jobInfo, jobId, data}) => {
      const wdpaIds = data.value.features.map(f => f.attributes.Value);
      EsriFeatureService.getFeatures({
        url: LAYERS_URLS[WDPA_LOOKUP_TABLE],
        whereClause: `WDPAID IN (${wdpaIds.toString()})`,
      }).then((features) => {
        const protectedAreasList = features.map(f => ({
          name: f.attributes.NAME,
          iso3: f.attributes.ISO3,
          year: f.attributes.STATUS_YR,
          governance: f.attributes.GOV_TYPE,
          designation: f.attributes.DESIG_ENG,
          iucnCategory: f.attributes.IUCN_CAT,
          designationType: f.attributes.DESIG_TYPE,
        }))
        resolve({protectedAreasList})
      }).catch((getFeaturesError) => {
        console.error('getFeaturesError', getFeaturesError)
      })
    }).catch((error) => {
      console.error('PROTECTED_AREAS_INSIDE_AOICrfError', error)
    })
  })
}

export function getSpeciesData(crfName, geometry) {
  return new Promise((resolve, reject) => {
    getCrfData({ 
      dataset: crfName,
      aoiFeatureGeometry: geometry
    }).then(({data}) => {
      const crfSlices = data.value.features.reduce((acc, f) =>({
        ...acc,
        [f.attributes.SliceNumber]:{
          sliceNumber: f.attributes.SliceNumber,
          presencePercentage: f.attributes.percentage_presence
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
            isFlagship: f.attributes.is_flagship,
            sliceNumber: f.attributes.SliceNumber,
            name: f.attributes.scientific_name,
            globalProtectedArea: f.attributes.wdpa_km2,
            globaldRangeArea: f.attributes.range_area_km2,
            globalProtectedPercentage: f.attributes.percent_protected,
            protectionTarget: f.attributes.conservation_target,
            conservationConcern: f.attributes.conservation_concern,
            presenceInArea: crfSlices[f.attributes.SliceNumber].presencePercentage
          }))
          .filter(f => f.name !== null)
        resolve(orderBy(result, ['isFlagship', 'conservationConcern'], ['desc', 'desc']));
      }).catch((error) => {
        reject(error)
      });
    });
  })
}

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