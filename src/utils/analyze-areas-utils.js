import sha1 from 'sha1';
import { loadModules } from 'esri-loader';
import amphibiansPlaceholder from 'images/no-amphibian.png';
import mammalsPlaceholder from 'images/no-mammal.png';
import reptilesPlaceholder from 'images/no-reptile.png';
import birdsPlaceholder from 'images/no-bird.png';
import _intersectionBy from 'lodash/intersectionBy';
import _pick from 'lodash/pick';
import { percentageFormat } from 'utils/data-formatting-utils';
import { getPrecalculatedAOIOptions } from 'constants/analyze-areas-constants';

export function logGeometryArea(geometry) {
  loadModules(["esri/geometry/geometryEngine"])
    .then(([geometryEngine]) => {
      const SQ_KM_WKID = 109414;
      const area = geometryEngine.geodesicArea(geometry, SQ_KM_WKID);
      console.info('AREA', area, 'KM2')
    })
}

export function roundUpPercentage(value) {
  return value > 0.5 ? Math.round(value) : '<1';
}

export function calculateGeometryArea(geometry, geometryEngine) {
  const SQ_KM_WKID = 109414;
  return geometryEngine.geodesicArea(geometry, SQ_KM_WKID)
}

export function getSelectedAnalysisLayer(activeLayers) {
  console.log({activeLayers})
  const intersectionArray = _intersectionBy(getPrecalculatedAOIOptions(), activeLayers, 'title');
  console.log({intersectionArray})
  return intersectionArray[0];
}

export function createHashFromGeometry(geometry) {
  const ringsArray = geometry.rings;
  const flatRings = ringsArray.flat(Infinity);
  return sha1(flatRings.toString())
}

export function featureCollectionFromShape(input, view, onSucces, onError) {
  const generateRequestParams = {
    filetype: "shapefile",
    publishParameters: JSON.stringify({
      targetSR: view.spatialReference
    }),
    f: "json"
  };
  loadModules(["esri/request"])
    .then(([esriRequest]) => {
      esriRequest("https://www.arcgis.com/sharing/rest/content/features/generate", {
          query: generateRequestParams,
          body: input,
          method: 'post',
          responseType: "json"
        })
        .then((response) => onSucces(response))
        .catch((error) => onError( error))
    })
}

export const getTotalPressures = (pressures) => {
  if (!pressures) return null;
  let total = Object.keys(pressures).reduce((acc, key) => {
    return pressures[key] ? acc + parseFloat(pressures[key]) : acc;
  }, 0);
  total = (total > 100) ? 100 : total;
  return percentageFormat(total);
}

export const getMainPressure = (pressures) => {
  if (!pressures) return null;
  const existingPressures = Object.keys(pressures).filter(key => pressures[key] !== null);
  const cleanedPressures = _pick(pressures, existingPressures);
  const sorted = Object.keys(cleanedPressures).sort(
    (a, b) => parseFloat(pressures[b]) - parseFloat(pressures[a])
  );
  return sorted[0];
}

export const getPlaceholderSpeciesImage = (taxa) => {
  switch (taxa) {
    case 'amphibians':
      return amphibiansPlaceholder
    case 'mammals':
      return mammalsPlaceholder
    case 'reptiles':
      return reptilesPlaceholder
    case 'birds':
      return birdsPlaceholder
    default:
      return mammalsPlaceholder
  }
}

export const getPlaceholderSpeciesText = (taxa) => {
  switch (taxa) {
    case undefined:
      return `Photo not available for this animal`
    case null:
      return `Photo not available for this animal`
    default:
      return `Photo not available for this ${taxa.substring(0, taxa.length -1)}`
  }
}
