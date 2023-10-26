import { loadModules } from 'esri-loader';

import EsriFeatureService from 'services/esri-feature-service';
import { getCrfData } from 'services/geo-processing-services/biodiversity';
import { getCrfData as getContextualData } from 'services/geo-processing-services/contextual-data';

import { AOIS_HISTORIC } from 'constants/analyze-areas-constants';
import { COUNTRY_ATTRIBUTES } from 'constants/country-data-constants';
import {
  WDPA_LIST,
  WDPA_PERCENTAGE,
  POPULATION,
  LOOKUP_TABLES,
  ECOLOGICAL_LAND_UNITS,
  CONTEXTUAL_DATA_TABLES,
  LAND_PRESSURES_LABELS_SLUGS,
  BIRDS,
  MAMMALS,
  REPTILES,
  AMPHIBIANS,
  EXTRACTION,
  AGRICULTURE,
  TRANSPORTATION,
  INTRUSION,
  BUILTUP,
} from 'constants/geo-processing-services';
import { ELU_LOOKUP_TABLE } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';

export function getJobInfo(url, params) {
  return new Promise((resolve, reject) => {
    loadModules(['esri/rest/geoprocessor'])
      .then(async ([geoprocessor]) => {
        const jobInfo = await geoprocessor.submitJob(url, params);
        resolve(jobInfo);
      })
      .catch((error) => reject(error));
  });
}

export function jobTimeProfiling(jobStart) {
  const jobStatusTime = Date.now();
  const miliseconds = Math.abs(jobStart - jobStatusTime);
  console.info('TIME ELLAPSED ', miliseconds / 1000, ' SECONDS');
}

export function getEluData(data) {
  // eslint-disable-next-line max-len
  const eluCode =
    data[CONTEXTUAL_DATA_TABLES[ECOLOGICAL_LAND_UNITS]].value.features[0]
      .attributes.MAJORITY;
  return new Promise((resolve, reject) => {
    EsriFeatureService.getFeatures({
      url: LAYERS_URLS[ELU_LOOKUP_TABLE],
      whereClause: `elu_code = '${eluCode}'`,
    })
      .then((features) => {
        const eluData = features[0].attributes;
        const { lc_type: landCover, cr_type: climateRegime } = eluData;
        resolve({ landCover, climateRegime });
      })
      .catch((getFeaturesError) => {
        reject(getFeaturesError);
      });
  });
}

function getAreaPressures(data) {
  const getData = (key) => {
    if (!data[CONTEXTUAL_DATA_TABLES[key]]?.value?.features.length) {
      return null;
    }
    return data[CONTEXTUAL_DATA_TABLES[key]].value.features.map(
      (f) =>
        f.attributes && {
          year: f.attributes.Year,
          value: f.attributes.percentage_land_encroachment,
        }
    );
  };
  return {
    extraction: getData(EXTRACTION),
    agriculture: getData(AGRICULTURE),
    transportation: getData(TRANSPORTATION),
    intrusion: getData(INTRUSION),
    builtup: getData(BUILTUP),
  };
}

const getAreaPopulation = (data) =>
  data[CONTEXTUAL_DATA_TABLES[POPULATION]].value.features[0].attributes[
    COUNTRY_ATTRIBUTES.populationSum
  ];

const getProtectedAreasList = (data) =>
  data[CONTEXTUAL_DATA_TABLES[WDPA_LIST]].value.features.map((f) => ({
    NAME: f.attributes.ORIG_NA,
    NAME_0: f.attributes.NAME_0,
    AREA_KM: f.attributes.AREA_KM2 || f.attributes.AREA_KM,
    GOV_TYP: f.attributes.GOV_TYP,
    DESIG: f.attributes.DESIG_E,
    IUCN_CA: f.attributes.IUCN_CA,
    DESIG_T: f.attributes.DESIG_T,
    MOL_ID: f.attributes.MOL_ID,
  }));

const getPercentage = (data) =>
  data[CONTEXTUAL_DATA_TABLES[WDPA_PERCENTAGE]].value.features[0] &&
  data[CONTEXTUAL_DATA_TABLES[WDPA_PERCENTAGE]].value.features[0].attributes
    .percentage_protected;

