import { loadModules } from 'esri-loader';
import { LAYERS_URLS } from 'constants/layers-urls';
import { ELU_LOOKUP_TABLE, WDPA_LOOKUP_TABLE } from 'constants/layers-slugs';
import { AOIS_HISTORIC  } from 'constants/analyze-areas-constants';
import EsriFeatureService from 'services/esri-feature-service';
import { getCrfData } from 'services/geo-processing-services/sample';
import {
  BIRDS,
  MAMMALS,
  REPTILES,
  POPULATION,
  AMPHIBIANS,
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
      resolve(metadata.parameters.find(p => p.name === inputGeometryKey).defaultValue)
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
  1: 'irrigated',
  2: 'rainfed',
  3: 'rangeland',
  4: 'urban'
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
        [landPressuresLookup[value.attributes.SliceNumber]]: value.attributes.AREA
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
      resolve({protectionPercentage});
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
      console.log('PROTECTED_AREAS_INSIDE_AOI', data)
      const wdpaIds = data.value.features.map(f => f.attributes.Value);
      console.log('ids array', wdpaIds)
      console.log('ids string', wdpaIds.toString())
      EsriFeatureService.getFeatures({
        url: LAYERS_URLS[WDPA_LOOKUP_TABLE],
        whereClause: `WDPA_PID = '${555523072}'`,
      }).then((features) => {
        console.log('PAS', features);
      }).catch((getFeaturesError) => {
        console.error('getFeaturesError', getFeaturesError)
      })
    }).catch((error) => {
      console.error('PROTECTED_AREAS_INSIDE_AOICrfError', error)
    })
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