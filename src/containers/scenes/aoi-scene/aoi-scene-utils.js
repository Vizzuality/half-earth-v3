/* eslint-disable max-len */
import { calculateGeometryArea } from 'utils/analyze-areas-utils';
import {
  getCustomAOISpeciesData,
  getContextData,
  getAoiFromDataBase,
  getPrecalculatedContextualData,
  setPrecalculatedSpeciesData,
} from 'utils/geo-processing-services';
import { writeToForageItem } from 'utils/local-forage-utils';

import localforage from 'localforage';

import EsriFeatureService from 'services/esri-feature-service';

import { PRECALCULATED_LAYERS_SLUG } from 'constants/analyze-areas-constants';
import { STRINGIFIED_ATTRIBUTES } from 'constants/aois';
import {
  BIRDS,
  MAMMALS,
  REPTILES,
  AMPHIBIANS,
} from 'constants/geo-processing-services';
import {
  WDPA_OECM_FEATURE_DATA_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
} from 'constants/layers-slugs.js';
import { LAYERS_URLS } from 'constants/layers-urls';

// constants

// PRECALCULATED FUTURE PLACES
const setFuturePlace = ({
  aoiId,
  objectId,
  setGeometry,
  setContextualData,
  setTaxaData,
  setSpeciesData,
  t,
}) => {
  setSpeciesData({ species: [] }); // First reset species data

  EsriFeatureService.getFeatures({
    url: LAYERS_URLS[HALF_EARTH_FUTURE_TILE_LAYER],
    whereClause: `OBJECTID = '${objectId}'`,
    returnGeometry: true,
  }).then((results) => {
    const { attributes, geometry } = results[0];
    setPrecalculatedSpeciesData(attributes, setTaxaData);
    setGeometry(geometry);
    const areaName = `${t('Priority place')} ${attributes.cluster}`;
    setContextualData(
      getPrecalculatedContextualData({
        data: {
          ...attributes,
          jsonGeometry: JSON.stringify(geometry),
          areaName,
          aoiId,
        },
        includeProtectedAreasList: true,
        includeAllData: true,
        areaName,
      })
    );
  });
};

// PRECALCULATED SPECIFIC REGIONS
const setSpecificRegion = ({
  aoiId,
  setGeometry,
  setContextualData,
  setTaxaData,
  setSpeciesData,
}) => {
  setSpeciesData({ species: [] }); // First reset species data
  const region = aoiId.replace('region-', '');

  EsriFeatureService.getFeatures({
    url: LAYERS_URLS[SPECIFIC_REGIONS_TILE_LAYER],
    whereClause: `region = '${region}'`,
    returnGeometry: true,
  }).then((results) => {
    const { attributes, geometry } = results[0];
    const { NAME } = attributes;
    setPrecalculatedSpeciesData(attributes, setTaxaData);
    setGeometry(geometry);
    setContextualData(
      getPrecalculatedContextualData({
        data: {
          ...attributes,
          jsonGeometry: JSON.stringify(geometry),
          areaName: NAME,
          aoiId,
        },
        includeProtectedAreasList: true,
        includeAllData: true,
        areaName: NAME,
      })
    );
  });
};

// PRECALCULATED AOIs
export const setPrecalculatedAOIs = ({
  precalculatedLayerSlug,
  aoiId,
  objectId,
  setGeometry,
  setContextualData,
  setTaxaData,
  setSpeciesData,
  t,
  // eslint-disable-next-line consistent-return
}) => {
  if (precalculatedLayerSlug === HALF_EARTH_FUTURE_TILE_LAYER) {
    return setFuturePlace({
      aoiId,
      objectId,
      setGeometry,
      setContextualData,
      setTaxaData,
      setSpeciesData,
      t,
    });
  }

  if (precalculatedLayerSlug === SPECIFIC_REGIONS_TILE_LAYER) {
    return setSpecificRegion({
      aoiId,
      objectId,
      setGeometry,
      setContextualData,
      setTaxaData,
      setSpeciesData,
    });
  }

  // WDPA have an url array instead of a single url
  const url = Array.isArray(LAYERS_URLS[precalculatedLayerSlug])
    ? LAYERS_URLS[precalculatedLayerSlug][0]
    : LAYERS_URLS[precalculatedLayerSlug];

  EsriFeatureService.getFeatures({
    url,
    whereClause: `MOL_ID = '${aoiId}'`,
    returnGeometry: true,
  }).then((features) => {
    if (features && features[0]) {
      const { geometry, attributes } = features[0];
      setGeometry(geometry);

      const setProtectedAreasType = () => {
        // Special case for WDPA areas
        // call to WDPA_OECM_FEATURE_DATA_LAYER with MOL_ID as parameter

        EsriFeatureService.getFeatures({
          url: LAYERS_URLS[WDPA_OECM_FEATURE_DATA_LAYER],
          whereClause: `MOL_ID = '${aoiId}'`,
          returnGeometry: false,
        }).then((results) => {
          const { attributes: protectedAreaAttributes } = results[0];
          setContextualData(
            getPrecalculatedContextualData({
              data: protectedAreaAttributes,
              includeProtectedAreasList: true,
              includeAllData: true,
            })
          );
          setPrecalculatedSpeciesData(protectedAreaAttributes, setTaxaData);
        });
      };

      const setNationalOrSubnationalType = () => {
        setContextualData(getPrecalculatedContextualData({ data: attributes }));
        setPrecalculatedSpeciesData(attributes, setTaxaData);
      };

      if (precalculatedLayerSlug === PRECALCULATED_LAYERS_SLUG.protectedAreas) {
        setProtectedAreasType();
      } else {
        setNationalOrSubnationalType();
      }
    } else {
      console.warn(`No data for ${aoiId}`);
    }
  });
};

