import sha1 from 'sha1';
import { loadModules } from 'esri-loader';
import _intersectionBy from 'lodash/intersectionBy';
import { PRECALCULATED_AOI_OPTIONS } from 'constants/analyze-areas-constants';

export function logGeometryArea(geometry) {
  loadModules(["esri/geometry/geometryEngine"])
    .then(([geometryEngine]) => {
      const SQ_KM_WKID = 109414;
      const area = geometryEngine.geodesicArea(geometry, SQ_KM_WKID)
      console.log('AREA', area, 'KM2')
    })
}

export function getSelectedAnalysisLayer(activeLayers) {
  const intersectionArray = _intersectionBy(PRECALCULATED_AOI_OPTIONS, activeLayers, 'title');
  return intersectionArray[0];
}

export function createHashFromGraphic(graphic) {
  const ringsArray = graphic.geometry.rings;
  const flatRings = ringsArray.flat(Infinity);
  return sha1(flatRings.toString())
}