export function getContextData(geometry) {
  return new Promise((resolve, reject) => {
    getContextualData(geometry)
      .then(async (data) => {
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
          percentage,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const parseCommonName = (f) => {
  return f.attributes.common_name && f.attributes.common_name.split(',');
};

const getId = (crfName, sliceNumber) =>
  `${crfName.split('_')[0]}-${sliceNumber}`;

export function getCustomAOISpeciesData(crfName, geometry) {
  return new Promise((resolve, reject) => {
    getCrfData({
      dataset: crfName,
      aoiFeatureGeometry: geometry,
    }).then((response) => {
      const { data } = response;
      const crfSlices = data.value.features.reduce(
        (acc, f) => ({
          ...acc,
          [f.attributes.SliceNumber]: {
            sliceNumber: f.attributes.SliceNumber,
            per_global: f.attributes.per_global,
            SPS_global: f.attributes.SPS,
            SPS_AOI: f.attributes.SPS_AOI,
            SPS_increase: f.attributes.SPS_increase,
            meet_target: f.attributes.meet_target,
          },
        }),
        {}
      );
      const ids = data.value.features.map((f) => f.attributes.SliceNumber);
      if (ids && ids.length > 0) {
        EsriFeatureService.getFeatures({
          url: LAYERS_URLS[LOOKUP_TABLES[crfName]],
          whereClause: `SliceNumber IN (${ids.toString()})`,
        })
          .then((features) => {
            const result = features
              .map((f) => {
                const { attributes } = f;
                const crfInfo = crfSlices[attributes.SliceNumber];
                return {
                  category: crfName,
                  has_image: attributes.has_image,
                  isFlagship: attributes.is_flagship,
                  sliceNumber: attributes.SliceNumber,
                  name: attributes.scientific_name,
                  commonName: parseCommonName(f),
                  globalProtectedArea: attributes.wdpa_km2,
                  globaldRangeArea: attributes.range_area_km2,
                  globalProtectedPercentage: attributes.percent_protected,
                  protectionTarget: attributes.conservation_target,
                  conservationConcern: attributes.conservation_concern || 0,
                  per_global: crfInfo.per_global,
                  SPS_global: crfInfo.SPS_global,
                  SPS_AOI: crfInfo.SPS_AOI,
                  meet_target: crfInfo.meet_target,
                  SPS_increase: crfInfo.SPS_increase,
                  id: getId(crfName, attributes.SliceNumber),
                };
              })
              .filter((f) => f.name !== null);
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  });
}

const getPrecalculatedSpeciesData = (crfName, jsonTaxaData) => {
  const data = JSON.parse(jsonTaxaData);
  return new Promise((resolve, reject) => {
    if (!data) {
      resolve([]);
    }
    const crfSlices = data.reduce(
      (acc, f) => ({
        ...acc,
        [f.SliceNumber]: {
          sliceNumber: f.SliceNumber,
          per_global: f.per_global,
          SPS_AOI: f.SPS_aoi,
        },
      }),
      {}
    );
    const ids = data.map((f) => f.SliceNumber);
    EsriFeatureService.getFeatures({
      url: LAYERS_URLS[LOOKUP_TABLES[crfName]],
      whereClause: `SliceNumber IN (${ids.toString()})`,
    })
      .then((features) => {
        const result = features
          .map((f) => {
            const crfInfo = crfSlices[f.attributes.SliceNumber];
            return {
              category: crfName,
              isFlagship: f.attributes.is_flagship,
              has_image: f.attributes.has_image,
              sliceNumber: f.attributes.SliceNumber,
              name: f.attributes.scientific_name,
              commonName: parseCommonName(f),
              globalProtectedArea: f.attributes.wdpa_km2,
              globaldRangeArea: f.attributes.range_area_km2,
              globalProtectedPercentage: f.attributes.percent_protected,
              protectionTarget: f.attributes.conservation_target,
              conservationConcern: f.attributes.conservation_concern,
              SPS_global: f.attributes.SPS,
              id: getId(crfName, f.attributes.SliceNumber),
              ...crfInfo,
            };
          })
          .filter((f) => f.name !== null);
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setPrecalculatedSpeciesData = (
  attributes,
  setTaxaData,
  handleLoadedTaxaData
) => {
  getPrecalculatedSpeciesData(BIRDS, attributes.birds).then((data) => {
    setTaxaData(data);
    handleLoadedTaxaData('birds');
  });
  getPrecalculatedSpeciesData(MAMMALS, attributes.mammals).then((data) => {
    // WHALES IDS NEED TO BE TEMPORARILY DISCARDED (2954, 2955)
    setTaxaData(
      data.filter((sp) => sp.sliceNumber !== 2954 && sp.sliceNumber !== 2955)
    );
    handleLoadedTaxaData('mammals');
  });
  getPrecalculatedSpeciesData(REPTILES, attributes.reptiles).then((data) => {
    setTaxaData(data);
    handleLoadedTaxaData('reptiles');
  });
  getPrecalculatedSpeciesData(AMPHIBIANS, attributes.amphibians).then(
    (data) => {
      setTaxaData(data);
      handleLoadedTaxaData('amphibians', AMPHIBIANS);
    }
  );
};

const getAreaName = (data) => {
  if (data.NAME) return `${data.NAME}`;
  if (data.NAME_1) return `${data.NAME_1}, (${data.GID_0})`;
  if (!data.NAME_1) return `${data.NAME_0}`;
  return undefined;
};

export const getPrecalculatedContextualData = ({
  data,
  areaName,
  includeProtectedAreasList = false,
  includeAllData = false,
}) => {
  const pressures = {};

  Object.keys(LAND_PRESSURES_LABELS_SLUGS).forEach((key) => {
    const pressureData = data[LAND_PRESSURES_LABELS_SLUGS[key]];
    const parsedData = pressureData && JSON.parse(pressureData);
    pressures[key] =
      parsedData &&
      parsedData.length > 0 &&
      parsedData.map((d) => ({
        year: d.Year,
        value: d.percentage_land_encroachment,
      }));
  });

  return {
    elu: {
      climateRegime: data.climate_regime_majority,
      landCover: data.land_cover_majority,
    },
    area: data.AREA_KM2,
    areaName: areaName || getAreaName(data),
    iso: data.GID_0,
    pressures,
    population: data.population_sum,
    ...(includeProtectedAreasList && { ...data.protectedAreasList }),
    speciesNumbers: {
      nspecies: data.nspecies,
      birds: data.bird_nspecies,
      mammals: data.mamm_nspecies,
      reptiles: data.rept_nspecies,
      amphibians: data.amph_nspecies,
    },
    protectionPercentage: data.percentage_protected,
    SPI: data.SPI,
    ...(includeAllData && { ...data }),
  };
};

export const getAoiFromDataBase = (id) => {
  return new Promise((resolve, reject) => {
    EsriFeatureService.getFeatures({
      url: LAYERS_URLS[AOIS_HISTORIC],
      returnGeometry: true,
      whereClause: `aoiId = '${id}'`,
    })
      .then((features) => {
        resolve(features);
      })
      .catch((error) => reject(error));
  });
};

export const postAoiToDataBase = (geometry, attributes) => {
  return new Promise((resolve, reject) => {
    EsriFeatureService.addFeature({
      url: LAYERS_URLS[AOIS_HISTORIC],
      features: {
        geometry,
        attributes,
      },
    })
      .then((features) => {
        resolve(features);
      })
      .catch((error) => reject(error));
  });
};

export const addZcoordToRings = (rings) => rings[0].map((r) => [...r, 0]);

export const setSpeciesJSONGeometryRings = (rings) => ({
  displayFieldName: '',
  hasZ: true,
  fieldAliases: {
    OBJECTID: 'OBJECTID',
    Name: 'Name',
    Text: 'Text',
    IntegerValue: 'Integer Value',
    DoubleValue: 'Double Value',
    DateTime: 'Date Time',
    Shape_Length: 'Shape_Length',
    Shape_Area: 'Shape_Area',
  },
  geometryType: 'esriGeometryPolygon',
  spatialReference: {
    wkid: 102100,
    latestWkid: 3857,
  },
  fields: [
    {
      name: 'OBJECTID',
      type: 'esriFieldTypeOID',
      alias: 'OBJECTID',
    },
    {
      name: 'Name',
      type: 'esriFieldTypeString',
      alias: 'Name',
      length: 255,
    },
    {
      name: 'Text',
      type: 'esriFieldTypeString',
      alias: 'Text',
      length: 255,
    },
    {
      name: 'IntegerValue',
      type: 'esriFieldTypeInteger',
      alias: 'Integer Value',
    },
    {
      name: 'DoubleValue',
      type: 'esriFieldTypeDouble',
      alias: 'Double Value',
    },
    {
      name: 'DateTime',
      type: 'esriFieldTypeDate',
      alias: 'Date Time',
      length: 8,
    },
    {
      name: 'Shape_Length',
      type: 'esriFieldTypeDouble',
      alias: 'Shape_Length',
    },
    {
      name: 'Shape_Area',
      type: 'esriFieldTypeDouble',
      alias: 'Shape_Area',
    },
  ],
  features: [
    {
      attributes: {
        OBJECTID: 1,
        Name: null,
        Text: null,
        IntegerValue: null,
        DoubleValue: null,
        DateTime: null,
      },
      geometry: {
        hasZ: true,
        rings: [rings],
      },
    },
  ],
});
