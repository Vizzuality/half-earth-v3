import { percentageFormat } from 'utils/data-formatting-utils';

import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import esriRequest from '@arcgis/core/request';
import sha1 from 'sha1';

import amphibiansPlaceholder from 'images/no-amphibian.png';
import birdsPlaceholder from 'images/no-bird.png';
import mammalsPlaceholder from 'images/no-mammal.png';
import reptilesPlaceholder from 'images/no-reptile.png';

export function logGeometryArea(geometry) {
  const SQ_KM_WKID = 109414;
  const area = geometryEngine.geodesicArea(geometry, SQ_KM_WKID);
  console.info('AREA', area, 'KM2');
}

export function roundUpPercentage(value) {
  return value > 0.5 ? Math.round(value) : '<1';
}

export function calculateGeometryArea(geometry) {
  const SQ_KM_WKID = 109414;
  return geometryEngine.geodesicArea(geometry, SQ_KM_WKID);
}

export function createHashFromGeometry(geometry) {
  const ringsArray = geometry.rings;
  const flatRings = ringsArray.flat(Infinity);
  return sha1(flatRings.toString());
}

export function featureCollectionFromShape(body, view, onSucces, onError) {
  const generateRequestParams = {
    filetype: 'shapefile',
    publishParameters: JSON.stringify({
      targetSR: view.spatialReference,
    }),
    f: 'json',
  };
  esriRequest('https://www.arcgis.com/sharing/rest/content/features/generate', {
    query: generateRequestParams,
    body,
    method: 'post',
    responseType: 'json',
  })
    .then((response) => onSucces(response))
    .catch((error) => onError(error));
}

export const getTotalPressures = (pressures) => {
  if (!pressures) return null;
  let total = Object.keys(pressures).reduce((acc, key) => {
    return pressures[key] ? acc + parseFloat(pressures[key]) : acc;
  }, 0);
  total = total > 100 ? 100 : total;
  return percentageFormat(total);
};

export const getMainPressure = (pressures) => {
  if (!pressures) return null;

  const mainPressure = Object.keys(pressures).reduce((acc, key) => {
    const pressure = pressures[key];
    if (!pressure) return acc;

    const currentValue =
      pressure[pressure.length - 1].percentage_land_encroachment ||
      pressure[pressure.length - 1].value;
    if (!acc.value || currentValue > acc.value) {
      return {
        name: key,
        value: currentValue,
      };
    }
    return acc;
  });

  return mainPressure.name;
};

export const getPlaceholderSpeciesImage = (taxa) => {
  switch (taxa) {
    case 'amphibians':
      return amphibiansPlaceholder;
    case 'mammals':
      return mammalsPlaceholder;
    case 'reptiles':
      return reptilesPlaceholder;
    case 'birds':
      return birdsPlaceholder;
    default:
      return mammalsPlaceholder;
  }
};

export const getPlaceholderSpeciesText = (taxa) => {
  switch (taxa) {
    case undefined:
      return 'Photo not available for this animal';
    case null:
      return 'Photo not available for this animal';
    default:
      return `Photo not available for this ${taxa.substring(
        0,
        taxa.length - 1
      )}`;
  }
};