// NOT PRECALCULATED AOIs

const createNewCustomAOI = ({
  aoiStoredGeometry,
  geometryEngine,
  aoiId,
  jsonUtils,
  setContextualData,
  setGeometry,
  setStoredArea,
  setTaxaData,
  t,
}) => {
  const areaName = t('Custom area');
  const area = calculateGeometryArea(aoiStoredGeometry, geometryEngine);
  const contextualData = {
    area,
    areaName,
    aoiId,
    isCustom: true,
  };
  // Set data before fetch just to show name and available info
  setContextualData(contextualData);

  const jsonGeometry = aoiStoredGeometry && aoiStoredGeometry.toJSON();
  setGeometry(jsonUtils.fromJSON(jsonGeometry));

  const forageStoredArea = {
    ...contextualData,
    jsonGeometry,
    timestamp: Date.now(),
  };
  writeToForageItem(aoiId, forageStoredArea);
  setStoredArea(forageStoredArea);

  getContextData(aoiStoredGeometry).then((data) => {
    setContextualData({ ...data, ...contextualData });
  });
  const taxas = [BIRDS, MAMMALS, REPTILES, AMPHIBIANS];
  const promises = taxas
    .map((taxa) => getCustomAOISpeciesData(taxa, aoiStoredGeometry))
    .filter(Boolean);
  Promise.all(promises).then((allTaxaData) => {
    allTaxaData.forEach((taxaData, i) => {
      const taxaName = taxas[i];
      setTaxaData(
        // WHALES IDS NEED TO BE TEMPORARILY DISCARDED (2954, 2955)
        taxaName === MAMMALS
          ? taxaData.filter(
              (sp) => sp.sliceNumber !== 2954 && sp.sliceNumber !== 2955
            )
          : taxaData
      );
    });
  });
};

const recoverAOIFromDB = ({
  aoiData,
  setContextualData,
  setGeometry,
  setSpeciesData,
}) => {
  const {
    geometry,
    attributes: { species, ...otherAttributes },
  } = aoiData;
  setGeometry(geometry);
  setSpeciesData({ species: JSON.parse(species) });
  setContextualData({
    ...otherAttributes,
    ...STRINGIFIED_ATTRIBUTES.reduce((acc, key) => {
      acc[key] = JSON.parse(otherAttributes[key]);
      return acc;
    }, {}),
    percentage: otherAttributes.per_global,
    isCustom: true,
  });
};

const recoverAOIfromLocal = ({
  aoiData,
  aoiId,
  jsonUtils,
  setContextualData,
  setGeometry,
  setSpeciesData,
}) => {
  const { jsonGeometry, species, ...rest } = aoiData;
  const geometry = jsonUtils.fromJSON(jsonGeometry);
  setGeometry(geometry);
  setSpeciesData({ species });
  const contextualData = {
    ...rest,
    aoiId,
    isCustom: true,
  };

  setContextualData(contextualData);
};

export const recoverOrCreateNotPrecalculatedAoi = ({
  aoiStoredGeometry,
  geometryEngine,
  aoiId,
  jsonUtils,
  setContextualData,
  setGeometry,
  setStoredArea,
  setTaxaData,
  setSpeciesData,
  t,
}) => {
  localforage
    .getItem(aoiId)
    .then((localStoredAoi) => {
      if (localStoredAoi && localStoredAoi.jsonGeometry) {
        recoverAOIfromLocal({
          aoiData: localStoredAoi,
          aoiStoredGeometry,
          geometryEngine,
          aoiId,
          jsonUtils,
          setContextualData,
          setGeometry,
          setStoredArea,
          setTaxaData,
          setSpeciesData,
        });
      } else {
        getAoiFromDataBase(aoiId)
          .then((aoiData) => {
            if (aoiData && aoiData[0]) {
              recoverAOIFromDB({
                aoiData: aoiData[0],
                setContextualData,
                setGeometry,
                setSpeciesData,
              });
            } else {
              // If we don't have it anywhere we just execute the GP services job to create one
              createNewCustomAOI({
                aoiStoredGeometry,
                geometryEngine,
                aoiId,
                jsonUtils,
                setContextualData,
                setGeometry,
                setStoredArea,
                setTaxaData,
                t,
              });
            }
          })
          .catch((error) => {
            console.error('Could not retrieve AOI', error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
