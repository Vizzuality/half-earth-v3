/* eslint-disable max-len */
import { calculateGeometryArea } from 'utils/analyze-areas-utils';
import {
  getCustomAOISpeciesData,
  getContextData,
  getAoiFromDataBase,
} from 'utils/geo-processing-services';
import { writeToForageItem } from 'utils/local-forage-utils';

import localforage from 'localforage';

import { STRINGIFIED_ATTRIBUTES } from 'constants/aois';
import {
  BIRDS,
  MAMMALS,
  REPTILES,
  AMPHIBIANS,
} from 'constants/geo-processing-services';

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
  handleLoadedTaxaData,
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

  // Here areas are saved to local forage. Areas are only saved to online DB when shared
  writeToForageItem(aoiId, forageStoredArea);
  setStoredArea(forageStoredArea);

  getContextData(aoiStoredGeometry).then((data) => {
    setContextualData({ ...data, ...contextualData });
  });
  const taxas = [BIRDS, MAMMALS, REPTILES, AMPHIBIANS];
  const promises = taxas
    .map((taxa) => getCustomAOISpeciesData(taxa, aoiStoredGeometry))
    .filter(Boolean);

  promises.forEach((promise, i) => {
    promise.then((data) => {
      const taxaName = taxas[i].split('_')[0];
      setTaxaData(
        // WHALES IDS NEED TO BE TEMPORARILY DISCARDED (2954, 2955)
        taxaName === MAMMALS
          ? data.filter(
              (sp) => sp.sliceNumber !== 2954 && sp.sliceNumber !== 2955
            )
          : data
      );

      handleLoadedTaxaData(taxaName);
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
    percentage: otherAttributes.per_global || otherAttributes.per_global,
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
  handleLoadedTaxaData,
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
          handleLoadedTaxaData,
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
                handleLoadedTaxaData,
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
