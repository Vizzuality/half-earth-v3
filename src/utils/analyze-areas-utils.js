import sha1 from 'sha1';
import { loadModules } from 'esri-loader';
import amphibiansPlaceholder from 'images/no-amphibian.png';
import mammalsPlaceholder from 'images/no-mammal.png';
import reptilesPlaceholder from 'images/no-reptile.png';
import birdsPlaceholder from 'images/no-bird.png';
import _intersectionBy from 'lodash/intersectionBy';
import { percentageFormat } from 'utils/data-formatting-utils';
import { PRECALCULATED_AOI_OPTIONS } from 'constants/analyze-areas-constants';

export function logGeometryArea(geometry) {
  loadModules(["esri/geometry/geometryEngine"])
    .then(([geometryEngine]) => {
      const SQ_KM_WKID = 109414;
      const area = geometryEngine.geodesicArea(geometry, SQ_KM_WKID);
      console.log('AREA', area, 'KM2')
    })
}

export function calculateGeometryArea(geometry, geometryEngine) {
  const SQ_KM_WKID = 109414;
  return geometryEngine.geodesicArea(geometry, SQ_KM_WKID)
} 

export function getSelectedAnalysisLayer(activeLayers) {
  const intersectionArray = _intersectionBy(PRECALCULATED_AOI_OPTIONS, activeLayers, 'title');
  return intersectionArray[0];
}

export function createHashFromGeometry(geometry) {
  const ringsArray = geometry.rings;
  const flatRings = ringsArray.flat(Infinity);
  return sha1(flatRings.toString())
}

export function featureCollectionFromShape(input, view, onFeatureSetGenerated) {
  const generateRequestParams = { 
    filetype: "shapefile", 
    // file,
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
        }).then(function (response) {
          onFeatureSetGenerated(response)
          console.log('FEATURE COLLECTION', response)
        })
    })
}

export const getTotalPressures = (pressures) => {
  if (!pressures) return null;
  const total = Object.keys(pressures).reduce((acc, key) => {
    return acc + parseFloat(pressures[key]);
  }, 0);
  return percentageFormat(total);
}

export const getMainPressure = (pressures) => {
  if (!pressures) return null;
  const sorted = Object.keys(pressures).sort(
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